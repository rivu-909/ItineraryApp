import "./Button.css";

export default function Button({ children, onClick, size }) {
  return (
    <div className="buttonContainer" id={size}>
      <button className="button" onClick={onClick} id={size}>
        {children}
      </button>
    </div>
  );
}
