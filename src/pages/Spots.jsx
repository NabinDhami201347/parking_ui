import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { privateAxios } from "../api";
import Loading from "../components/Loading";

const Spots = () => {
  const fetchSpots = async () => {
    try {
      const res = await privateAxios.get("/spots");
      return res.data.spots;
    } catch (error) {
      console.log("error while fetching spots", error);
      throw error;
    }
  };

  const { data: spots, isLoading, isError, error } = useQuery(["spots"], fetchSpots);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {spots ? (
        spots.map((s) => (
          <p key={s._id}>
            <Link to={`/spots/${s._id}`}>{s.name}</Link>
          </p>
        ))
      ) : (
        <p>No spots available.</p>
      )}
    </div>
  );
};

export default Spots;
