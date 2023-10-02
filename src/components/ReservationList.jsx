/* eslint-disable react/prop-types */
import moment from "moment";

function ReservationsList({ reservations }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Reservation ID
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Vehicle Type
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              End Time
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-zinc-900 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-zinc-900 divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td className="px-6 py-4 whitespace-no-wrap">{reservation._id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{reservation.vehicle.vehicleType}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {moment(reservation.startTime).format("D MMMM , h:mm A")}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{moment(reservation.endTime).format("D MMMM , h:mm A")}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{reservation.status}</td>
              <td className="px-6 py-4 whitespace-no-wrap">${reservation.totalCost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationsList;
