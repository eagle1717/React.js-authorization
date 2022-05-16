import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Form } from "react-bootstrap";
import axios from "axios";
import FormContainer from "components/FormContainer";

export default function SignIn() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);

  const loginToAccount = async (formData) => {
    const { data } = await axios.post("/auth/sign-in", formData);
    setCookie("token", data.token, {
      maxAge: data.expiresIn,
    });
    navigate("/profile");
  };

  return (
    <FormContainer
      title="Sign in"
      button="Sign in"
      form={["email", "password"]}
      onSubmit={loginToAccount}
    >
      <Form.Text className="text-muted d-block">
        Forgot password?
        <Link to="/forgot-password" className="mx-1">
          Password recovery
        </Link>
      </Form.Text>
    </FormContainer>
  );
}
