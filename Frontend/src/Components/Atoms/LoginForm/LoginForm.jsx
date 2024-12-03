import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import  profile from '../../../assets/profile2.png'
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8050/user/login",
        formData
      ); 
      const { token, userId } = response.data.data;
      console.log("Login successful", token, userId);

      localStorage.setItem("authToken", token);

      navigate("/homepage"); 
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Invalid credentials.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles["Login-card"]}>
      <div className={styles["Login-card_wrapper"]}>
        <h2 className={styles["Login-card_title"]}>SIGN IN</h2>
        <div >
          <img className={styles["Login-card_avtar"]}  src={profile} alt="profile" />
        </div>
        <form onSubmit={handleSubmit} className={styles["Login-card_form"]}>
          <div className={styles["form_inputGroup"]}>
            <input
              type="text"
              name="email"
              placeholder="username"
              className={styles["form_inputGroup__input"]}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles["form_inputGroup"]}>
            <input
              type="password"
              name="password"
              placeholder="password"
              className={styles["form_inputGroup__input"]}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles["form__options"]}>
            <label className={styles["form__remember"]}>
              <input type="checkbox" /> Remember me
            </label>
            <span className={styles["form__forgot"]}>
              Forgot your password?
            </span>
          </div>
          <button className={styles["form__button"]}>LOGIN</button>

          {error && <span className={styles["form__error"]}>{error}</span>}

          {/* Span for "Don't have an account?" */}
          <span className={styles["form__register"]}>
            Don’t have an account?{" "}
            <a
              href="/register"
              className={styles["form__register-link"]}
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Register here
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
