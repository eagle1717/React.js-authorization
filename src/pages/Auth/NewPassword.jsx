import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import FormContainer from "components/FormContainer";

export default function NewPassword() {
  const navigate = useNavigate();
  const queryParams = queryString.parse(window.location.search);

  const updatePasswordEvent = async (formData) => {
    await axios.post("/auth/update-password", {
      ...formData,
      email: queryParams.email,
    });
    navigate("/sign-in");
  };

  useEffect(() => {
    if (queryParams.link && queryParams.link.trim().length > 0) {
      const checkLink = async () => {
        try {
          await axios.post("/auth/confirm-link", {
            email: queryParams.email,
            link: queryParams.link,
          });
        } catch {
          navigate("/forgot-password");
        }
      };
      checkLink();
    } else {
      navigate("/forgot-password");
    }
  }, []);

  return (
    <FormContainer
      title="Set up a new password"
      button="Update password"
      form={["password"]}
      onSubmit={updatePasswordEvent}
    />
  );
}
