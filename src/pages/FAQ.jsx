// src/pages/FAQ.jsx
import { useState, useMemo, useEffect } from "react";
import SEO from "../components/SEO";
import seoConfig from "../config/Seo";
import faqData from "../config/faqData";
import "../css/FAQ.css";

// Map categories to emojis/icons
const CATEGORY_ICONS = {
  "Getting Started": "✨",
  "Files & Requirements": "📁",
  "Materials & Quality": "🧵",
  "Pricing & Turnaround": "💲",
  "Orders & Pickup": "📦",
};

function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || "📂";
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState(
    () => (faqData.length > 0 ? [faqData[0].category] : [])
  );
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredData = useMemo(() => {
    if (!normalizedSearch) return faqData;

    return faqData
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          const q = item.question.toLowerCase();
          const a = item.answer.toLowerCase();
          return q.includes(normalizedSearch) || a.includes(normalizedSearch);
        });
        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  }, [normalizedSearch]);

  // Deep-link support on initial load: /faq#some-question-id
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const section = faqData.find((sec) =>
      sec.items.some((item) => item.id === hash)
    );
    if (!section) return;

    setOpenCategories([section.category]); // open that category
    setOpenQuestionId(hash);              // open that question

    // Scroll to the question after it renders
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  }, []);

  // Accordion: only one category open at a time
  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName) ? [] : [categoryName]
    );
  };

  // Toggle question open/closed and update URL hash
  const toggleQuestion = (id) => {
    setOpenQuestionId((prev) => {
      const next = prev === id ? null : id;

      if (next) {
        // Keep pathname/search, update hash
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}#${next}`
        );
      } else {
        // Clear hash
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`
        );
      }

      return next;
    });
  };

  const hasSearchResults =
    filteredData.length > 0 &&
    filteredData.some((section) => section.items.length > 0);

  return (
    <main className="faq-page">
        <SEO
          title="FAQ — MySite"
          description="FAQ — Description"
          keywords={seoConfig.keywords} // or change for each page
        />
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>
          Browse by category, or use the search bar to quickly find answers.
        </p>

        <div className="faq-search-wrapper">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpenQuestionId(null);
            }}
          />
        </div>
      </header>

      {normalizedSearch && !hasSearchResults && (
        <div className="faq-no-results">
          No questions matched your search. Try a different keyword.
        </div>
      )}

      <section className="faq-sections">
        {filteredData.map((section) => {
          const isOpen = openCategories.includes(section.category);

          return (
            <article key={section.category} className="faq-section">
              <button
                className="faq-section-header"
                onClick={() => toggleCategory(section.category)}
                aria-expanded={isOpen}
              >
                <span className="faq-section-title">
                  <span className="faq-section-icon" aria-hidden="true">
                    {getCategoryIcon(section.category)}
                  </span>
                  <span>{section.category}</span>
                </span>

                <span className="faq-section-count">
                  {section.items.length}{" "}
                  {section.items.length === 1 ? "question" : "questions"}
                </span>

                <span
                  className={`faq-section-chevron ${
                    isOpen ? "open" : "closed"
                  }`}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="faq-section-body">
                  {section.items.map((item) => {
                    const isQuestionOpen = openQuestionId === item.id;

                    return (
                      <div
                        key={item.id}
                        className="faq-item"
                        id={item.id} // for deep linking / scrolling
                      >
                        <button
                          className="faq-question"
                          onClick={() => toggleQuestion(item.id)}
                          aria-expanded={isQuestionOpen}
                        >
                          <span>{item.question}</span>
                          <span
                            className={`faq-question-chevron ${
                              isQuestionOpen ? "open" : "closed"
                            }`}
                          >
                            ▾
                          </span>
                        </button>

                        {isQuestionOpen && (
                          <div
                            className="faq-answer"
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </section>

      <section className="faq-contact">
        <h2>Still need help?</h2>
        <p>
          You can link this section to a contact form or support email, so
          visitors can reach out if their question isn&apos;t answered here.
        </p>
        <button
          type="button"
          className="faq-contact-button"
          onClick={() => {
            // Hook this up to your routing or contact form later
          }}
        >
          Contact Support
        </button>
      </section>
    </main>
  );
}
