import { useEffect, useState } from "react";
import { listObservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";

function Home() {
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    listObservations(abortController.signal)
      .then(setObservations)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  const tableRows = observations.map((observation) => (
    <tr key={observation.observation_id}>
      <th scope="row">{observation.observation_id}</th>
      <td>{observation.latitude}</td>
      <td>{observation.longitude}</td>
      <td>{observation.sky_condition}</td>
      <td>{observation.air_temperature}</td>
      <td>{observation.air_temperature_unit}</td>
      <td>{observation.created_at}</td>
      <td>
        <Link
          className="active"
          to={`/observations/${observation.observation_id}/edit`}
        >
          &nbsp;Edit Observation
        </Link>
      </td>
    </tr>
  ));

  return (
    <main>
      <h1>Home</h1>
      <ErrorAlert error={error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Sky Condition</th>
            <th scope="col">Air Temperature</th>
            <th scope="col">Air Temperature Unit</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </main>
  );
}

export default Home;
