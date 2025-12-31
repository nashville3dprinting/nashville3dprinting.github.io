// src/pages/Contact.jsx
import Card from "../components/Card";
import seoConfig from "../config/Seo";
import SEO from "../components/SEO";
import "../css/Contact.css";

const TALLY_FORM_URL =
  "https://tally.so/embed/QK1YBk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export default function Contact() {
  return (
    <main className="contact-page">
      <SEO
        title="Contact — MySite"
        description="Contact — Description"
        keywords={seoConfig.keywords} // or change for each page
      />
      {/* Page title (not inside a card) */}
      <header className="contact-header">
        <h1>Contact & Quote Request</h1>
        <p>
          Tell us about your 3D printing project and we&apos;ll get back to you
          with timing and pricing details.
        </p>
      </header>

      <section className="contact-layout">
        {/* LEFT: single Card, minimizable */}
        <div className="contact-info">
          <Card
            title="How it works"
            minimizable
            storageKey="contact-how-it-works"
          >
            <p>
              Fill out the form below with as much detail as you can. If you have
              files (STL, OBJ, ZIP), you can attach them directly in the form.
            </p>
            <p>
              We typically respond within <strong>1–2 business days</strong>.
            </p>

            <div className="contact-details">
              <h3>Direct contact</h3>
              <p>
                Email:{" "}
                <a href="mailto:nashville3dprinting@gmail.com">
                  nashville3dprinting@gmail.com
                </a>
                <br />
                Phone/Text: <strong>(209) 202-3221</strong>
              </p>
            </div>

            <button
              type="button"
              className="contact-open-tally"
              onClick={() => {
                window.open(TALLY_FORM_URL, "_blank", "noopener,noreferrer");
              }}
            >
              Open form in new tab
            </button>
          </Card>
        </div>

        {/* RIGHT: embedded Tally form */}
        <div className="contact-form-embed">
          <iframe
            src={TALLY_FORM_URL}
            title="Quote Request Form"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            loading="lazy"
            allow="fullscreen; clipboard-read; clipboard-write"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </main>
  );
}
