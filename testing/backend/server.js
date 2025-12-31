const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const UA = "osrs-demo-app/0.1 (contact: you@example.com)";

// --- tiny in-memory cache ---
const cache = new Map();
const getCache = (k) => {
  const v = cache.get(k);
  return v && v.exp > Date.now() ? v.data : null;
};
const setCache = (k, data, ms) => cache.set(k, { data, exp: Date.now() + ms });

// fetch helper (JSON) with UA
async function fetchJSON(url, init = {}) {
  const r = await fetch(url, { ...init, headers: { ...(init.headers || {}), "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${url}`);
  return r.json();
}

// --- bonuses via Cargo (items + equipment) ---
async function fetchBonusesCargo(id) {
  const key = `bonuses:cargo:${id}`;
  const cached = getCache(key);
  if (cached !== undefined) return cached;

  const qs = new URLSearchParams({
    action: "cargoquery",
    format: "json",
    limit: "1",
    tables: "items,equipment",
    join_on: "items._pageID=equipment._pageID",
    fields: [
      "equipment.astab","equipment.aslash","equipment.acrush","equipment.arange","equipment.amagic",
      "equipment.dstab","equipment.dslash","equipment.dcrush","equipment.drange","equipment.dmagic",
      "equipment.str","equipment.rstr","equipment.mdmg","equipment.prayer","equipment.slot",
    ].join(","),
    where: `items.id=${id}`,
  });

  try {
    const j = await fetchJSON(`https://oldschool.runescape.wiki/api.php?${qs.toString()}`);
    const t = j?.cargoquery?.[0]?.title;
    const result = t
      ? {
          attack: {
            stab: +t.astab || 0, slash: +t.aslash || 0, crush: +t.acrush || 0,
            magic: +t.amagic || 0, ranged: +t.arange || 0,
          },
          defence: {
            stab: +t.dstab || 0, slash: +t.dslash || 0, crush: +t.dcrush || 0,
            magic: +t.dmagic || 0, ranged: +t.drange || 0,
          },
          other: { str: +t.str || 0, rstr: +t.rstr || 0, mdmg: +t.mdmg || 0, prayer: +t.prayer || 0 },
          slot: t.slot || null,
        }
      : null;
    setCache(key, result, 12 * 60 * 60 * 1000);
    return result;
  } catch {
    setCache(key, null, 10 * 60 * 1000);
    return null;
  }
}

// --- bonuses via wikitext fallback (parse {{Infobox Bonuses}}) ---
function parseInfoboxBonuses(wikitext) {
  if (!wikitext) return null;
  const m = wikitext.match(/\{\{\s*Infobox\s+Bonuses[\s\S]*?\}\}/i);
  if (!m) return null;
  const box = m[0];

  const pick = (k) => {
    const re = new RegExp(`[|\\n]\\s*${k}\\s*=\\s*([^\\n|}]+)`, "i");
    const mm = box.match(re);
    return mm ? mm[1].trim() : null;
  };
  const toNum = (s) => (s ? Number(String(s).replace(/[^0-9+-.]/g, "")) || 0 : 0);

  const result = {
    attack: {
      stab: toNum(pick("astab")),
      slash: toNum(pick("aslash")),
      crush: toNum(pick("acrush")),
      magic: toNum(pick("amagic")),
      ranged: toNum(pick("arange")),
    },
    defence: {
      stab: toNum(pick("dstab")),
      slash: toNum(pick("dslash")),
      crush: toNum(pick("dcrush")),
      magic: toNum(pick("dmagic")),
      ranged: toNum(pick("drange")),
    },
    other: {
      str: toNum(pick("str")),
      rstr: toNum(pick("rstr")),
      mdmg: toNum(pick("mdmg")),
      prayer: toNum(pick("prayer")),
    },
    slot: pick("slot"),
  };

  // sanity: if everything is 0 and no slot, treat as null
  const sum =
    result.attack.stab + result.attack.slash + result.attack.crush +
    result.attack.magic + result.attack.ranged +
    result.defence.stab + result.defence.slash + result.defence.crush +
    result.defence.magic + result.defence.ranged +
    result.other.str + result.other.rstr + result.other.mdmg + result.other.prayer;
  return sum === 0 && !result.slot ? null : result;
}

async function fetchBonusesWikitextFromUrl(wikiUrl) {
  if (!wikiUrl) return null;
  const title = decodeURIComponent(wikiUrl.split("/w/").pop() || "").replace(/^\//, "");
  if (!title) return null;

  const key = `bonuses:wikitext:${title}`;
  const cached = getCache(key);
  if (cached !== undefined) return cached;

  try {
    const qs = new URLSearchParams({
      action: "parse",
      format: "json",
      prop: "wikitext",
      redirects: "1",
      page: title,
    });
    const j = await fetchJSON(`https://oldschool.runescape.wiki/api.php?${qs.toString()}`);
    const wikitext = j?.parse?.wikitext?.["*"] || "";
    const parsed = parseInfoboxBonuses(wikitext);
    setCache(key, parsed, 12 * 60 * 60 * 1000);
    return parsed;
  } catch {
    setCache(key, null, 10 * 60 * 1000);
    return null;
  }
}

app.get("/", (_, res) => res.send("OSRS backend up"));

// ---- Main endpoint ----
app.get("/api/item/:name", async (req, res) => {
  try {
    const name = req.params.name.trim().toLowerCase();

    // mapping (name -> id + meta)
    let mapping = getCache("mapping");
    if (!mapping) {
      mapping = await fetchJSON("https://prices.runescape.wiki/api/v1/osrs/mapping");
      setCache("mapping", mapping, 6 * 60 * 60 * 1000); // 6h
    }

    const item = mapping.find((m) => m.name.toLowerCase() === name);
    if (!item) return res.status(404).json({ error: "Item not found" });

    // prices
    let latest = getCache("latest");
    if (!latest) {
      latest = await fetchJSON("https://prices.runescape.wiki/api/v1/osrs/latest");
      setCache("latest", latest, 60 * 1000); // 60s
    }

    const p = latest.data?.[String(item.id)];
    const price = p ? { high: p.high, highTime: p.highTime, low: p.low, lowTime: p.lowTime } : null;

    const stats = {
      id: item.id,
      examine: item.examine,
      members: item.members,
      value: item.value,
      highalch: item.highalch,
      lowalch: item.lowalch,
      limit: item.limit,
      wiki_url: item.wiki_url,
      icon: item.icon,
    };

    // bonuses: cargo -> fallback to wikitext parse
    let bonuses = await fetchBonusesCargo(item.id);
    if (!bonuses) {
      bonuses = await fetchBonusesWikitextFromUrl(item.wiki_url);
    }

    res.json({ name: item.name, id: item.id, price, stats, bonuses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
