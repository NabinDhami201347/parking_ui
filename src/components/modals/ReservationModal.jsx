/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useMutation } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { privateAxios } from "../../api";
import Loading from "../Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const dialogTransitionConfig = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95",
};

const overlayTransitionConfig = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

// eslint-disable-next-line react/prop-types
const ReservationModal = ({ id, vehicles }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const [formData, setFormData] = useState({
    parkingSpotId: id,
    vehicleId: "",
    startTime: null,
    endTime: null,
    arrivalTime: null,
  });

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleVehicleChange = (selectedOption) => {
    setFormData({
      ...formData,
      vehicleId: selectedOption.value,
    });
  };

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: (data) => {
      return privateAxios.post("/reservations", data);
    },
    onSuccess: () => {
      closeModal();
      toast.success("Reservation Successful");
      navigate("/profile");
    },
    onError: (err) => {
      toast.err("Error while reservation");
      console.log("error while creating vehicle", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(formData);
  };

  let vehicleOptions;
  if (vehicles) {
    vehicleOptions = vehicles.map((vehicle) => ({
      value: vehicle._id,
      label: vehicle.model,
    }));
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        disabled={isLoading || vehicles.length < 1}
        className="w-full bg-green-600 py-2 hover:bg-green-700 transition-all ease-in-out rounded-md disabled:bg-gray-400"
      >
        Reserve Parking
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} {...overlayTransitionConfig}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} {...dialogTransitionConfig}>
                <Dialog.Panel className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <label className="block">Select Vehicle:</label>
                    <Select
                      required
                      placeholder="Select which vehicle"
                      options={vehicleOptions}
                      value={vehicleOptions.find((option) => option.value === formData.vehicleId)}
                      onChange={handleVehicleChange}
                      className="border text-black "
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          boxShadow: "none",
                          border: "none",
                          backgroundColor: "#18181B",
                          color: "white",
                        }),
                      }}
                    />
                    <label className="block">Start Time:</label>
                    <DatePicker
                      required
                      placeholderText="Select time for reservation"
                      selected={formData.startTime}
                      onChange={(date) => handleDateChange(date, "startTime")}
                      showTimeSelect
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="w-full p-2 border bg-transparent rounded-sm"
                    />
                    <label className="block">End Time:</label>
                    <DatePicker
                      required
                      placeholderText="Select time for reservation"
                      selected={formData.endTime}
                      onChange={(date) => handleDateChange(date, "endTime")}
                      showTimeSelect
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="w-full p-2 border bg-transparent rounded-sm"
                    />
                    <label className="block">Arrival Time:</label>
                    <DatePicker
                      required
                      placeholderText="Select arrival time"
                      selected={formData.arrivalTime}
                      onChange={(date) => handleDateChange(date, "arrivalTime")}
                      showTimeSelect
                      dateFormat="yyyy-MM-dd HH:mm"
                      className="w-full p-2 border bg-transparent rounded-sm"
                    />
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="px-4 py-2 border border-transparent bg-purple-600  text-sm font-medium  hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Submit Reservation
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReservationModal;
