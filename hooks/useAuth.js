// src/hooks/useAuth.js
import { useNavigate } from "react-router-dom";
import useAuthStore from "../src/components/auth/AuthStore";
import { API_ROUTES } from "../src/api";

const useAuth = () => {
  const { user, token, login, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(API_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Invalid email or password" };
      }

      const data = await response.json();
      const { token, user: userData } = data;

      if (token) {
        login(userData, token); // Save user and token in the store
        navigate("/services");
        return { error: null }; // Success
      } else {
        return { error: "Login failed, no token received" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { error: "Login failed due to server error" };
    }
  };

  const handleRegister = async (email, password, additionalData = {}) => {
    try {
      const response = await fetch(API_ROUTES.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, ...additionalData }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Registration failed" };
      }

      const data = await response.json();
      const { token, user: userData } = data;

      if (token) {
        login(userData, token); // Automatically log in after registration
        navigate("/services");
        return { error: null }; // Success
      } else {
        return { error: "Registration failed, no token received" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { error: "Registration failed due to server error" };
    }
  };

  const handleLogout = () => {
    logout(); // Clear auth store
    navigate("/login"); // Redirect to login
  };



  return { user, token, handleLogin, handleRegister, handleLogout, isAuthenticated };
};

export default useAuth;
