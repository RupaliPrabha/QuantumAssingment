import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showLoginLink, setShowLoginLink] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setShowLoginLink(false);

    try {
      const response = await axios.post(
        "http://localhost:8050/user/register", 
        formData
      );
      setMessage(response.data.msg); 
      setFormData({
        name: "",
        email: "",
        password: "",
        dob: "",
      });

      setShowLoginLink(true);
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Something went wrong";
      setError(errorMessage);

      if (errorMessage.includes("already registered")) {
        setShowLoginLink(true);
      }
    }
  };

  return (
    <div className={styles["register-container"]}>
    <div className={styles["register-container_wrapper"]}>
      <h1 className={styles["wrapper__title"]} >Register</h1>
      <form className={styles["register-containerr_form"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label  htmlFor="name">Name</label>
          <input 
          className={styles["form-group__input"]}
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
           className={styles["form-group__input"]}
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="dob">Date of Birth</label>
          <input
           className={styles["form-group__input"]}
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
           className={styles["form-group__input"]}
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className={styles.btn}>
          Register
        </button>
      </form>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
      {showLoginLink && (
        <span className={styles["redirect-to-login"]}>
          <a href="/login" onClick={() => navigate("/login")}>
            Click here to login
          </a> 
        </span>
      )}
    </div>
    </div>
  );
};

export default UserRegister;
