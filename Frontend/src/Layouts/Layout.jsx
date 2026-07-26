import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen glow-bg">
      <Navbar />

      {/* pt-16 = navbar height (h-16 = 64px) */}
      <div className="flex pt-16">
        <Sidebar />

        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}