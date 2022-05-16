import AppRoutes from "./routes";
import React from "react";
import Navbar from "components/Navbar";
import PageContainer from "components/PageContainer";
import Toastr from "components/Toastr";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

function App() {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const toastr = useSelector((state) => state.toastr.toastrInfo);

  useDispatch(() => {
    if (!cookie.token) {
      navigate("/sign-in");
    }
  }, cookie.token);

  return (
    <>
      <Navbar />
      {Object.keys(toastr).length > 0 && <Toastr />}
      <div className="mt-5">
        <PageContainer>
          <AppRoutes />
        </PageContainer>
      </div>
    </>
  );
}

export default App;
