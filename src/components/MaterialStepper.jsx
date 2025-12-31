import { useMemo, useState } from "react";
import Card from "./Card";
import "../css/MaterialStepper.css";

export default function MaterialStepper({ materials = [] }) {
  const items = useMemo(() => materials.filter(Boolean), [materials]);
  const [i, setI] = useState(0);

  if (!items.length) return null;

  const current = items[i];

  const prev = () => setI((v) => (v - 1 + items.length) % items.length);
  const next = () => setI((v) => (v + 1) % items.length);

  return (
    <section className="mat" aria-label="Materials">
      <Card title="Materials we offer">
        <div className="mat__inner">
          {/* Stepper row */}
          <div className="mat__stepper" role="tablist" aria-label="Material selector">
            {items.map((m, idx) => {
              const active = idx === i;
              return (
                <button
                  key={m.key || m.name}
                  type="button"
                  className={`mat__step ${active ? "is-active" : ""}`}
                  onClick={() => setI(idx)}
                  role="tab"
                  aria-selected={active}
                  aria-current={active ? "true" : undefined}
                >
                  <span className="mat__stepText">{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Content + controls */}
          <div className="mat__body">
            <div className="mat__content">
              {current.summary && <p className="mat__summary">{current.summary}</p>}

              {current.bestFor?.length ? (
                <ul className="mat__bestFor" aria-label="Best for">
                  {current.bestFor.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : null}

              {current.notes ? <p className="mat__notes">{current.notes}</p> : null}
            </div>

            <div className="mat__controls" aria-label="Material navigation">
              <button type="button" className="mat__btn" onClick={prev}>
                Prev
              </button>
              <div className="mat__index" aria-label="Current material index">
                {i + 1} / {items.length}
              </div>
              <button type="button" className="mat__btn" onClick={next}>
                Next
              </button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
