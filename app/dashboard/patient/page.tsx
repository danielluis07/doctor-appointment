const PatientPage = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Upcoming Appointment
          </h2>
          <div className="flex items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200"></div>
            <div className="ml-4">
              <p className="text-gray-700 font-semibold">Dr. [Doctor Name]</p>
              <p className="text-gray-500 text-sm md:text-base">
                [Date & Time]
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                [Location/Online]
              </p>
            </div>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-3 md:px-4 py-2 rounded">
            View Details
          </button>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-col space-y-3 md:space-y-4">
            <button className="bg-green-500 text-white px-3 md:px-4 py-2 rounded">
              Find a Doctor
            </button>
            <button className="bg-yellow-500 text-white px-3 md:px-4 py-2 rounded">
              Schedule Appointment
            </button>
            <button className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded">
              View All Appointments
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200"></div>
              <div className="ml-3">
                <p className="text-gray-700 font-semibold text-sm md:text-base">
                  Appointment with Dr. [Doctor Name]
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                  [Date & Time]
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-bold mb-4">Health Tips</h2>
          <p className="text-gray-700 text-sm md:text-base">
            Stay hydrated and exercise regularly to maintain good health. Check
            our blog for more tips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
