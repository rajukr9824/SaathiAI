import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-black via-slate-900 to-emerald-950">
      
      {/* Fixed Header */}
      <Header />

      {/* Scrollable main area */}
      <main className="flex-1 pt-14 overflow-hidden flex justify-center items-center">
        {children}
      </main>

      {/* Footer ALWAYS visible */}
      <Footer />
    </div>
  );
};

export default Layout;
