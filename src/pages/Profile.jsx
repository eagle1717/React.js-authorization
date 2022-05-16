import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

export default function Profile() {
  const [user, setUserInfo] = useState({});

  useEffect(() => {
    const loadUserInfo = async () => {
      const { data } = await axios.get("/profile");
      setUserInfo(data.userInfo);
    };
    loadUserInfo();
  }, []);
  return (
    <>
      <h3 className="text-dark mb-4">Account information</h3>
      <Card className="m-auto py-2">
        <Card.Body>
          <Card.Title className="m-0">
            <pre className="m-0">{JSON.stringify(user, null, 2)}</pre>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}
