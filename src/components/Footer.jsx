import { useState, useEffect } from "react";
import "../css/Footer.css";
import config from "../config";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {config.site.year} {config.site.name} — All Rights Reserved</p>
        <p>
          Contact: <a href={`mailto:${config.site.email}`}>{config.site.email}</a>
        </p>
      </div>
      {showTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          ↑ Top
        </button>
      )}
    </footer>
  );
}
