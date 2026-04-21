import Navbar from "./Navbar";
import AddTransactionModal from "../../features/transactions/components/AddTransactionModal";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main>{children}</main>
      <AddTransactionModal />
    </div>
  );
}

export default Layout;