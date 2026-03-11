import bgImage from "figma:asset/244b4439bc4c54d352331cc2d3f90280da1ec563.png";

const colors = [
  { name: "Parchment Light",   hex: "#F5E8C0", usage: "Card backgrounds, option buttons" },
  { name: "Parchment Mid",     hex: "#EAD9A0", usage: "Gradient base, scroll body" },
  { name: "Parchment Dark",    hex: "#E8CD88", usage: "Banner background, deep parchment" },
  { name: "Gold Border",       hex: "#C8A84A", usage: "All borders, progress bar, dots" },
  { name: "Gold Deep",         hex: "#B8963A", usage: "Scroll curl edge, secondary border" },
  { name: "Ink Brown",         hex: "#2E2010", usage: "Body text, question text" },
  { name: "Dark Brown",        hex: "#4A3A1A", usage: "Labels, nav buttons, captions" },
  { name: "Earth Brown",       hex: "#6A5030", usage: "Subtitles, score labels" },
  { name: "Crimson Title",     hex: "#5A1A0A", usage: "Main headings (Quest Complete, etc.)" },
  { name: "Forest Green",      hex: "#3A6B2A", usage: "Primary CTA button top, correct state" },
  { name: "Deep Green",        hex: "#2A5020", usage: "Primary CTA button bottom gradient" },
  { name: "Correct Green",     hex: "#4A8A3A", usage: "Correct answer border" },
  { name: "Correct BG",        hex: "#D4EDCC", usage: "Correct answer background" },
  { name: "Wrong Red",         hex: "#8B2222", usage: "Wrong answer border, ✗ icon" },
  { name: "Wrong BG",          hex: "#F0D0D0", usage: "Wrong answer background" },
  { name: "Leaf Green",        hex: "#4A6741", usage: "Laurel wreath leaves" },
  { name: "Prize Gold",        hex: "#FDF3D0", usage: "Prize code banner background" },
];

const typeScale = [
  { name: "Display",    size: "3.8rem",  weight: "700", usage: "Game title — Atherion",          sample: "Atherion" },
  { name: "Heading 1",  size: "2rem",    weight: "700", usage: "Result screen title",              sample: "Quest Complete!" },
  { name: "Heading 2",  size: "1.8rem",  weight: "400", usage: "Score display numerals",          sample: "8 / 10" },
  { name: "Body Large", size: "1.2rem",  weight: "400", usage: "Question text",                   sample: "When someone is upset, what is wiser?" },
  { name: "Body",       size: "1rem",    weight: "400", usage: "Answer options, body copy",       sample: "Pause and think first" },
  { name: "Caption",    size: "0.85rem", weight: "400", usage: "Nav labels, scene card labels",   sample: "Listening to the philosopher" },
  { name: "Micro",      size: "0.78rem", weight: "400", usage: "Prize note, badge labels",        sample: "Present this code to your teacher" },
];

const OptionIcon = ({ index }: { index: number }) => {
  const icons = [
    <svg key="tri" width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 14,13 2,13" fill="none" stroke="#6b563a" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
    <svg key="sq"  width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" fill="none" stroke="#6b563a" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
  ];
  return <span>{icons[index % icons.length]}</span>;
};

const parchmentCard = {
  background: "linear-gradient(160deg, #f5e8c0 0%, #ead9a0 100%)",
  border: "3px solid #c8a84a",
  boxShadow: "3px 5px 18px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,200,0.4)",
  borderRadius: "2px",
};

const btnPrimary = {
  background: "linear-gradient(180deg, #3a6b2a 0%, #2a5020 100%)",
  border: "2px solid #1e3d16",
  borderRadius: "999px",
  color: "#e8f5e0",
  boxShadow: "0 3px 10px rgba(0,0,0,0.35)",
};

const btnSecondary = {
  background: "linear-gradient(180deg, #f5e8c0 0%, #ead9a0 100%)",
  border: "2px solid #c8a84a",
  borderRadius: "999px",
  color: "#4a3a1a",
  boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
};

const btnNav = {
  background: "linear-gradient(180deg, #f5e8c0 0%, #ead9a0 100%)",
  border: "2px solid #c8a84a",
  color: "#4a3a1a",
  borderRadius: "4px",
  boxShadow: "1px 2px 6px rgba(0,0,0,0.3)",
};

