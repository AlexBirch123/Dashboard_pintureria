const TAB_LABELS = {
  clients: "Clientes",
  sales: "Ventas",
  providers: "Proveedores",
  products: "Productos",
};

// Transforma los valores de precios o posrcentajes de descuento en numeros mas legibles como precios
const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("es-AR");
};

const getColumns = (tab) => {
  switch (tab) {
    case "clients":
      return [
        { key: "id", label: "ID" },
        { key: "name", label: "Nombre" },
        { key: "dni", label: "DNI" },
        { key: "phone", label: "Telefono" },
        { key: "address", label: "Direccion" },
      ];
    case "sales":
      return [
        { key: "id", label: "ID" },
        { key: "date", label: "Fecha", render: (item) => formatDate(item.date) },
        {
          key: "client",
          label: "Cliente",
          render: (item) => item.client?.name || `Cliente #${item.id_client}`,
        },
        { key: "total", label: "Total", render: (item) => formatCurrency(item.total) },
        { key: "discount", label: "Descuento", render: (item) => formatCurrency(item.discount) },
      ];
    case "providers":
      return [
        { key: "id", label: "ID" },
        { key: "description", label: "Proveedor" },
        { key: "cuit", label: "CUIT" },
      ];
    case "products":
      return [
        { key: "id", label: "Codigo" },
        { key: "description", label: "Descripcion" },
        { key: "brand", label: "Marca" },
        { key: "stock", label: "Stock" },
        { key: "price", label: "Precio", render: (item) => formatCurrency(item.price) },
      ];
    default:
      return [];
  }
};

export function Dashboard({
  activeTab,
  setActiveTab,
  collections,
  loadingByTab,
  errorByTab,
  user,
  onLogout,
}) {
  const currentItems = collections[activeTab]?.data || [];
  const currentPagination = collections[activeTab]?.pagination;
  const columns = getColumns(activeTab);

  return (
    <section className="dashboard-shell">
      <header className="topbar">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Usuario: {user.name}</p>
        </div>

        <button type="button" className="ghost-button" onClick={onLogout}>
          Cerrar sesion
        </button>
      </header>

      <section className="panel">
        <div className="tabs">
          {Object.entries(TAB_LABELS).map(([resource, label]) => (
            <button
              key={resource}
              type="button"
              className={resource === activeTab ? "tab is-selected" : "tab"}
              onClick={() => setActiveTab(resource)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="panel-header">
          <div>
            <h2>{TAB_LABELS[activeTab]}</h2>
            <p className="muted">
              {currentPagination
                ? `Total: ${currentPagination.total}`
                : "Sin datos"}
            </p>
          </div>
        </div>

        {loadingByTab[activeTab] ? <p className="status">Cargando informacion...</p> : null}
        {errorByTab[activeTab] ? <p className="error-banner">{errorByTab[activeTab]}</p> : null}

        {!loadingByTab[activeTab] && !errorByTab[activeTab] ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={`${activeTab}-${item.id}`}>
                      {columns.map((column) => (
                        <td key={column.key}>
                          {column.render ? column.render(item) : item[column.key] ?? "-"}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length}>No hay registros para mostrar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </section>
  );
}
