import { Outlet, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Vehicles from "./pages/Vehicles";
import Spots from "./pages/Spots";
import Spot from "./pages/Spot";
import Navbar from "./components/Navbar";
import CreateVehicleForm from "./components/CreateVehicleForm";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/new" element={<CreateVehicleForm />} />
        <Route path="/spots" element={<Spots />} />
        <Route path="/spots/:id" element={<Spot />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />

      <main className="flex-1 mt-16">
        <Outlet />
      </main>

      {/* <footer>Hello from the footer</footer> */}
    </div>
  );
}
export default App;
