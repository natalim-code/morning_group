


---

```tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

/**
 * Single-file React site (Hebrew) for:
 * "מבוא למערכות מידע וניהול נתונים"
 * - No multi-file split
 * - No external UI libs
 * - Hash routing
 * - CSS embedded
 * - Animated sections + cards
 * - Trends coverage (Lakehouse, Data Mesh, Streaming, Vector DB, Governance, Privacy, FinOps, Observability)
 */

type RouteKey = "home" | "syllabus" | "trends" | "resources" | "assignments" | "about";

type Week = {
  week: number;
  title: string;
  topics: string[];
  lab?: string[];
  deliverable?: string;
};

const courseMeta = {
  name: "מבוא למערכות מידע וניהול נתונים",
  tagline: "להבין, לתכנן ולנהל דאטה בארגון — מהבסיס ועד למגמות הכי עדכניות.",
  highlights: [
    "Lakehouse • Data Lake • Data Warehouse",
    "Data Mesh • Data Products • Ownership",
    "Streaming • Event-Driven • CDC",
    "Vector DB • RAG • GenAI על נתונים",
    "Data Governance • Catalog • Lineage",
    "Privacy & Security • Zero Trust • RBAC",
    "FinOps • Serverless • Cloud-native",
    "Data Observability • Quality • Freshness",
  ],
  outcomes: [
    "להבין כיצד מערכות מידע תומכות בתהליכים עסקיים ובהחלטות (BI/AI).",
    "לתכנן מודל נתונים בסיסי (ERD) ולעבוד עם SQL.",
    "להכיר ארכיטקטורות נתונים מודרניות ולבחור פתרון בהתאם לצורך.",
    "להבין מגמות: Data Mesh, Lakehouse, Streaming, Vector DB, RAG.",
    "ליישם עקרונות Governance, איכות נתונים, אבטחה ופרטיות.",
    "לחשוב תפעולית: עלות, ניטור, SLA/SLO, אמינות, ותחזוקה.",
  ],
};

const weeks: Week[] = [
  {
    week: 1,
    title: "מבוא: מערכות מידע בארגון ומעגל חיי נתונים",
    topics: ["סוגי מערכות מידע", "דאטה כמשאב", "KPI/BI", "Data Lifecycle", "מדדים מול מטרות עסקיות"],
    lab: ["היכרות עם מושגים", "דוגמת תהליך החלטה מבוסס נתונים"],
  },
  {
    week: 2,
    title: "מידול נתונים (ERD) ונרמול בסיסי",
    topics: ["ישויות וקשרים", "מפתחות (Primary/Foreign)", "נרמול 1NF–3NF", "Tradeoffs מול ביצועים"],
    deliverable: "תרגיל ERD קצר",
  },
  {
    week: 3,
    title: "SQL: שאילתות, JOIN, Aggregations",
    topics: ["SELECT", "JOIN", "GROUP BY", "HAVING", "CASE", "Indexing בסיסי"],
    lab: ["תרגול JOIN ו-Aggregations", "חישוב KPI פשוט"],
  },
  {
    week: 4,
    title: "NoSQL ו-Use Cases (Document / Key-Value / Column / Graph)",
    topics: ["למה NoSQL", "Consistency", "Partitioning", "CAP", "מתי לא להשתמש ב-NoSQL"],
  },
  {
    week: 5,
    title: "Data Warehouse / Data Lake / Lakehouse",
    topics: ["Star/Snowflake", "ELT בעולם ענן", "פורמטים עמודיים (Parquet)", "Lakehouse והגיון מוצרי"],
  },
  {
    week: 6,
    title: "Pipelines: ETL/ELT, Orchestration, Observability",
    topics: ["Batch vs Streaming", "CDC", "תזמור תהליכים", "Data Tests", "Freshness/Volume/Schema Drift"],
    deliverable: "תרשים Pipeline + הסבר החלטות",
  },
  {
    week: 7,
    title: "Streaming בזמן אמת: Event-Driven Architecture",
    topics: ["Event log", "Consumers/Producers", "Windowing רעיונית", "Latency vs Accuracy", "Backpressure (מושגית)"],
  },
  {
    week: 8,
    title: "Governance: Catalog, Lineage, Ownership, Policies",
    topics: ["Metadata", "קטלוג נתונים", "Lineage", "Data Contracts", "אחריות דומיינית"],
  },
  {
    week: 9,
    title: "אבטחה, פרטיות, רגולציה ואתיקה",
    topics: ["Zero Trust", "RBAC/ABAC", "Encryption", "Masking", "Privacy-by-Design", "ניהול PII"],
  },
  {
    week: 10,
    title: "GenAI על נתונים: Vector DB, Embeddings, RAG",
    topics: ["Embeddings", "Vector Search", "RAG", "Prompt + Retrieval", "Guardrails", "Evaluations (מושגית)"],
  },
  {
    week: 11,
    title: "Data Mesh: דאטה כמוצר (Data Products)",
    topics: ["Domain Ownership", "Self-Serve Platform", "Federated Governance", "מדדי איכות למוצרי דאטה"],
  },
  {
    week: 12,
    title: "Cloud-Native, Serverless, FinOps + סיכום ופרויקט מסכם",
    topics: ["Scalability", "Cost governance", "SLA/SLO", "Architecture review", "תיעוד והצגה"],
    deliverable: "הצעת פרויקט מסכם",
  },
];

const trends = [
  {
    title: "Lakehouse",
    desc: "איחוד בין גמישות של Data Lake לבין ביצועים וניהול של Data Warehouse, עם שכבת טבלאות ו-Governance.",
    bullets: ["פורמטים עמודיים", "שכבת טבלאות", "גישה אחידה ל-BI/AI"],
    tag: "Architecture",
  },
  {
    title: "Data Mesh",
    desc: "מבנה ארגוני-טכנולוגי שבו דאטה מנוהל לפי דומיינים כמוצר, עם סטנדרטים משותפים ותשתית Self-Serve.",
    bullets: ["Ownership", "Data Products", "Federated Governance"],
    tag: "Org",
  },
  {
    title: "Real-time & Streaming",
    desc: "עיבוד אירועים בזמן אמת מאפשר תגובה מהירה: ניטור, Fraud, התאמה אישית, ונראות תפעולית עדכנית.",
    bullets: ["Event-driven", "CDC", "Latency-aware design"],
    tag: "Realtime",
  },
  {
    title: "Vector DB & RAG",
    desc: "חיפוש סמנטי ושילוב ידע ארגוני ביישומי GenAI דרך Embeddings, Vector Search ו-Retrieval-Augmented Generation.",
    bullets: ["Embeddings", "Semantic Search", "Guardrails"],
    tag: "GenAI",
  },
  {
    title: "Data Observability",
    desc: "ניטור איכות ותקינות דאטה: Freshness, Volume, Schema Drift, Anomalies, ו-Lineage כדי למנוע תקלות שקטות.",
    bullets: ["Tests", "Anomaly detection", "Lineage"],
    tag: "Reliability",
  },
  {
    title: "Privacy & Security by Design",
    desc: "פרטיות ואבטחה כחלק מהתכנון: הרשאות, הצפנה, מסכות נתונים, ומדיניות גישה עקבית לאורך כל הצינור.",
    bullets: ["Zero Trust", "RBAC/ABAC", "PII protection"],
    tag: "Security",
  },
  {
    title: "FinOps & Cost Governance",
    desc: "שליטה בעלויות ענן: מדידה, ייעול, הקצאת עלויות לצרכנים, ותכנון Scale חכם כדי למנוע בזבוז.",
    bullets: ["Showback/Chargeback", "Serverless fit", "Cost KPIs"],
    tag: "Cloud",
  },
];

const resources = [
  {
    title: "סיכומים והדגמות",
    desc: "סיכומים שבועיים, תרשימים, ודוגמאות מסודרות (אפשר להחליף לקישורים אמיתיים).",
    items: ["סיכום מושגי יסוד", "SQL Cheat Sheet", "Governance Checklist"],
  },
  {
    title: "תבניות עבודה",
    desc: "מסמכי טמפלט לפרויקט ולתרגילים כדי לשמור על סטנדרט מקצועי.",
    items: ["טמפלט ארכיטקטורה", "טמפלט Data Dictionary", "טמפלט Data Quality Rules"],
  },
  {
    title: "כלים נפוצים בתעשייה (מושגית)",
    desc: "לא חייבים לבחור מוצר ספציפי: חשוב להבין את הקטגוריות והעקרונות.",
    items: ["Orchestration", "Catalog", "BI/Dashboards", "Vector Search"],
  },
];

const assignments = [
  {
    title: "תרגיל 1: ERD ומידול נתונים",
    desc: "בחרו תרחיש ארגוני, בנו ERD, והסבירו החלטות ותלויות עסקיות.",
    bullets: ["ישויות וקשרים", "מפתחות", "נרמול בסיסי"],
    weight: 20,
  },
  {
    title: "תרגיל 2: SQL מעשי (JOIN + KPI)",
    desc: "כתבו סט שאילתות שמציג יכולת JOIN/Aggregations/CASE ויצירת KPI.",
    bullets: ["JOIN", "Aggregations", "אינדקסים בסיסיים"],
    weight: 25,
  },
  {
    title: "פרויקט מסכם: Data Platform End-to-End",
    desc: "ארכיטקטורה מלאה: מקורות → Pipeline → Storage → Consumption, כולל Governance, Security, Observability ועלות.",
    bullets: ["דיאגרמה + הסבר", "DQ + Lineage", "דמו (BI/AI)"],
    weight: 55,
  },
];

/* ----------------------- UI Helpers ----------------------- */

function useHashRoute(): [RouteKey, (r: RouteKey) => void] {
  const parse = (): RouteKey => {
    const raw = (window.location.hash || "#/home").replace("#", "");
    const path = raw.startsWith("/") ? raw.slice(1) : raw;
    const key = (path.split("?")[0] || "home") as RouteKey;
    const allowed: RouteKey[] = ["home", "syllabus", "trends", "resources", "assignments", "about"];
    return allowed.includes(key) ? key : "home";
  };

  const [route, setRoute] = useState<RouteKey>(parse);

  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (r: RouteKey) => {
    window.location.hash = `/${r}`;
  };

  return [route, go];
}

function cx(...arr: Array<string | false | undefined | null>) {
  return arr.filter(Boolean).join(" ");
}

function Icon({ name, className }: { name: string; className?: string }) {
  // minimal inline icons to keep single-file
  const common = "w-5 h-5";
  switch (name) {
    case "sparkle":
      return (
        <svg className={cx(common, className)} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l1.2 6.2L19.5 10l-6.3 1.8L12 18l-1.2-6.2L4.5 10l6.3-1.8L12 2z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "db":
      return (
        <svg className={cx(common, className)} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="6" rx="7.5" ry="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 6v6c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2V6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 12v6c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2v-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cx(common, className)} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9.2 12.2l1.8 1.8 3.9-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "flow":
      return (
        <svg className={cx(common, className)} viewBox="0 0 24 24" fill="none">
          <path d="M7 7h6a4 4 0 110 8H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7 7v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "arrow":
      return (
        <svg className={cx(common, className)} viewBox="0 0 24 24" fill="none">
          <path d="M9 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12H4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) el.classList.add("is-visible");
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const ref = useReveal();
  return (
    <section ref={ref} className="section reveal">
      <div className="sectionHead">
        <h2 className="h2">{title}</h2>
        {subtitle ? <p className="sub">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("card", className)}>{children}</div>;
}

function Pill({ text }: { text: string }) {
  return <span className="pill">{text}</span>;
}

function MiniChart() {
  // simple SVG line chart
  const data = useMemo(
    () => [
      { label: "שבוע 1", v: 12 },
      { label: "שבוע 3", v: 24 },
      { label: "שבוע 6", v: 44 },
      { label: "שבוע 9", v: 66 },
      { label: "שבוע 12", v: 84 },
    ],
    []
  );

  const w = 640;
  const h = 180;
  const pad = 22;
  const maxV = Math.max(...data.map((d) => d.v));
  const minV = Math.min(...data.map((d) => d.v));
  const x = (i: number) => pad + (i * (w - pad * 2)) / (data.length - 1);
  const y = (v: number) => pad + ((maxV - v) * (h - pad * 2)) / (maxV - minV || 1);

  const path = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d.v).toFixed(1)}`)
    .join(" ");

  return (
    <div className="chartWrap">
      <svg viewBox={`0 0 ${w} ${h}`} className="chart">
        {/* grid */}
        {[0, 1, 2, 3].map((g) => {
          const yy = pad + (g * (h - pad * 2)) / 3;
          return <line key={g} x1={pad} x2={w - pad} y1={yy} y2={yy} className="chartGrid" />;
        })}
        <path d={path} className="chartLine" />
        {data.map((d, i) => (
          <g key={d.label}>
            <circle cx={x(i)} cy={y(d.v)} r={4.2} className="chartDot" />
            <text x={x(i)} y={h - 8} textAnchor="middle" className="chartLabel">
              {d.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="chartNote">
        דוגמה להמחשת התקדמות: בסיס → SQL → Pipelines → Governance → GenAI על נתונים
      </div>
    </div>
  );
}

/* ----------------------- Pages ----------------------- */

function Home({ go }: { go: (r: RouteKey) => void }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="glow" aria-hidden="true" />
        <div className="heroInner">
          <div className="pillsRow">
            {courseMeta.highlights.slice(0, 4).map((t) => (
              <Pill key={t} text={t} />
            ))}
          </div>

          <h1 className="h1">{courseMeta.name}</h1>
          <p className="heroSub">{courseMeta.tagline}</p>

          <div className="heroCtas">
            <button className="btn primary" onClick={() => go("syllabus")}>
              לסילבוס מלא <span className="btnIcon"><Icon name="arrow" /></span>
            </button>
            <button className="btn ghost" onClick={() => go("trends")}>
              מגמות עדכניות
            </button>
            <a className="btn subtle" href="#contact">
              יצירת קשר
            </a>
          </div>

          <div className="heroGrid">
            <Card className="pad">
              <div className="cardTop">
                <span className="iconBox"><Icon name="db" /></span>
                <div className="cardTitle">תשתיות נתונים מודרניות</div>
              </div>
              <p className="text">
                נלמד איך מחברים מקורות נתונים, שכבות עיבוד ואחסון, וצריכה (BI/AI) בצורה נכונה.
              </p>
            </Card>

            <Card className="pad">
              <div className="cardTop">
                <span className="iconBox"><Icon name="flow" /></span>
                <div className="cardTitle">Pipelines ו-Streaming</div>
              </div>
              <p className="text">
                ETL/ELT, תזמור תהליכים, CDC וזרמים בזמן אמת — כולל השפעה על אמינות, ביצועים ועלויות.
              </p>
            </Card>

            <Card className="pad">
              <div className="cardTop">
                <span className="iconBox"><Icon name="shield" /></span>
                <div className="cardTitle">Governance + פרטיות</div>
              </div>
              <p className="text">
                הרשאות, הצפנה, Masking, מדיניות גישה ו-Data Quality — כחלק מהארכיטקטורה, לא כתוספת.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Section
        title="מה תדעו לעשות בסוף הקורס"
        subtitle="תוצרים ברורים שמכוונים לפרקטיקה: חשיבה מערכתית, שפה מקצועית, ובניית פתרון נתונים בסיסי."
      >
        <div className="grid2">
          {courseMeta.outcomes.map((o) => (
            <Card key={o} className="pad">
              <div className="text strong">{o}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="הדגמה ויזואלית" subtitle="גרף קליל (SVG) כחלק מהאתר — ללא ספריות חיצוניות.">
        <Card className="pad">
          <div className="rowBetween">
            <div>
              <div className="cardTitle">מפת התקדמות לאורך הסמסטר</div>
              <div className="muted">המחשה בלבד — אפשר להחליף לנתונים אמיתיים.</div>
            </div>
            <div className="badge">Best practice: תרגול קצר כל שבוע</div>
          </div>
          <div style={{ marginTop: 14 }}>
            <MiniChart />
          </div>
        </Card>
      </Section>
    </div>
  );
}

function Syllabus() {
  return (
    <div className="page">
      <Section
        title="סילבוס שבועי"
        subtitle="תוכנית מומלצת ל-12 מפגשים. כל שבוע כולל נושאים מרכזיים ולעיתים תרגול/הגשה."
      >
        <div className="stack">
          {weeks.map((w) => (
            <Card key={w.week} className="pad">
              <div className="rowBetween wrap">
                <div>
                  <div className="muted">שבוע {w.week}</div>
                  <div className="cardTitle" style={{ marginTop: 4 }}>{w.title}</div>
                </div>
                {w.deliverable ? <div className="badge">הגשה: {w.deliverable}</div> : <div />}
              </div>

              <div className="grid2" style={{ marginTop: 14 }}>
                <div>
                  <div className="smallTitle">נושאים</div>
                  <ul className="list">
                    {w.topics.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="smallTitle">תרגול / מעבדה</div>
                  {w.lab ? (
                    <ul className="list">
                      {w.lab.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  ) : (
                    <div className="muted">—</div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Trends() {
  return (
    <div className="page">
      <Section
        title="מגמות עדכניות בתחום"
        subtitle="נושאים עכשוויים שכל מי שנוגע בדאטה צריך להכיר — מהארכיטקטורה ועד האתיקה והעלות."
      >
        <div className="grid2">
          {trends.map((t) => (
            <Card key={t.title} className="pad">
              <div className="rowBetween">
                <div className="cardTitle">{t.title}</div>
                <span className="tag">{t.tag}</span>
              </div>
              <p className="text">{t.desc}</p>
              <ul className="list">
                {t.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="pad" style={{ marginTop: 16 }}>
          <div className="cardTitle">איך משלבים מגמות בפרויקט מסכם?</div>
          <p className="text">
            מתחילים מבעיה עסקית ומדדים → מיפוי מקורות → Pipeline (Batch/Streaming) → אחסון (DW/Lake/Lakehouse) →
            צריכה (Dashboard/Service/GenAI). בסוף מוסיפים Governance, Security, Observability ועלות (FinOps).
          </p>
        </Card>
      </Section>
    </div>
  );
}

function Resources() {
  return (
    <div className="page">
      <Section
        title="משאבים"
        subtitle="סיכומים, תבניות וכלי עבודה — מרוכז במקום אחד. ניתן להחליף לפרטי הקורס בפועל."
      >
        <div className="grid3">
          {resources.map((r) => (
            <Card key={r.title} className="pad">
              <div className="cardTitle">{r.title}</div>
              <p className="text">{r.desc}</p>
              <ul className="list">
                {r.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="pad" style={{ marginTop: 16 }}>
          <div className="cardTitle">טמפלט להגשת תרגיל (תמציתי)</div>
          <ol className="olist">
            <li>בעיה עסקית + KPI</li>
            <li>מקורות נתונים + סכימה</li>
            <li>Pipeline (Batch/Streaming) + תדירות</li>
            <li>אחסון + שיקולי עלות</li>
            <li>Governance: הרשאות, איכות, Lineage</li>
            <li>תוצר: Dashboard / API / GenAI (אם רלוונטי)</li>
          </ol>
        </Card>
      </Section>
    </div>
  );
}

function Assignments() {
  const total = assignments.reduce((s, a) => s + a.weight, 0);

  return (
    <div className="page">
      <Section
        title="מטלות ותרגול"
        subtitle="תרגילים שמפתחים הבנה מעשית. אפשר לשנות משקלים/תאריכים לפי צורך."
      >
        <div className="grid3">
          {assignments.map((a) => (
            <Card key={a.title} className="pad">
              <div className="rowBetween">
                <div className="cardTitle">{a.title}</div>
                <div className="weight">{a.weight}%</div>
              </div>
              <p className="text">{a.desc}</p>
              <ul className="list">
                {a.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="pad" style={{ marginTop: 16 }}>
          <div className="rowBetween wrap">
            <div>
              <div className="cardTitle">קריטריונים מומלצים להערכה</div>
              <div className="muted">דיוק • נימוקים • תרשימים • Governance/אבטחה • התאמה לעסק • מודעות לעלות</div>
            </div>
            <div className="badge">סה״כ משקל: {total}%</div>
          </div>
        </Card>
      </Section>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <Section
        title="אודות הקורס"
        subtitle="קורס מקצועי וידידותי עם דגש על חשיבה מערכתית, הבנת Tradeoffs, ועבודה לפי סטנדרטים של תעשייה."
      >
        <div className="grid2">
          <Card className="pad">
            <div className="cardTitle">למי הקורס מתאים?</div>
            <p className="text">
              לסטודנטים בתחומי מערכות מידע/ניהול/מדעי המחשב/הנדסה שרוצים להבין איך נתונים זורמים בארגון ואיך מקבלים
              החלטות טובות יותר.
            </p>
          </Card>

          <Card className="pad">
            <div className="cardTitle">איך לומדים?</div>
            <p className="text">
              שילוב בין תיאוריה, דוגמאות מהעולם האמיתי ותרגולים קצרים. הדגש הוא על “מתי ולמה לבחור פתרון”, לא רק “איך”.
            </p>
          </Card>

          <Card className="pad" style={{ gridColumn: "1 / -1" }}>
            <div className="cardTitle">סטנדרטים של מקצועיות</div>
            <p className="text">
              תיעוד, תרשימי ארכיטקטורה, מדדי איכות, הרשאות, פרטיות, ניטור ועלות — כחלק בלתי נפרד מהתכנון.
              המטרה: יכולת לתכנן פתרון נתונים מינימלי-מקצועי מקצה לקצה.
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
}

/* ----------------------- Layout ----------------------- */

function Navbar({
  route,
  go,
}: {
  route: RouteKey;
  go: (r: RouteKey) => void;
}) {
  const nav: Array<{ key: RouteKey; label: string }> = [
    { key: "home", label: "דף הבית" },
    { key: "syllabus", label: "סילבוס" },
    { key: "trends", label: "מגמות" },
    { key: "resources", label: "משאבים" },
    { key: "assignments", label: "מטלות" },
    { key: "about", label: "אודות" },
  ];

  return (
    <header className="topbar">
      <div className="container topbarInner">
        <div className="brand" role="button" tabIndex={0} onClick={() => go("home")}>
          <span className="brandIcon"><Icon name="db" /></span>
          <div className="brandText">
            <div className="brandName">מבוא למערכות מידע</div>
            <div className="brandMeta">ניהול נתונים • BI • ארכיטקטורות</div>
          </div>
        </div>

        <nav className="nav">
          {nav.map((n) => (
            <button
              key={n.key}
              className={cx("navLink", route === n.key && "active")}
              onClick={() => go(n.key)}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <a className="contactBtn" href="#contact">
          <Icon name="sparkle" />
          יצירת קשר
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footerGrid">
        <div>
          <div className="footerTitle">צור קשר</div>
          <p className="footerText">
            שאלות על הקורס, דרישות, או פרויקט מסכם? כתבו ונחזור אליכם.
          </p>
          <div className="footerMeta">
            דוא״ל: course@example.com • שעות מענה: א׳-ה׳
          </div>
        </div>

        <div>
          <div className="footerTitle">נושאים מרכזיים</div>
          <ul className="footerList">
            <li>SQL ומידול נתונים</li>
            <li>ETL/ELT ו-Data Pipelines</li>
            <li>Lakehouse ו-Data Mesh</li>
            <li>Streaming בזמן אמת</li>
            <li>Governance, פרטיות ואבטחה</li>
          </ul>
        </div>

        <div>
          <div className="footerTitle">שימוש חינוכי</div>
          <p className="footerText">
            האתר הוא תבנית מקצועית לקורס. אפשר לשנות לוגו, מרצה, קישורים ומשאבים לפי הצורך.
          </p>
          <div className="footerFine">
            © {new Date().getFullYear()} • Intro to MIS & Data Management
          </div>
        </div>
      </div>
    </footer>
  );
}

function GlobalStyles() {
  useEffect(() => {
    const css = `
    :root {
      color-scheme: dark;
      --bg: #07070a;
      --panel: rgba(255,255,255,0.06);
      --panel2: rgba(255,255,255,0.04);
      --stroke: rgba(255,255,255,0.10);
      --text: rgba(255,255,255,0.92);
      --muted: rgba(255,255,255,0.68);
      --muted2: rgba(255,255,255,0.55);
      --shadow: 0 18px 44px rgba(0,0,0,0.35);
      --r: 18px;
      --r2: 22px;
      --max: 1120px;
    }

    * { box-sizing: border-box; }
    html, body, #root { height: 100%; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Arial, sans-serif;
      background: radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.08), transparent 60%),
                  linear-gradient(180deg, #07070a, #0a0a10 60%, #07070a);
      color: var(--text);
    }

    /* subtle grid */
    body:before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
      background-size: 22px 22px;
      opacity: 0.55;
      mix-blend-mode: screen;
    }

    a { color: inherit; text-decoration: none; }
    button { font-family: inherit; }

    .container { max-width: var(--max); margin: 0 auto; padding: 0 18px; }

    /* Topbar */
    .topbar {
      position: sticky;
      top: 0;
      z-index: 50;
      border-bottom: 1px solid var(--stroke);
      background: rgba(7,7,10,0.72);
      backdrop-filter: blur(14px);
    }
    .topbarInner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 12px 0;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }
    .brandIcon {
      width: 38px; height: 38px;
      display: grid; place-items: center;
      border-radius: 14px;
      background: var(--panel);
      border: 1px solid var(--stroke);
      box-shadow: 0 10px 24px rgba(0,0,0,0.22);
    }
    .brandName { font-weight: 700; letter-spacing: -0.2px; }
    .brandMeta { font-size: 12px; color: var(--muted2); margin-top: 2px; }

    .nav {
      display: none;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    @media (min-width: 960px) {
      .nav { display: flex; }
    }
    .navLink {
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      padding: 9px 12px;
      border-radius: 12px;
      font-size: 13px;
      cursor: pointer;
      transition: 180ms ease;
    }
    .navLink:hover {
      background: var(--panel2);
      border-color: var(--stroke);
      color: var(--text);
    }
    .navLink.active {
      background: rgba(255,255,255,0.10);
      border-color: var(--stroke);
      color: var(--text);
    }

    .contactBtn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      border-radius: 14px;
      border: 1px solid var(--stroke);
      background: var(--panel2);
      font-size: 13px;
      color: var(--text);
      transition: 180ms ease;
    }
    .contactBtn:hover { background: rgba(255,255,255,0.10); }

    /* Page */
    .page { padding: 18px 0 44px; }

    /* Hero */
    .hero {
      position: relative;
      margin-top: 10px;
      border-radius: calc(var(--r2) + 10px);
      border: 1px solid var(--stroke);
      background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .glow {
      position: absolute;
      inset: -40px -80px auto -80px;
      height: 220px;
      background: radial-gradient(closest-side, rgba(255,255,255,0.15), transparent 65%);
      filter: blur(16px);
      opacity: 0.8;
    }
    .heroInner { padding: 26px; }
    @media (min-width: 860px) { .heroInner { padding: 34px; } }

    .pillsRow { display: flex; gap: 8px; flex-wrap: wrap; }
    .pill {
      display: inline-flex;
      align-items: center;
      padding: 7px 10px;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.05);
      font-size: 12px;
      color: rgba(255,255,255,0.78);
    }

    .h1 {
      margin: 14px 0 0;
      font-weight: 800;
      letter-spacing: -0.9px;
      line-height: 1.05;
      font-size: 34px;
    }
    @media (min-width: 860px) { .h1 { font-size: 46px; } }

    .heroSub {
      margin: 10px 0 0;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.7;
      max-width: 64ch;
    }

    .heroCtas {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    .btn {
      border: 1px solid var(--stroke);
      border-radius: 16px;
      padding: 10px 14px;
      font-size: 13px;
      cursor: pointer;
      transition: 180ms ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn.primary {
      background: rgba(255,255,255,0.12);
    }
    .btn.primary:hover { background: rgba(255,255,255,0.16); transform: translateY(-1px); }
    .btn.ghost {
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.88);
    }
    .btn.ghost:hover { background: rgba(255,255,255,0.10); transform: translateY(-1px); }
    .btn.subtle {
      background: transparent;
      color: rgba(255,255,255,0.78);
    }
    .btn.subtle:hover { background: rgba(255,255,255,0.06); }
    .btnIcon { display: grid; place-items: center; }

    .heroGrid {
      margin-top: 18px;
      display: grid;
      gap: 12px;
    }
    @media (min-width: 900px) {
      .heroGrid { grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 22px; }
    }

    /* Sections */
    .section { padding: 20px 0; }
    .sectionHead { margin-bottom: 12px; }
    .h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.4px;
    }
    @media (min-width: 860px) { .h2 { font-size: 28px; } }

    .sub {
      margin: 8px 0 0;
      color: var(--muted);
      line-height: 1.7;
      max-width: 78ch;
      font-size: 14px;
    }

    /* Reveal animation */
    .reveal { opacity: 0; transform: translateY(10px); transition: 520ms ease; }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }

    /* Cards */
    .card {
      border-radius: var(--r2);
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.04);
      box-shadow: 0 12px 34px rgba(0,0,0,0.22);
      backdrop-filter: blur(10px);
      transition: 200ms ease;
    }
    .card:hover { background: rgba(255,255,255,0.06); transform: translateY(-1px); }
    .pad { padding: 16px; }

    .cardTop { display: flex; align-items: center; gap: 10px; }
    .iconBox {
      width: 40px; height: 40px;
      display: grid; place-items: center;
      border-radius: 16px;
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.06);
    }

    .cardTitle { font-weight: 800; letter-spacing: -0.25px; }
    .text { margin: 10px 0 0; color: var(--muted); line-height: 1.75; font-size: 14px; }
    .strong { color: rgba(255,255,255,0.90); font-weight: 650; }

    .muted { color: var(--muted2); font-size: 13px; margin-top: 6px; line-height: 1.65; }
    .badge {
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.05);
      padding: 9px 12px;
      border-radius: 999px;
      font-size: 12px;
      color: rgba(255,255,255,0.86);
      white-space: nowrap;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.70);
      font-size: 12px;
    }

    .rowBetween { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .wrap { flex-wrap: wrap; }

    .grid2 { display: grid; gap: 12px; }
    @media (min-width: 900px) { .grid2 { grid-template-columns: repeat(2, 1fr); gap: 14px; } }

    .grid3 { display: grid; gap: 12px; }
    @media (min-width: 980px) { .grid3 { grid-template-columns: repeat(3, 1fr); gap: 14px; } }

    .stack { display: grid; gap: 12px; }

    .smallTitle { font-weight: 800; color: rgba(255,255,255,0.82); font-size: 13px; }

    .list {
      margin: 10px 0 0;
      padding: 0 18px 0 0;
      color: var(--muted);
      line-height: 1.8;
      font-size: 13px;
    }
    .olist {
      margin: 10px 0 0;
      padding: 0 18px 0 0;
      color: var(--muted);
      line-height: 1.8;
      font-size: 13px;
      list-style: decimal;
    }

    .weight {
      padding: 7px 10px;
      border-radius: 12px;
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.05);
      font-size: 12px;
      color: rgba(255,255,255,0.88);
      white-space: nowrap;
    }

    /* Chart */
    .chartWrap { width: 100%; }
    .chart {
      width: 100%;
      height: auto;
      border-radius: var(--r2);
      border: 1px solid var(--stroke);
      background: rgba(0,0,0,0.22);
    }
    .chartGrid { stroke: rgba(255,255,255,0.08); stroke-width: 1; }
    .chartLine { fill: none; stroke: rgba(255,255,255,0.86); stroke-width: 2.4; }
    .chartDot { fill: rgba(255,255,255,0.92); }
    .chartLabel { fill: rgba(255,255,255,0.65); font-size: 14px; }
    .chartNote { margin-top: 10px; color: var(--muted2); font-size: 12px; }

    /* Footer */
    .footer {
      border-top: 1px solid var(--stroke);
      background: rgba(255,255,255,0.02);
      padding: 28px 0 34px;
    }
    .footerGrid {
      display: grid;
      gap: 18px;
    }
    @media (min-width: 900px) { .footerGrid { grid-template-columns: 1.2fr 1fr 1fr; gap: 18px; } }
    .footerTitle { font-weight: 800; letter-spacing: -0.2px; }
    .footerText { margin: 10px 0 0; color: var(--muted); line-height: 1.75; font-size: 13px; }
    .footerMeta { margin-top: 10px; color: var(--muted2); font-size: 12px; }
    .footerList { margin: 10px 0 0; padding: 0 18px 0 0; color: var(--muted); line-height: 1.9; font-size: 13px; }
    .footerFine { margin-top: 12px; color: rgba(255,255,255,0.45); font-size: 12px; }
    `;
    const style = document.createElement("style");
    style.setAttribute("data-singlefile-style", "true");
    style.textContent = css;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return null;
}

function App() {
  const [route, go] = useHashRoute();

  return (
    <>
      <GlobalStyles />
      <Navbar route={route} go={go} />
      <main className="container">
        {route === "home" && <Home go={go} />}
        {route === "syllabus" && <Syllabus />}
        {route === "trends" && <Trends />}
        {route === "resources" && <Resources />}
        {route === "assignments" && <Assignments />}
        {route === "about" && <About />}
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

אם את רוצה “עוד יותר מושקע” ועדיין בקובץ אחד:

* להוסיף **מצב Light/Dark**,
* **חיפוש בסילבוס**,
* **אזור מרצה/סטודנטים**,
* או **טופס צור קשר שעובד** (למשל עם EmailJS / endpoint).
