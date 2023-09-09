import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { Divider } from "@mui/material";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Divider />
      <Footer />
    </>
  );
};

export default AppLayout;
