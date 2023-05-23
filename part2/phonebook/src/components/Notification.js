const Notification = ({message}) => {
    const error = message.includes("has already been removed");
    const messageStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
 if(message === "") {
    return (null)
 }
 return(
    <div style={error ? errorStyle: messageStyle}>
        {message}
    </div>
 )
};

export default Notification;