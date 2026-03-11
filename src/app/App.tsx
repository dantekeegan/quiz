import "../styles/fonts.css";
import { QuizGame } from "./components/QuizGame";

export default function App() {
  return (
    <div className="size-full" style={{ fontFamily: "'Roboto Slab', serif" }}>
      <QuizGame />
    </div>
  );
}