export function StyleGuide() {
  return (
    <div className="relative min-h-screen" style={{ fontFamily: "'Roboto Slab', serif" }}>
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src={bgImage} alt="bg" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "rgba(20,10,0,0.45)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="px-10 py-4" style={{ background: "linear-gradient(180deg, #f0dfa8 0%, #e8cd88 50%, #f0dfa8 100%)", borderTop: "3px solid #b8963a", borderBottom: "3px solid #b8963a", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            <h1 style={{ fontSize: "2.4rem", color: "#5a1a0a", letterSpacing: "0.12em", fontWeight: 700 }}>
              Atherion · Style Guide
            </h1>
          </div>
          <p style={{ color: "#e8d8b8", fontSize: "1rem", marginTop: 8 }}>Design language for the Atherion wisdom quiz game</p>
        </div>

        {/* ── COLOUR PALETTE ── */}
        <Section title="Colour Palette">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {colors.map((c) => (
              <div key={c.hex} className="flex items-stretch overflow-hidden" style={{ border: "2px solid #c8a84a", background: "#f5e8c0", boxShadow: "1px 2px 8px rgba(0,0,0,0.25)" }}>
                <div className="w-14 shrink-0" style={{ backgroundColor: c.hex }} />
                <div className="px-3 py-2 flex flex-col justify-center gap-0.5">
                  <span style={{ fontSize: "0.8rem", color: "#2e2010", fontWeight: 700 }}>{c.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "#6a5030", letterSpacing: "0.08em" }}>{c.hex}</span>
                  <span style={{ fontSize: "0.68rem", color: "#8a7040" }}>{c.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── TYPOGRAPHY ── */}
        <Section title="Typography — Roboto Slab">
          <div className="flex flex-col gap-3" style={{ ...parchmentCard, padding: "20px 24px" }}>
            {typeScale.map((t) => (
              <div key={t.name} className="flex flex-col gap-0.5 pb-3" style={{ borderBottom: "1px dashed #c8a84a" }}>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span style={{ fontSize: t.size, fontWeight: parseInt(t.weight), color: "#2e2010", lineHeight: 1.2 }}>{t.sample}</span>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <Badge>{t.name}</Badge>
                  <Badge>{t.size}</Badge>
                  <Badge>weight {t.weight}</Badge>
                  <span style={{ fontSize: "0.72rem", color: "#8a7040" }}>{t.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── BUTTONS ── */}
        <Section title="Buttons">
          <div style={{ ...parchmentCard, padding: "24px" }} className="flex flex-col gap-6">
            <Row label="Primary CTA">
              <button style={{ ...btnPrimary, padding: "10px 32px", fontSize: "1rem" }} className="transition-all hover:scale-105">Begin the Journey</button>
              <button style={{ ...btnPrimary, padding: "10px 32px", fontSize: "1rem" }} className="transition-all hover:scale-105">Move On →</button>
            </Row>
            <Row label="Secondary">
              <button style={{ ...btnSecondary, padding: "10px 20px", fontSize: "1rem" }} className="transition-all hover:scale-105">Play Again</button>
            </Row>
            <Row label="Navigation (pill-less)">
              <button style={{ ...btnNav, padding: "6px 16px", fontSize: "0.9rem" }} className="transition-all hover:scale-105">← Menu</button>
              <button style={{ ...btnNav, padding: "6px 16px", fontSize: "0.9rem" }} className="transition-all hover:scale-105">‹ Back</button>
              <button style={{ ...{ ...btnNav, background: "linear-gradient(180deg, #3a6b2a, #2a5020)", color: "#e8f5e0" }, padding: "6px 16px", fontSize: "0.9rem" }} className="transition-all hover:scale-105">Next ›</button>
            </Row>
            <Row label="Disabled state">
              <button style={{ ...btnNav, padding: "6px 16px", fontSize: "0.9rem", opacity: 0.4 }} disabled>‹ Back</button>
              <button style={{ ...btnNav, padding: "6px 16px", fontSize: "0.9rem", opacity: 0.4 }} disabled>Next ›</button>
            </Row>
          </div>
        </Section>

        {/* ── ANSWER OPTIONS ── */}
        <Section title="Answer Options">
          <div style={{ ...parchmentCard, padding: "20px 24px" }} className="flex flex-col gap-3">
            {/* Default */}
            <AnswerOption index={0} state="default" text="Pause and think first" label="Default" />
            {/* Correct */}
            <AnswerOption index={1} state="correct" text="Learning from past mistakes" label="Correct" />
            {/* Wrong */}
            <AnswerOption index={0} state="wrong" text="React right away" label="Wrong" />
            {/* Dimmed */}
            <AnswerOption index={1} state="dim" text="Repeating the same mistakes" label="Dimmed" />
          </div>
        </Section>

        {/* ── PROGRESS DOTS ── */}
        <Section title="Progress Indicators">
          <div style={{ ...parchmentCard, padding: "20px 24px" }} className="flex flex-col gap-5">
            <Row label="Progress Dots">
              <div className="flex gap-2 items-center">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: "#8a7040",
                      backgroundColor: i < 4 ? "#3a6b2a" : i === 4 ? "#c8a84a" : i === 5 ? "#8b2222" : "transparent",
                    }} />
                ))}
              </div>
            </Row>
            <Row label="Progress Bar">
              <div className="flex-1 h-2.5 rounded-full" style={{ background: "rgba(200,168,74,0.3)", border: "1px solid #c8a84a" }}>
                <div className="h-full rounded-full" style={{ width: "60%", background: "#c8a84a" }} />
              </div>
            </Row>
            <Row label="Question Counter">
              <span className="px-3 py-0.5 text-sm" style={{ background: "linear-gradient(180deg, #f5e8c0, #ead9a0)", border: "2px solid #c8a84a", color: "#4a3a1a", borderRadius: 4, boxShadow: "1px 2px 4px rgba(0,0,0,0.2)" }}>Question 6 / 10</span>
            </Row>
          </div>
        </Section>

        {/* ── FEEDBACK BANNERS ── */}
        <Section title="Feedback Banners">
          <div className="flex flex-col gap-3">
            <div className="px-4 py-3 text-sm" style={{ background: "linear-gradient(160deg, #d4edcc, #b8ddb0)", border: "2px solid #4a8a3a", color: "#1e4a1e", borderRadius: "2px", boxShadow: "1px 2px 6px rgba(0,0,0,0.2)" }}>
              ✓ Well answered, scholar! The gods smile upon you.
            </div>
            <div className="px-4 py-3 text-sm" style={{ background: "linear-gradient(160deg, #f0d0d0, #e0b0b0)", border: "2px solid #8b3a3a", color: "#5a1a1a", borderRadius: "2px", boxShadow: "1px 2px 6px rgba(0,0,0,0.2)" }}>
              ✗ The correct answer was: Pause and think first
            </div>
          </div>
        </Section>

        {/* ── PRIZE CODE ── */}
        <Section title="Prize Code Panel">
          <div className="flex flex-col items-center gap-2 py-5 px-6" style={{ background: "linear-gradient(160deg, #fdf3d0 0%, #f5e090 100%)", border: "3px solid #c8a84a", boxShadow: "inset 0 1px 0 rgba(255,255,200,0.5), 2px 3px 10px rgba(0,0,0,0.2)", borderRadius: "2px" }}>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,1 11,7 17,7 12,11 14,17 9,13 4,17 6,11 1,7 7,7" fill="#c8a84a" opacity="0.9"/></svg>
              <span style={{ color: "#5a3a0a", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Your Prize Code</span>
              <svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,1 11,7 17,7 12,11 14,17 9,13 4,17 6,11 1,7 7,7" fill="#c8a84a" opacity="0.9"/></svg>
            </div>
            <div style={{ fontSize: "2.2rem", letterSpacing: "0.35em", color: "#3a1a00", fontWeight: 700, textShadow: "1px 1px 0 rgba(200,168,74,0.5)", background: "rgba(255,255,255,0.5)", border: "2px dashed #c8a84a", padding: "6px 24px", borderRadius: "2px" }}>
              WISE·2025
            </div>
            <p style={{ color: "#6a4a1a", fontSize: "0.78rem", textAlign: "center", letterSpacing: "0.05em" }}>Present this code to your teacher to claim your reward</p>
          </div>
        </Section>

        {/* ── PARCHMENT CARDS ── */}
        <Section title="Card Surfaces">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p style={{ color: "#e8d8b8", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Question Panel</p>
              <div className="px-6 py-5" style={parchmentCard}>
                <p style={{ fontSize: "1.2rem", color: "#2e2010", lineHeight: 1.5 }}>When someone is upset, what is wiser?</p>
              </div>
            </div>
            <div>
              <p style={{ color: "#e8d8b8", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Scene Card</p>
              <div className="overflow-hidden" style={{ background: "linear-gradient(180deg, #f5e8c0 0%, #ead9a0 100%)", border: "3px solid #c8a84a", boxShadow: "2px 4px 14px rgba(0,0,0,0.35)" }}>
                <div style={{ height: 100, background: "linear-gradient(180deg, #c8a84a33, #c8a84a88)" }} className="flex items-center justify-center">
                  <span style={{ color: "#6a5030", fontSize: "0.85rem" }}>190 × 130 px image</span>
                </div>
                <div className="px-2 py-1.5 text-center" style={{ borderTop: "2px solid #c8a84a" }}>
                  <span style={{ fontSize: "0.82rem", color: "#4a3a1a" }}>Listening to the philosopher</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── SCROLL BANNER ── */}
        <Section title="Scroll Banner — Title Treatment">
          <div className="flex flex-col items-center">
            <div className="relative px-12 pt-5 pb-4" style={{ background: "linear-gradient(180deg, #f0dfa8 0%, #e8cd88 50%, #f0dfa8 100%)", borderTop: "3px solid #b8963a", borderBottom: "3px solid #b8963a", boxShadow: "0 4px 24px rgba(0,0,0,0.35)", minWidth: 320 }}>
              <div className="absolute left-0 top-0 bottom-0 w-5" style={{ background: "linear-gradient(90deg, #c9a94a, #e8cd88)", borderRight: "2px solid #b8963a" }} />
              <div className="absolute right-0 top-0 bottom-0 w-5" style={{ background: "linear-gradient(270deg, #c9a94a, #e8cd88)", borderLeft: "2px solid #b8963a" }} />
              <h1 className="text-center relative z-10" style={{ fontSize: "3.2rem", color: "#5a1a0a", textShadow: "1px 2px 4px rgba(0,0,0,0.25)", fontWeight: 700, letterSpacing: "0.12em" }}>
                Atherion
              </h1>
            </div>
          </div>
        </Section>

        {/* ── SPACING & BORDERS ── */}
        <Section title="Spacing & Borders">
          <div style={{ ...parchmentCard, padding: "20px 24px" }} className="flex flex-col gap-4">
            <Row label="Border radius">
              <div className="flex gap-3 items-center flex-wrap">
                <Chip label="Cards & Panels" value="2px" />
                <Chip label="Nav Buttons" value="4px" />
                <Chip label="CTA Buttons" value="999px (pill)" />
              </div>
            </Row>
            <Row label="Border width">
              <div className="flex gap-3 flex-wrap">
                <Chip label="Cards" value="3px solid" />
                <Chip label="Buttons" value="2px solid" />
                <Chip label="Progress bar" value="1px solid" />
                <Chip label="Prize code" value="2px dashed" />
              </div>
            </Row>
            <Row label="Gap scale">
              <div className="flex gap-3 flex-wrap">
                <Chip label="Tight (icons, dots)" value="6–8px" />
                <Chip label="Default (items)" value="10–16px" />
                <Chip label="Sections" value="20–24px" />
              </div>
            </Row>
          </div>
        </Section>

        {/* Footer */}
        <div className="text-center pb-4" style={{ color: "#c8a84a", fontSize: "0.8rem", letterSpacing: "0.15em" }}>
          ATHERION · STYLE GUIDE · 2025
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span style={{ color: "#c8a84a", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{title}</span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #c8a84a, transparent)" }} />
      </div>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span style={{ fontSize: "0.72rem", color: "#8a7040", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
      <div className="flex gap-3 flex-wrap items-center">{children}</div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: "0.68rem", color: "#6a5030", background: "rgba(200,168,74,0.2)", border: "1px solid #c8a84a", borderRadius: 3, padding: "1px 6px" }}>
      {children}
    </span>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "rgba(200,168,74,0.15)", border: "1px solid #c8a84a", borderRadius: 3, padding: "4px 10px" }}>
      <div style={{ fontSize: "0.68rem", color: "#8a7040" }}>{label}</div>
      <div style={{ fontSize: "0.82rem", color: "#2e2010", fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function AnswerOption({ index, state, text, label }: { index: number; state: string; text: string; label: string }) {
  const bg: Record<string, string> = {
    default: "linear-gradient(160deg, #f5e8c0 0%, #ead9a0 100%)",
    correct: "linear-gradient(160deg, #d4edcc 0%, #b8ddb0 100%)",
    wrong:   "linear-gradient(160deg, #f0d0d0 0%, #e0b0b0 100%)",
    dim:     "linear-gradient(160deg, #f0e8d0 0%, #e4dac0 100%)",
  };
  const border: Record<string, string> = {
    default: "#c5b49a",
    correct: "#4a8a3a",
    wrong:   "#8b3a3a",
    dim:     "#c5b49a",
  };
  return (
    <div className="flex items-center gap-3">
      <span style={{ fontSize: "0.68rem", color: "#8a7040", width: 54, textAlign: "right", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      <div
        className="flex items-center gap-3 px-4 py-2.5 flex-1"
        style={{ background: bg[state], border: `2px solid ${border[state]}`, borderRadius: "2px", boxShadow: "1px 2px 6px rgba(0,0,0,0.18)", opacity: state === "dim" ? 0.5 : 1 }}
      >
        <OptionIcon index={index} />
        <span style={{ fontSize: "1rem", color: "#2e2010" }}>{text}</span>
        {state === "correct" && <span className="ml-auto" style={{ color: "#2d6a2d" }}>✓</span>}
        {state === "wrong"   && <span className="ml-auto" style={{ color: "#8b2222" }}>✗</span>}
      </div>
    </div>
  );
}
