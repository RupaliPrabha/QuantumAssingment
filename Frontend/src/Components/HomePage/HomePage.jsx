import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HomePage.module.css"; 

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get("http://localhost:8050/user/getall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  return (
    <div className={styles.container}>
      <h2>User Details</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          className={currentPage === 1 ? styles.disabled : ""}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? styles.disabled : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={currentPage === totalPages ? styles.disabled : ""}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div className={styles.pageInfo}>
        {`Page ${currentPage} of ${totalPages}`}
      </div>
    </div>
  );
};

export default UserTable;
