const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const buildHeaders = (token, hasBody = false) => {
  const headers = {};

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (response) => {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = payload?.message || "Ocurrio un error en la solicitud.";
    throw new Error(message);
  }

  return payload;
};

export const loginRequest = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: buildHeaders(null, true),
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  return parseResponse(response);
};

export const getAuthorizedUser = async (token) => {
  const response = await fetch(`${API_URL}/authorized`, {
    headers: buildHeaders(token),
    credentials: "include",
  });

  return parseResponse(response);
};

export const logoutRequest = async (token) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: buildHeaders(token),
    credentials: "include",
  });

  return parseResponse(response);
};

export const getCollection = async (resource, token, query = "limit=12&orderDir=DESC") => {
  const response = await fetch(`${API_URL}/${resource}?${query}`, {
    headers: buildHeaders(token),
    credentials: "include",
  });

  return parseResponse(response);
};
