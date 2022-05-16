import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Form } from "react-bootstrap";
import axios from "axios";
import FormContainer from "components/FormContainer";

export default function SignUp() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);

  const createAnAccount = async (formData) => {
    const { data } = await axios.post("/auth/sign-up", formData);
    setCookie("token", data.token, {
      maxAge: data.expiresIn,
    });
    navigate("/profile");
  };

  return (
    <FormContainer
      title="Sign up"
      button="Sign up"
      form={["email", "password"]}
      onSubmit={createAnAccount}
    >
      <Form.Text className="text-muted d-block">
        Already have an account?
        <Link to="/sign-in" className="mx-1">
          Sign in
        </Link>
      </Form.Text>
    </FormContainer>
  );
}
