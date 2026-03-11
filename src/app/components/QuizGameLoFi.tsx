import { useState } from "react";
import bgImage from "figma:asset/244b4439bc4c54d352331cc2d3f90280da1ec563.png";

const questions = [
  { id: 1,  question: "When someone is upset, what is wiser?",                         options: ["Pause and think first", "React right away"],                    correct: 0 },
  { id: 2,  question: "A wise person grows by:",                                        options: ["Repeating the same mistakes", "Learning from past mistakes"],    correct: 1 },
  { id: 3,  question: "When someone gives advice, wisdom means:",                       options: ["Ignoring it completely", "Considering it carefully"],            correct: 1 },
  { id: 4,  question: "If a person has hurt someone, the wiser choice is to:",         options: ["Admit their wrong and try to do better", "Avoid responsibility"], correct: 0 },
  { id: 5,  question: "True wisdom is shown when someone chooses:",                     options: ["Humility", "Pride"],                                             correct: 0 },
  { id: 6,  question: "When judging a situation, a wise person should be guided by:",  options: ["Emotion alone", "Fairness and understanding"],                   correct: 1 },
  { id: 7,  question: "A strong leader should care more about:",                        options: ["Personal power", "The good of the people"],                     correct: 1 },
  { id: 8,  question: "In a time of conflict, wisdom is shown through:",               options: ["Calm and careful judgment", "Anger and impulse"],                 correct: 0 },
  { id: 9,  question: "A wise person earns trust by:",                                 options: ["Demanding belief", "Proving themselves through actions"],        correct: 1 },
  { id: 10, question: "Someone is truly worthy of responsibility when they:",           options: ["Choose wisely", "Speak boldly"],                                 correct: 0 },
];

type GameState = "start" | "playing" | "result";

// Rough SVG border filter for sketch feel
const SketchBox = ({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`relative border-2 border-gray-800 bg-white ${className}`}
    style={{
      borderRadius: "2px",
      boxShadow: "2px 2px 0 #888, 3px 3px 0 #bbb",
      ...style,
    }}
  >
    {children}
  </div>
);

const WireframeImg = ({ label = "Image", aspect = "aspect-video" }: { label?: string; aspect?: string }) => (
  <div className={`w-full ${aspect} bg-gray-100 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center gap-1`}>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="2" y="2" width="32" height="32" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 2" />
      <line x1="2" y1="2" x2="34" y2="34" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="34" y1="2" x2="2" y2="34" stroke="#9ca3af" strokeWidth="1.5" />
    </svg>
    <span className="text-gray-400 text-xs tracking-wider uppercase">{label}</span>
  </div>
);

