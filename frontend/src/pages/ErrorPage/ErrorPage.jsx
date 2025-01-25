import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ErrorPage.module.scss'; // Import the SCSS module
import Button from '../../components/shared/Buttons/Buttons';
import Error404 from '../../assets/Error404.svg?react';
const ErrorPage = () => {
  const { errorId: id } = useParams();
  const navigate = useNavigate();

  const errorMessages = [
    { code: "401", message: "Unauthorized access. Please login again." },
    { code: "403", message: "You do not have permission to access this page." },
    { code: "404", message: "The requested resource was not found." },
    { code: "405", message: "Invalid request." },
    { code: "409", message: "Resource already exists." },
    { code: "422", message: "This item already exists." },
    { code: "501", message: "Session expired. Please login again." },
    { code: "504", message: "Network error. Please try again later." },
    { code: "default", message: "An unexpected error occurred." },
  ];

  const errorMessage =
    errorMessages.find((error) => error.code === id)?.message ||
    "An unknown error occurred.";

  const handleClick = () => {
    // localStorage.clear();
    navigate(-1)
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.leftSide}>
        <Error404 className={styles.img} />
      </div>
      <div className={styles.rightSide}>
        <h1 className={styles.statusCode}>{id}</h1>
        <h1 className={styles.errorHeader}>Error</h1>
        <div className={styles.errorDetails}>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <p className={styles.contactMessage}>
            Please try logging in again.
          </p>
        </div>
        <p className={styles.button}>
          <Button onClick={handleClick}>Go Back</Button>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
