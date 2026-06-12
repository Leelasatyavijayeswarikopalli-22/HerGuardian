import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen glow-bg">
     <Navbar />
      <div className="flex">

        <Sidebar />

        <main className="flex-1">
          {children}
        </main>

      </div>

      <Footer />

    </div>
  );
}