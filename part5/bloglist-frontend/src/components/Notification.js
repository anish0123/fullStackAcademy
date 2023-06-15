const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null;
  }
  if (message !== null && errorMessage === null) {
    return <div className="message">{message}</div>;
  } else if (message === null && errorMessage !== null) {
    return <div className="error">{errorMessage}</div>;
  }
};

export default Notification;
