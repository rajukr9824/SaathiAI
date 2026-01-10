import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    console.error("Invalid user in localStorage");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-3 sm:px-6 bg-slate-950 border-b border-slate-800">
      <h1 className="text-base sm:text-lg font-semibold text-green-400">
        Saathi
      </h1>

      <div className="flex items-center gap-3 sm:gap-4">
        {user?.name && (
          <span className="text-sm text-slate-300">
            Hi, <span className="text-white font-medium">{user.name}</span>
          </span>
        )}

        <button
          onClick={handleLogout}
          className="text-xs sm:text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
