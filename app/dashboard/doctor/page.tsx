const DoctorDashboardPage = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Upcoming Appointments
          </h2>
          <ul>
            <li className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-700">John Doe</p>
                <p className="text-sm text-gray-500">August 25, 10:00 AM</p>
              </div>
              <button className="text-blue-600 hover:underline">Details</button>
            </li>
          </ul>
          <a href="#" className="text-blue-600 hover:underline">
            View All Appointments
          </a>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Action Items
          </h2>
          <ul>
            <li className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-700">Appointment Request</p>
                <p className="text-sm text-gray-500">Pending approval</p>
              </div>
              <button className="text-green-600 hover:underline">
                Approve
              </button>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Recent Patient Activity
          </h2>
          <ul>
            <li className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-700">New Review from Jane Smith</p>
                <p className="text-sm text-gray-500">"Great consultation..."</p>
              </div>
              <button className="text-blue-600 hover:underline">View</button>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Key Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-semibold text-gray-800">15</p>
              <p className="text-gray-600">Appointments this week</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">98%</p>
              <p className="text-gray-600">Patient satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">$2,500</p>
              <p className="text-gray-600">Earnings this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Notifications
          </h2>
          <ul>
            <li className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-700">Appointment Canceled</p>
                <p className="text-sm text-gray-500">John Doe, August 25</p>
              </div>
              <button className="text-blue-600 hover:underline">View</button>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Availability Overview
          </h2>
          <p className="text-gray-700">Next Available Slot:</p>
          <p className="text-2xl font-semibold text-green-600">
            August 26, 9:00 AM
          </p>
          <button className="mt-4 text-blue-600 hover:underline">
            Manage Availability
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Earnings Summary
          </h2>
          <p className="text-gray-700">Total Earnings This Month:</p>
          <p className="text-3xl font-semibold text-gray-800">$2,500</p>
          <button className="mt-4 text-blue-600 hover:underline">
            View Details
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Add Appointment
            </button>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
              Contact Patient
            </button>
            <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg">
              Update Availability
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Announcements
          </h2>
          <p className="text-gray-700">
            New feature release: Video consultations are now available!
          </p>
          <button className="mt-4 text-blue-600 hover:underline">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
