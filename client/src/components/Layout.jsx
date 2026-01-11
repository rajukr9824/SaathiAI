import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-black via-slate-900 to-emerald-950 overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
