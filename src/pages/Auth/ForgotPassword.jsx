import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormContainer from "components/FormContainer";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const sendLinkToEmail = async (formData) => {
    await axios.post("/auth/forgot-password", formData);
    navigate("/sign-in");
  };

  return (
    <FormContainer
      title="Password recovery"
      button="Send mail"
      form={["email"]}
      onSubmit={sendLinkToEmail}
    />
  );
}
