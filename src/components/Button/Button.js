import Loading from "../Loading/Loading";
import "./Button.css";

const Button = ({ children, text, classname, onClick, type, loading }) => {
  return (
    <>
      {loading ? (
        <button className="loadingBtn" disabled>
          <span>Loading...</span> <Loading size={30} />
        </button>
      ) : (
        <button
          className={`btn ${classname ? classname : ""}`}
          onClick={onClick}
          type={type}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
