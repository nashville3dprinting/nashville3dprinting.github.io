import { useState } from "react";

export default function ItemLookup() {
  const [query, setQuery] = useState("Abyssal Whip");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setData(null);
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/item/${encodeURIComponent(query.trim())}`;
      const r = await fetch(url);
      const ct = r.headers.get("content-type") || "";
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`HTTP ${r.status}: ${txt.slice(0, 160)}`);
      }
      if (!ct.includes("application/json")) {
        const txt = await r.text();
        throw new Error(`Expected JSON, got: ${ct} → ${txt.slice(0, 160)}...`);
      }
      setData(await r.json());
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: "1rem" }}>
      <h2>OSRS Item Test</h2>
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type an item…"
          style={{ flex: 1, padding: "0.6rem" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading…" : "Lookup"}
        </button>
      </form>

      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {data && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <h3>
            {data.name} (ID: {data.id})
          </h3>

          {data.stats?.icon && (
            <img
              alt={`${data.name} icon`}
              src={`https://oldschool.runescape.wiki${data.stats.icon}`}
              style={{ imageRendering: "pixelated" }}
            />
          )}

          <p>
            <strong>GE (high/low):</strong>{" "}
            {data.price?.high?.toLocaleString() ?? "—"} gp /{" "}
            {data.price?.low?.toLocaleString() ?? "—"} gp
          </p>
          <p>
            <strong>Value:</strong> {data.stats?.value?.toLocaleString() ?? "—"} gp •{" "}
            <strong>High Alch:</strong> {data.stats?.highalch?.toLocaleString() ?? "—"} gp •{" "}
            <strong>Limit:</strong> {data.stats?.limit ?? "—"}
          </p>
          <p>
            <a href={data.stats?.wiki_url} target="_blank" rel="noreferrer">
              Wiki page
            </a>
          </p>

          {/* Bonuses */}
          {data?.bonuses ? (
            <div style={{ marginTop: 12 }}>
              <h4>Equipment bonuses</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, minmax(0,1fr))",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <div></div>
                <strong>Stab</strong>
                <strong>Slash</strong>
                <strong>Crush</strong>
                <strong>Magic</strong>
                <strong>Ranged</strong>

                <strong>Attack</strong>
                <div>{data.bonuses.attack.stab}</div>
                <div>{data.bonuses.attack.slash}</div>
                <div>{data.bonuses.attack.crush}</div>
                <div>{data.bonuses.attack.magic}</div>
                <div>{data.bonuses.attack.ranged}</div>

                <strong>Defence</strong>
                <div>{data.bonuses.defence.stab}</div>
                <div>{data.bonuses.defence.slash}</div>
                <div>{data.bonuses.defence.crush}</div>
                <div>{data.bonuses.defence.magic}</div>
                <div>{data.bonuses.defence.ranged}</div>
              </div>

              <p style={{ marginTop: 8 }}>
                <strong>Other:</strong> Str {data.bonuses.other.str} • R.Str {data.bonuses.other.rstr} •
                M.Dmg {data.bonuses.other.mdmg}% • Prayer {data.bonuses.other.prayer}
                {data.bonuses.slot ? (
                  <>
                    {" "}
                    • <em>Slot: {data.bonuses.slot}</em>
                  </>
                ) : null}
              </p>
            </div>
          ) : (
            <p style={{ marginTop: 8, opacity: 0.8 }}>No equipment bonuses (not equippable).</p>
          )}
        </div>
      )}
    </div>
  );
}
