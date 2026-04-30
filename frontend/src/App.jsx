import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard.jsx";
import { LoginForm } from "./components/LoginForm.jsx";
import {
  getAuthorizedUser,
  getCollection,
  loginRequest,
  logoutRequest,
} from "./lib/api.js";

const STORAGE_KEY = "pintureria_auth";
const RESOURCES = ["clients", "sales", "providers", "products"];

const readStoredAuth = () => {
  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (_error) {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export default function App() {
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [bootLoading, setBootLoading] = useState(Boolean(readStoredAuth()));
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("clients");
  const [collections, setCollections] = useState({});
  const [loadingByTab, setLoadingByTab] = useState({});
  const [errorByTab, setErrorByTab] = useState({});

  useEffect(() => {
    const validateSession = async () => {
      if (!auth?.token) {
        setBootLoading(false);
        return;
      }

      try {
        const user = await getAuthorizedUser(auth.token);
        const persisted = { token: auth.token, user };
        setAuth(persisted);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
      } catch (_error) {
        setAuth(null);
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setBootLoading(false);
      }
    };

    validateSession();
  }, []);

  useEffect(() => {
    const loadCollections = async () => {
      if (!auth?.token) {
        return;
      }

      for (const resource of RESOURCES) {
        setLoadingByTab((current) => ({ ...current, [resource]: true }));
        setErrorByTab((current) => ({ ...current, [resource]: "" }));

        try {
          const payload = await getCollection(resource, auth.token);
          setCollections((current) => ({ ...current, [resource]: payload }));
        } catch (error) {
          setErrorByTab((current) => ({ ...current, [resource]: error.message }));
        } finally {
          setLoadingByTab((current) => ({ ...current, [resource]: false }));
        }
      }
    };

    loadCollections();
  }, [auth?.token]);

  const handleLogin = async (credentials) => {
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await loginRequest(credentials);
      const nextAuth = { token: response.token, user: response.user };
      setAuth(nextAuth);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (auth?.token) {
        await logoutRequest(auth.token);
      }
    } catch (_error) {
      // Si falla el logout remoto igual limpiamos la sesion local.
    } finally {
      setAuth(null);
      setCollections({});
      setLoadingByTab({});
      setErrorByTab({});
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  if (bootLoading) {
    return (
      <main className="screen-center">
        <div className="card">
          <p className="status">Validando sesion...</p>
        </div>
      </main>
    );
  }

  if (!auth?.token || !auth?.user) {
    return (
      <main className="app-shell">
        <LoginForm onSubmit={handleLogin} loading={loginLoading} error={loginError} />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Dashboard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collections={collections}
        loadingByTab={loadingByTab}
        errorByTab={errorByTab}
        user={auth.user}
        onLogout={handleLogout}
      />
    </main>
  );
}
