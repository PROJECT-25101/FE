import FilterBooking from "./components/FilterBooking";
import ScheduleCard from "../../components/common/ScheduleCard";

const BookingPage = () => {
  return (
    <div className="bg-gray-100 py-8 min-h-screen">
      <div className="max-w-7xl xl:mx-auto mx-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="./bus.png" alt="" />
            <h2 className="text-2xl font-medium">Hà Nội - Nghệ An</h2>
            <span className="text-red-500 text-xs bg-red-100 px-4 inline-block py-1 rounded-full">
              24 chuyến
            </span>
          </div>
          <FilterBooking />
        </div>
        <div className="flex flex-col mt-8 gap-6 items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <ScheduleCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
