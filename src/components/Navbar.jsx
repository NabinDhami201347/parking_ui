import { Link } from "react-router-dom";

import { useAccessToken } from "../hooks/useAccessToken";

const Navbar = () => {
  const { accessToken, deleteAccessToken } = useAccessToken();
  const isLoggedIn = accessToken ? true : false;

  return (
    <header className="fixed top-0 w-full backdrop-blur-sm  border-b border-gray-600 h-16">
      <nav className="w-11/12 mx-auto h-full flex items-center">
        <div className="w-full flex items-center justify-between">
          <div className="">Pay Per Vue</div>
          <ul className="flex items-center gap-4">
            <Link to="/">
              <li className="hover:underline transition">Home</li>
            </Link>
            <Link to="/spots">
              <li className="hover:underline transition">Spots</li>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/vehicles">
                  <li className="hover:underline transition">Vehicles</li>
                </Link>
                <Link to="/profile">
                  <li className="hover:underline transition">Profile</li>
                </Link>
                <button
                  onClick={() => deleteAccessToken()}
                  className="bg-zinc-700 px-4 py-1 hover:bg-zinc-800 rounded-md"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/signup">
                <li className="hover:bg-zinc-700 transition px-4 py-1 bg-zinc-600 rounded-md">Signup</li>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