export function QuizGameLoFi() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const question = questions[currentQ];
  const totalQ = questions.length;

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
      setCurrentQ((q) => q + 1);
      setSelected(answers[currentQ + 1] ?? null);
    } else {
      setGameState("result");
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      setSelected(answers[currentQ - 1] ?? null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setGameState("start");
  };

  const optionLabel = ["A", "B", "C"];

  const getOptionStyle = (idx: number) => {
    if (selected === null) return "border-gray-700 bg-white hover:bg-gray-50 cursor-pointer";
    if (idx === question.correct) return "border-gray-800 bg-gray-200";
    if (idx === selected && idx !== question.correct) return "border-gray-400 bg-gray-100";
    return "border-gray-300 bg-white opacity-50";
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col relative"
      style={{ fontFamily: "'Roboto Slab', serif" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="background" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* All content sits above background */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Header bar */}
        <div className="border-b-2 border-gray-800 bg-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-600 bg-gray-200" />
            <div className="w-4 h-4 rounded-full border-2 border-gray-600 bg-gray-200" />
            <div className="w-4 h-4 rounded-full border-2 border-gray-600 bg-gray-200" />
          </div>
          <span className="text-gray-500 text-lg tracking-widest uppercase">quiz app — lo-fi</span>
          <div className="w-24 h-3 bg-gray-200 border border-gray-400 rounded" />
        </div>

        {/* START */}
        {gameState === "start" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-10">
            <SketchBox className="w-full max-w-md p-6 flex flex-col gap-4">
              {/* Logo placeholder */}
              <WireframeImg label="logo / hero" aspect="aspect-[3/1]" />

              <div>
                <div className="h-5 bg-gray-200 border border-gray-300 w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 border border-gray-300 w-full mb-1" />
                <div className="h-3 bg-gray-100 border border-gray-300 w-5/6" />
              </div>

              <div className="text-center text-xl text-gray-700 border-t border-dashed border-gray-300 pt-3">
                10 questions · 3 options each
              </div>

              <button
                onClick={() => setGameState("playing")}
                className="w-full border-2 border-gray-800 bg-gray-800 text-white py-3 text-2xl hover:bg-gray-700 transition-colors"
              >
                [ Start Quiz ]
              </button>
            </SketchBox>

            {/* Annotation */}
            <div className="flex items-start gap-2 max-w-md w-full">
              <svg width="40" height="20" viewBox="0 0 40 20">
                <path d="M0,10 Q20,0 38,10" stroke="#9ca3af" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
              </svg>
              <span className="text-gray-400 text-lg italic">CTA button here</span>
            </div>
          </div>
        )}

        {/* PLAYING */}
        {gameState === "playing" && (
          <div className="flex-1 flex flex-col">
            {/* Top bar */}
            <div className="border-b border-gray-300 bg-white px-4 py-2 flex items-center justify-between">
              <button
                onClick={handleRestart}
                className="border border-gray-400 text-gray-600 px-3 py-1 text-lg hover:bg-gray-100"
              >
                ← menu
              </button>

              {/* progress */}
              <div className="flex gap-1.5 items-center">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 border border-gray-600 transition-all"
                    style={{
                      backgroundColor:
                        answers[i] !== null
                          ? answers[i] === questions[i].correct
                            ? "#374151"
                            : "#d1d5db"
                          : i === currentQ
                          ? "#9ca3af"
                          : "transparent",
                    }}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleBack}
                  disabled={currentQ === 0}
                  className="border border-gray-400 text-gray-600 px-3 py-1 text-lg hover:bg-gray-100 disabled:opacity-30"
                >
                  ‹ back
                </button>
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className="border border-gray-800 bg-gray-800 text-white px-3 py-1 text-lg hover:bg-gray-700 disabled:opacity-30 disabled:bg-white disabled:text-gray-400 disabled:border-gray-400"
                >
                  next ›
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-0">
              {/* Left: image panel */}
              <div className="hidden md:flex w-64 border-r-2 border-gray-300 bg-white flex-col gap-3 p-4">
                <WireframeImg label="illustration" aspect="aspect-square" />
                <div className="h-3 bg-gray-100 border border-gray-200 w-full" />
                <div className="h-3 bg-gray-100 border border-gray-200 w-4/5" />
                <div className="h-3 bg-gray-100 border border-gray-200 w-3/5" />
                <div className="mt-auto border border-dashed border-gray-300 p-3 text-gray-400 text-base text-center">
                  hint / tooltip area
                </div>
              </div>

              {/* Right: question + options */}
              <div className="flex-1 flex flex-col gap-4 p-5">
                {/* Q counter */}
                <div className="flex items-center gap-2">
                  <span className="border border-gray-400 px-2 py-0.5 text-lg text-gray-500 bg-white">
                    Q{currentQ + 1}/{totalQ}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 border border-gray-300">
                    <div
                      className="h-full bg-gray-600 transition-all"
                      style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-lg">{Math.round(((currentQ + 1) / totalQ) * 100)}%</span>
                </div>

                {/* Question box */}
                <SketchBox className="p-5">
                  <p className="text-2xl text-gray-800 leading-snug">{question.question}</p>
                </SketchBox>

                {/* Options */}
                <div className="flex flex-col gap-3">
                  {question.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`flex items-center gap-3 border-2 px-4 py-3 text-xl text-left transition-all ${getOptionStyle(idx)}`}
                      style={{ boxShadow: "1px 1px 0 #ccc" }}
                    >
                      <span className="w-7 h-7 flex items-center justify-center border border-gray-500 text-gray-600 flex-shrink-0 text-base">
                        {optionLabel[idx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {selected !== null && idx === question.correct && (
                        <span className="text-gray-700 text-lg">✓</span>
                      )}
                      {selected === idx && idx !== question.correct && (
                        <span className="text-gray-400 text-lg">✗</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {selected !== null && (
                  <div
                    className={`border-2 border-dashed px-4 py-2 text-lg ${
                      selected === question.correct
                        ? "border-gray-700 text-gray-700 bg-gray-100"
                        : "border-gray-400 text-gray-500 bg-gray-50"
                    }`}
                  >
                    {selected === question.correct
                      ? "✓ Correct!"
                      : `✗ Answer: ${question.options[question.correct]}`}
                  </div>
                )}

                {/* Annotation strip */}
                <div className="border border-dashed border-gray-300 px-3 py-2 text-gray-400 text-base flex gap-6">
                  <span>[ timer widget ]</span>
                  <span>[ streak counter ]</span>
                  <span>[ score badge ]</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {gameState === "result" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-10">
            <SketchBox className="w-full max-w-lg p-6 flex flex-col gap-4">
              <WireframeImg label="trophy / result art" aspect="aspect-[4/1]" />

              <div className="text-3xl text-gray-800 text-center">Results Screen</div>

              {/* Score display */}
              <div className="border-2 border-dashed border-gray-400 p-4 text-center">
                <div className="text-5xl text-gray-800">{score} / {totalQ}</div>
                <div className="text-xl text-gray-500 mt-1">
                  {Math.round((score / totalQ) * 100)}% correct
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full h-4 bg-gray-200 border border-gray-400">
                <div
                  className="h-full bg-gray-700 transition-all"
                  style={{ width: `${(score / totalQ) * 100}%` }}
                />
              </div>

              {/* Review list */}
              <div className="flex flex-col gap-1 max-h-52 overflow-y-auto pr-1">
                {questions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`flex gap-2 items-start text-base border px-3 py-1.5 ${
                      answers[i] === q.correct
                        ? "border-gray-600 bg-gray-100"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <span className="text-gray-500 flex-shrink-0">{answers[i] === q.correct ? "✓" : "✗"}</span>
                    <span className="text-gray-700 truncate">{q.question}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 border-2 border-gray-800 bg-gray-800 text-white py-3 text-xl hover:bg-gray-700 transition-colors"
                >
                  [ Play Again ]
                </button>
                <button className="border-2 border-gray-400 text-gray-500 px-4 py-3 text-xl hover:bg-gray-100">
                  [ Share ]
                </button>
              </div>
            </SketchBox>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-300 bg-white px-4 py-2 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-20 h-3 bg-gray-200 border border-gray-300 rounded" />
            <div className="w-16 h-3 bg-gray-200 border border-gray-300 rounded" />
          </div>
          <span className="text-gray-400 text-base tracking-widest">[ navigation placeholder ]</span>
          <div className="w-20 h-5 bg-gray-800 opacity-20" />
        </div>
      </div>
    </div>
  );
}