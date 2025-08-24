import Footer from "./Footer";
import Navbar from "./Navbar";

interface iProps {
  children: React.ReactNode;
}

function CommonLayout({ children }: iProps) {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}

export default CommonLayout;
