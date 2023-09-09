import { Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import theme from "./theme";
import Contact from "./pages/Contact";
import Notification from "./components/Notification";
import AuthContextProvider from "./context/AuthContextProvider";
import UserProfile from "./pages/UserProfile";
import ProfileLayout from "./components/profile/ProfileLayout";
import UserVists from "./pages/UserVists";
import ChangePassword from "./pages/ChangePassword";
import PageLoader from "./components/PageLoader";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import UserTransactions from "./pages/UserTransactions";
import UserProperties from "./pages/UserProperties";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Notification />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="properties" element={<Properties />} />
                <Route path="properties/city/:city" element={<Properties />} />
                <Route
                  path="properties/city/:city/property/:id"
                  element={<Property />}
                />
                <Route path="contact" element={<Contact />} />

                <Route path="payment/success" element={<PaymentSuccess />} />
                <Route path="payment/failed" element={<PaymentFailed />} />
              </Route>

              <Route path="/user" element={<ProfileLayout />}>
                <Route path="profile" element={<UserProfile />} />
                <Route path="favorites" element={<UserProfile />} />
                <Route path="visits" element={<UserVists />} />
                <Route path="transactions" element={<UserTransactions />} />
                <Route path="properties" element={<UserProperties />} />
                <Route path="changePassword" element={<ChangePassword />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route path="/verifyEmail/:token" element={<VerifyEmail />} />

              <Route path="*" element={<h1>404 page</h1>} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
