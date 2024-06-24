import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { useUserContext } from "../contexts/UserContext";

const Logout = () => {
  const { setLoggedIn } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isSuccesful = logout();
    if (isSuccesful) {
      setLoggedIn(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;
