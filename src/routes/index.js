import { useCookies } from "react-cookie";
import { Routes, Route, Navigate } from "react-router";
import SignIn from "pages/Auth/SignIn";
import SignUp from "pages/Auth/SignUp";
import ForgotPassword from "pages/Auth/ForgotPassword";
import NewPassword from "pages/Auth/NewPassword";
import Profile from "pages/Profile";

export default function AppRoutes() {
  const [cookie] = useCookies(["token"]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          cookie.token ? (
            <Navigate replace to="/profile" />
          ) : (
            <Navigate replace to="/sign-in" />
          )
        }
      />
      {cookie.token && (
        <Route path="/profile" element={<Profile />} />
      )}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/*" element={<Navigate replace to="/sign-in" />} />
    </Routes>
  );
}
