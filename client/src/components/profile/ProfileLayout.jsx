import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Divider, Container, Grid, Paper } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer";
import ProfileNav from "./ProfileNav";
import useAuth from "../../hooks/useAuth";

const ProfileLayout = () => {
  const {
    user: { user },
  } = useAuth();
  const location = useLocation();

  if (
    !user ||
    (location.pathname === "/user/changePassword" && user.authType === "google")
  ) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid container spacing={3} my={5}>
          <Grid item xs={12} sm={4}>
            <ProfileNav />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={5} sx={{ p: 5 }}>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Divider />
      <Footer />
    </>
  );
};

export default ProfileLayout;
