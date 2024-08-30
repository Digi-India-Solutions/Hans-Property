import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRedirect();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div className="text-center">
        <h1 style={styles.heading}>404</h1>
        <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
        <button style={styles.button} onClick={handleRedirect}>
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'var(--bg-light-greenblue)',
    textAlign: 'center',
    color: 'var(--bg-dark-blue)',
  },
  heading: {
    fontSize: '6rem',
    color: 'var(--color-blue-light)',
  },
  message: {
    fontSize: '1.5rem',
    color: 'var(--bg-dark-blue)',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: 'var(--bg-greenblue)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.5rem',
    fontSize: '1.2rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ErrorPage;
