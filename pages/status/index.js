import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <GetDatabaseInfo />
    </>
  );
}

function GetDatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  const dbDependencies = data?.dependencies.database;
  let updatedAtText = "Carregando...";
  let maxConnections;
  let dbVersion;
  let openedConnections;

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    maxConnections = dbDependencies?.max_connections;
    dbVersion = dbDependencies?.version;
    openedConnections = dbDependencies.opened_connections;
  }

  return (
    <div>
      <p>Última atualização: {updatedAtText}</p>
      <p>Conexões Máximas: {maxConnections}</p>
      <p>Versão: {dbVersion}</p>
      <p>Conexões Abertas: {openedConnections}</p>
    </div>
  );
}
