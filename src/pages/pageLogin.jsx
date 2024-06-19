import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Modal, Button } from "flowbite-react";
import "../styles/LoginPage.css";
import { isAdmin, isUser, hasNoToken, isTokenExpired } from "../utils/auth";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (isAdmin()) {
      navigate("/dashboard");
    } else if (isUser()) {
      navigate("/dashboard");
    } else if (isTokenExpired()) {
      setError("Token expired. Please log in again.");
      setIsModalOpen(true);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsModalOpen(false);

    try {
      const response = await axios.post(
        "https://backend-2ktb.onrender.com/api/auth/login",
        { user, password }
      );
      const { token } = response.data;

      // Save the token in the local storage and Zustand
      setToken(token);

      // Show success message and redirect to dashboard after 3 seconds
      setSuccess("Login successful! Redirecting to dashboard...");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again.");
      }
      setIsModalOpen(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsModalOpen(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-2ktb.onrender.com/api/auth/register",
        { user, password, email, name }
      );
      setSuccess(
        `User created successfully! Welcome, ${name}. Redirecting to login...`
      );
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsRegistering(false);
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        {isRegistering && (
          <>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegistering && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn-login">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="btn-toggle"
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>{error ? "Error" : "Success"}</Modal.Header>
        <Modal.Body>
          <p>{error || success}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
