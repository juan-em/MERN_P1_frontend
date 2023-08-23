const Error = ({ error }) => {
    return <p className="errmsg">{error?.data?.message}</p>;
};

export default Error