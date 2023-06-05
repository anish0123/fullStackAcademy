const Notification = ({ errorMessage, message }) => {
  console.log("🚀 ~ file: Notification.js:2 ~ Notification ~ message:", message)
  
  const error = errorMessage !== undefined && message === "";
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === "" && errorMessage === "") {
    return null;
  } else if(error) {
    return <div style={errorStyle}>{errorMessage}</div>
  } else if(!error) {
    console.log(message)
    return <div style={messageStyle}>{message}</div>
  }

};

export default Notification;
