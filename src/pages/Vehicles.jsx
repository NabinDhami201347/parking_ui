import { useQuery } from "@tanstack/react-query";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";

import { privateAxios } from "../api";
import Loading from "../components/Loading";
import VehicleRegisterModal from "../components/modals/VehicleRegisterModal";

const Vehicles = () => {
  const fetchVehicle = async () => {
    try {
      const res = await privateAxios.get(`vehicles/u/p`);
      console.log(res);
      return res.data.vehicles;
    } catch (error) {
      console.log("error while fetching vehicles", error);
    }
  };

  const { data: vehicles, isLoading, isError, error } = useQuery(["vehicles"], fetchVehicle);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="w-11/12 mx-auto my-6">
      <div className="grid sm:grid-cols-4 gap-10 ">
        {vehicles.map((v) => (
          <Vehicle key={v._id} model={v.model} licensePlate={v.licensePlate} vehicleType={v.vehicleType} />
        ))}
      </div>

      <VehicleRegisterModal />
    </div>
  );
};

// eslint-disable-next-line react/prop-types
function Vehicle({ model, licensePlate, vehicleType }) {
  const IconMap = {
    car: <FaCarSide className="h-20 w-20" />,
    bike: <RiMotorbikeFill className="h-20 w-20" />,
  };

  return (
    <div className="p-1 border px-4 border-purple-600 rounded-md cursor-pointer hover:border-purple-400 transition-all">
      {IconMap[vehicleType]}
      <h2 className="text-xl text-gray-300">{model}</h2>
      <p className="text-base text-gray-500">{licensePlate}</p>
    </div>
  );
}
export default Vehicles;
