import { useState } from "react";
import bgImage from "figma:asset/244b4439bc4c54d352331cc2d3f90280da1ec563.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const questions = [
  { id: 1,  question: "When someone is upset, what is wiser?",                          options: ["Pause and think first", "React right away"],                    correct: 0 },
  { id: 2,  question: "A wise person grows by:",                                         options: ["Repeating the same mistakes", "Learning from past mistakes"],    correct: 1 },
  { id: 3,  question: "When someone gives advice, wisdom means:",                        options: ["Ignoring it completely", "Considering it carefully"],            correct: 1 },
  { id: 4,  question: "If a person has hurt someone, the wiser choice is to:",          options: ["Admit their wrong and try to do better", "Avoid responsibility"], correct: 0 },
  { id: 5,  question: "True wisdom is shown when someone chooses:",                      options: ["Humility", "Pride"],                                             correct: 0 },
  { id: 6,  question: "When judging a situation, a wise person should be guided by:",   options: ["Emotion alone", "Fairness and understanding"],                   correct: 1 },
  { id: 7,  question: "A strong leader should care more about:",                         options: ["Personal power", "The good of the people"],                     correct: 1 },
  { id: 8,  question: "In a time of conflict, wisdom is shown through:",                options: ["Calm and careful judgment", "Anger and impulse"],                 correct: 0 },
  { id: 9,  question: "A wise person earns trust by:",                                  options: ["Demanding belief", "Proving themselves through actions"],        correct: 1 },
  { id: 10, question: "Someone is truly worthy of responsibility when they:",            options: ["Choose wisely", "Speak boldly"],                                 correct: 0 },
];

const sceneCards = [
  { label: "Listening to the philosopher", img: "https://images.unsplash.com/photo-1752316226601-4dc12a3c917f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" },
  { label: "Practicing writing", img: "https://images.unsplash.com/photo-1676115388797-5f448ad78e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" },
  { label: "Arriving at school", img: "https://images.unsplash.com/photo-1718103377197-5d43f84a9877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" },
];

// Option icons matching the reference design
const OptionIcon = ({ index, state }: { index: number; state: "default" | "correct" | "wrong" | "dim" }) => {
  const icons = [
    // Triangle
    <svg key="tri" width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 14,13 2,13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
    // Square
    <svg key="sq" width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
    // Circle
    <svg key="ci" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>,
  ];
  const colors: Record<string, string> = {
    default: "#6b563a",
    correct: "#2d6a2d",
    wrong: "#8b2222",
    dim: "#b0a090",
  };
  return <span style={{ color: colors[state] }}>{icons[index % icons.length]}</span>;
};

type GameState = "start" | "playing" | "result";

