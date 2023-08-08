import "./ApiErrorMessage.css";

export default function ApiErrorMessage({ errorText, placement }) {
  return (
    <span className={`error-message error-message_${placement} ${errorText ? "error-message_visible" : ""}`}>{errorText || "#"}</span>
  );
};
