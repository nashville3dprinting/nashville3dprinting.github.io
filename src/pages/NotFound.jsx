import { Link } from "react-router-dom";
import "../css/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="back-home">
        ← Back to Home
      </Link>
    </div>
  );
}
