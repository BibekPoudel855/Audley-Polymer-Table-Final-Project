import { FiAirplay, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Actions() {
  const navigator = useNavigate();
  const actions = [
    {
      id: 1,
      title: "View Reports",
      icon: <FiAirplay size={20} />,
      link: "/reports",
      bg: "bg-purple-500 hover:bg-purple-600",
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold">Actions</h1>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4`}
      >
        {actions.map((action) => {
          return (
            <button
              key={action.id}
              className={`flex items-center gap-2 py-3 px-4 ${action.bg} text-white rounded-md transition-colors mb-2 hover:shadow-sm`}
              onClick={() => {
                navigator(action.link);
              }}
            >
              {action.icon} {action.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default Actions;
