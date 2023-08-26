export const Error = ({ error }) => {
    let errorMessage
    //because the error I got from mutation or querys when the server is offline
    // {"status":"FETCH_ERROR","error":"TypeError: Failed to fetch"}
    if (error.status === "FETCH_ERROR") {
        errorMessage = "No server response"
    } else {
        errorMessage = error?.data?.message
    }
    return <p className="errmsg">{errorMessage}</p>;
};




