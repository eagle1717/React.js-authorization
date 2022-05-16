import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navbar, Container, Button } from "react-bootstrap";
import PageContainer from "components/PageContainer";
import logo from "assets/icons/logo.svg";

export default function TheNavbar() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = () => {
    navigate("/sign-in");
  };
  const signUp = () => {
    navigate("/sign-up");
  };
  const redirectToProfile = () => {
    navigate("/profile");
  };
  const logoutFromSystem = () => {
    removeCookie("token");
    navigate("/sign-in");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <PageContainer>
        <Container
          fluid
          className="d-flex px-0 py-1 align-items-center justify-content-between"
        >
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          {cookie.token ? (
            <div>
              {location.pathname !== "/profile" && (
                <Button
                  variant="success"
                  className="ml-2 me-4"
                  onClick={redirectToProfile}
                >
                  Profile
                </Button>
              )}
              <Button variant="outline-danger" onClick={logoutFromSystem}>
                Log out
              </Button>
            </div>
          ) : (
            <>
              {location.pathname === "/sign-in" ? (
                <Button variant="outline-info" onClick={signUp}>
                  Sign up
                </Button>
              ) : (
                <Button variant="outline-info" onClick={signIn}>
                  Sign in
                </Button>
              )}
            </>
          )}
        </Container>
      </PageContainer>
    </Navbar>
  );
}