export function QuizGame() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [animate, setAnimate] = useState(true);

  const question = questions[currentQ];
  const totalQ = questions.length;

  const triggerAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 80);
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    if (idx === question.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      triggerAnimation();
      setTimeout(() => {
        setCurrentQ((q) => q + 1);
        setSelected(answers[currentQ + 1] ?? null);
      }, 180);
    } else {
      setGameState("result");
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      triggerAnimation();
      setTimeout(() => {
        setCurrentQ((q) => q - 1);
        setSelected(answers[currentQ - 1] ?? null);
      }, 180);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setGameState("start");
  };

  const getOptionState = (idx: number): "default" | "correct" | "wrong" | "dim" => {
    if (selected === null) return "default";
    if (idx === question.correct) return "correct";
    if (idx === selected) return "wrong";
    return "dim";
  };

  const getOptionBg = (idx: number) => {
    const state = getOptionState(idx);
    if (state === "correct") return "bg-[#c8e6c0]/80 border-[#4a8a3a]";
    if (state === "wrong") return "bg-[#f0c8c8]/80 border-[#8b3a3a]";
    if (state === "dim") return "opacity-50 border-[#c5b49a]";
    return "hover:bg-[#e8d8b8]/80 border-[#c5b49a] cursor-pointer";
  };

  const getScoreMessage = () => {
    const pct = score / totalQ;
    if (pct === 1) return "Perfect! A true philosopher!";
    if (pct >= 0.8) return "Excellent! The gods are pleased!";
    if (pct >= 0.6) return "Well done, young scholar!";
    if (pct >= 0.4) return "Keep studying the ancient texts!";
    return "Return to the agora and listen more!";
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden" style={{ fontFamily: "'Roboto Slab', serif" }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="background" className="w-full h-full object-cover object-center" />
      </div>

      {/* ── START SCREEN ── */}
      {gameState === "start" && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">

          {/* Laurel + Title Banner */}
          <div className="relative flex flex-col items-center mb-6">
            {/* Laurel wreath SVG */}
            <svg className="absolute -top-3 w-[340px] opacity-90" viewBox="0 0 340 40" fill="none">
              <g fill="#4a6741">
                {/* Left branch */}
                {[0,1,2,3,4,5].map(i => (
                  <ellipse key={`l${i}`} cx={30 + i * 22} cy={20 - Math.sin(i * 0.6) * 8} rx="10" ry="5"
                    transform={`rotate(${-30 + i * 10} ${30 + i * 22} ${20 - Math.sin(i * 0.6) * 8})`} opacity="0.85" />
                ))}
                {/* Right branch */}
                {[0,1,2,3,4,5].map(i => (
                  <ellipse key={`r${i}`} cx={310 - i * 22} cy={20 - Math.sin(i * 0.6) * 8} rx="10" ry="5"
                    transform={`rotate(${30 - i * 10} ${310 - i * 22} ${20 - Math.sin(i * 0.6) * 8})`} opacity="0.85" />
                ))}
              </g>
            </svg>

            {/* Parchment scroll banner */}
            <div
              className="relative px-12 pt-5 pb-4 mt-2"
              style={{
                background: "linear-gradient(180deg, #f0dfa8 0%, #e8cd88 50%, #f0dfa8 100%)",
                borderTop: "3px solid #b8963a",
                borderBottom: "3px solid #b8963a",
                boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,200,0.5)",
                minWidth: 320,
              }}
            >
              {/* Scroll curl left */}
              <div className="absolute left-0 top-0 bottom-0 w-5"
                style={{ background: "linear-gradient(90deg, #c9a94a, #e8cd88)", borderRight: "2px solid #b8963a" }} />
              <div className="absolute right-0 top-0 bottom-0 w-5"
                style={{ background: "linear-gradient(270deg, #c9a94a, #e8cd88)", borderLeft: "2px solid #b8963a" }} />

              <h1 className="text-center relative z-10 tracking-widest"
                style={{
                  fontSize: "clamp(2.4rem, 7vw, 3.8rem)",
                  color: "#5a1a0a",
                  textShadow: "1px 2px 4px rgba(0,0,0,0.25)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}>
                Atherion
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-center mb-8 italic" style={{ color: "#3a2e1a", fontSize: "1.15rem", textShadow: "0 1px 3px rgba(255,255,200,0.8)" }}>
            A story of friendship and wisdom
          </p>

          {/* Begin Button */}
          <button
            onClick={() => setGameState("playing")}
            className="px-8 py-2.5 transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(180deg, #3a6b2a 0%, #2a5020 100%)",
              border: "2px solid #1e3d16",
              borderRadius: "999px",
              color: "#e8f5e0",
              fontSize: "1.1rem",
              letterSpacing: "0.04em",
              boxShadow: "0 3px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            Begin the Journey
          </button>

        </div>
      )}

      {/* ── PLAYING SCREEN ── */}
      {gameState === "playing" && (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3">
            <button onClick={handleRestart}
              className="px-4 py-1.5 text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #f5e8c0 0%, #ead9a0 100%)",
                border: "2px solid #c8a84a",
                color: "#4a3a1a",
                borderRadius: "4px",
                boxShadow: "1px 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              ← Menu
            </button>

            {/* Progress dots */}
            <div className="flex gap-1.5 items-center">
              {questions.map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full border-2 transition-all"
                  style={{
                    borderColor: "#8a7040",
                    backgroundColor:
                      answers[i] !== null
                        ? answers[i] === questions[i].correct ? "#3a6b2a" : "#8b2222"
                        : i === currentQ ? "#c8a84a" : "transparent",
                  }}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={handleBack} disabled={currentQ === 0}
                className="px-4 py-1.5 text-sm transition-all hover:scale-105 disabled:opacity-40"
                style={{
                  background: "linear-gradient(180deg, #f5e8c0 0%, #ead9a0 100%)",
                  border: "2px solid #c8a84a", color: "#4a3a1a", borderRadius: "4px",
                  boxShadow: "1px 2px 6px rgba(0,0,0,0.3)",
                }}
              >‹ Back</button>
              <button onClick={handleNext} disabled={selected === null}
                className="px-4 py-1.5 text-sm transition-all hover:scale-105 disabled:opacity-40"
                style={{
                  background: selected !== null
                    ? "linear-gradient(180deg, #3a6b2a 0%, #2a5020 100%)"
                    : "linear-gradient(180deg, #f5e8c0 0%, #ead9a0 100%)",
                  border: "2px solid #c8a84a",
                  color: selected !== null ? "#e8f5e0" : "#4a3a1a",
                  borderRadius: "4px",
                  boxShadow: "1px 2px 6px rgba(0,0,0,0.3)",
                }}
              >
                {currentQ < totalQ - 1 ? "Next ›" : "Results ›"}
              </button>
            </div>
          </div>

          {/* Main question card */}
          <div
            className="flex-1 flex flex-col items-center justify-center px-4 py-6"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            <div className="w-full max-w-lg flex flex-col gap-4">
              {/* Q counter */}
              <div className="flex items-center gap-3">
                <span className="text-sm px-3 py-0.5"
                  style={{
                    background: "linear-gradient(180deg, #f5e8c0, #ead9a0)",
                    border: "2px solid #c8a84a",
                    color: "#4a3a1a",
                    borderRadius: 4,
                    boxShadow: "1px 2px 4px rgba(0,0,0,0.25)",
                  }}>
                  Question {currentQ + 1} / {totalQ}
                </span>
                <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(200,168,74,0.3)", border: "1px solid #c8a84a" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${((currentQ + 1) / totalQ) * 100}%`, background: "#c8a84a" }} />
                </div>
              </div>

              {/* Question panel */}
              <div
                className="px-6 py-5"
                style={{
                  background: "linear-gradient(160deg, #f5e8c0 0%, #ead198 60%, #f0dfa8 100%)",
                  border: "3px solid #c8a84a",
                  boxShadow: "3px 5px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,200,0.4)",
                  borderRadius: "2px",
                }}
              >
                <p style={{ fontSize: "1.2rem", color: "#2e2010", lineHeight: 1.5 }}>{question.question}</p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {question.options.map((opt, idx) => {
                  const state = getOptionState(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`flex items-center gap-3 px-4 py-3 text-left transition-all border-2 ${getOptionBg(idx)}`}
                      style={{
                        background: state === "default"
                          ? "linear-gradient(160deg, #f5e8c0 0%, #ead9a0 100%)"
                          : state === "correct"
                          ? "linear-gradient(160deg, #d4edcc 0%, #b8ddb0 100%)"
                          : state === "wrong"
                          ? "linear-gradient(160deg, #f0d0d0 0%, #e0b0b0 100%)"
                          : "linear-gradient(160deg, #f0e8d0 0%, #e4dac0 100%)",
                        borderRadius: "2px",
                        boxShadow: "1px 3px 8px rgba(0,0,0,0.22)",
                        borderColor:
                          state === "correct" ? "#4a8a3a"
                          : state === "wrong" ? "#8b3a3a"
                          : "#c5b49a",
                      }}
                    >
                      <OptionIcon index={idx} state={state} />
                      <span style={{ fontSize: "1rem", color: state === "dim" ? "#9a8a6a" : "#2e2010" }}>{opt}</span>
                      {state === "correct" && <span className="ml-auto" style={{ color: "#2d6a2d" }}>✓</span>}
                      {state === "wrong" && <span className="ml-auto" style={{ color: "#8b2222" }}>✗</span>}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {selected !== null && (
                <div
                  className="px-4 py-2.5 text-sm"
                  style={{
                    background: selected === question.correct
                      ? "linear-gradient(160deg, #d4edcc, #b8ddb0)"
                      : "linear-gradient(160deg, #f0d0d0, #e0b0b0)",
                    border: `2px solid ${selected === question.correct ? "#4a8a3a" : "#8b3a3a"}`,
                    color: selected === question.correct ? "#1e4a1e" : "#5a1a1a",
                    borderRadius: "2px",
                    boxShadow: "1px 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  {selected === question.correct
                    ? "✓ Well answered, scholar! The gods smile upon you."
                    : `✗ The correct answer was: ${question.options[question.correct]}`}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULT SCREEN ── */}
      {gameState === "result" && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10 min-h-screen">
          <div
            className="w-full max-w-lg flex flex-col gap-5 px-8 py-8"
            style={{
              background: "linear-gradient(160deg, #f5e8c0 0%, #ead9a0 60%, #f0dfa8 100%)",
              border: "3px solid #c8a84a",
              boxShadow: "4px 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,200,0.4)",
              borderRadius: "2px",
            }}
          >
            {/* Title */}
            <div className="text-center">
              <h2 style={{ fontSize: "2rem", color: "#5a1a0a", letterSpacing: "0.1em" }}>Quest Complete!</h2>
              <p style={{ color: "#6a5030", fontSize: "1rem", marginTop: 4 }}>{getScoreMessage()}</p>
            </div>

            {/* Score */}
            <div className="text-center py-3" style={{ border: "2px dashed #c8a84a" }}>
              <span style={{ fontSize: "3.5rem", color: "#2e2010", fontWeight: 700 }}>{score}</span>
              <span style={{ fontSize: "1.8rem", color: "#8a7040" }}> / {totalQ}</span>
              <div style={{ color: "#6a5030", fontSize: "0.9rem", marginTop: 2 }}>
                {Math.round((score / totalQ) * 100)}% correct
              </div>
            </div>

            {/* Score bar */}
            <div className="w-full h-3 rounded-full" style={{ background: "rgba(200,168,74,0.3)", border: "2px solid #c8a84a" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${(score / totalQ) * 100}%`, background: "linear-gradient(90deg, #3a6b2a, #4a8a3a)" }} />
            </div>

            {/* Review */}
            <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1">
              {questions.map((q, i) => (
                <div key={q.id} className="flex items-start gap-2 px-3 py-1.5 text-sm"
                  style={{
                    border: `2px solid ${answers[i] === q.correct ? "#4a8a3a" : "#c8a84a"}`,
                    background: answers[i] === q.correct ? "rgba(180,220,160,0.4)" : "rgba(245,232,192,0.6)",
                    borderRadius: "2px",
                  }}
                >
                  <span style={{ color: answers[i] === q.correct ? "#2d6a2d" : "#8b2222" }}>
                    {answers[i] === q.correct ? "✓" : "✗"}
                  </span>
                  <span style={{ color: "#2e2010" }} className="flex-1 leading-snug">{q.question}</span>
                </div>
              ))}
            </div>

            {/* Prize Code */}
            <div
              className="flex flex-col items-center gap-2 py-4 px-4"
              style={{
                background: "linear-gradient(160deg, #fdf3d0 0%, #f5e090 100%)",
                border: "3px solid #c8a84a",
                boxShadow: "inset 0 1px 0 rgba(255,255,200,0.5), 2px 3px 10px rgba(0,0,0,0.2)",
                borderRadius: "2px",
                position: "relative",
              }}
            >
              {/* Decorative top seal */}
              <div className="flex items-center gap-2 mb-1">
                <svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,1 11,7 17,7 12,11 14,17 9,13 4,17 6,11 1,7 7,7" fill="#c8a84a" opacity="0.9"/></svg>
                <span style={{ color: "#5a3a0a", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Your Prize Code</span>
                <svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,1 11,7 17,7 12,11 14,17 9,13 4,17 6,11 1,7 7,7" fill="#c8a84a" opacity="0.9"/></svg>
              </div>
              <div
                style={{
                  fontSize: "2.2rem",
                  letterSpacing: "0.35em",
                  color: "#3a1a00",
                  fontWeight: 700,
                  textShadow: "1px 1px 0 rgba(200,168,74,0.5)",
                  background: "rgba(255,255,255,0.5)",
                  border: "2px dashed #c8a84a",
                  padding: "6px 24px",
                  borderRadius: "2px",
                  userSelect: "all",
                }}
              >
                WISE·2025
              </div>
              <p style={{ color: "#6a4a1a", fontSize: "0.78rem", marginTop: 2, textAlign: "center", letterSpacing: "0.05em" }}>
                Present this code to your teacher to claim your reward
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={handleRestart}
                className="py-3 px-5 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(180deg, #f5e8c0 0%, #ead9a0 100%)",
                  border: "2px solid #c8a84a",
                  borderRadius: "999px",
                  color: "#4a3a1a",
                  fontSize: "1rem",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                }}
              >
                Play Again
              </button>
              <button
                className="flex-1 py-3 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(180deg, #3a6b2a 0%, #2a5020 100%)",
                  border: "2px solid #1e3d16",
                  borderRadius: "999px",
                  color: "#e8f5e0",
                  fontSize: "1rem",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.35)",
                }}
              >
                Move On →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}