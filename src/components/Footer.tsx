import { Button } from "@mui/material";
import { useQuestionState } from "../store/questions";

const Footer = () => {
  const questions = useQuestionState((state) => state.questions);
  const resetQuiz = useQuestionState((state) => state.resetQuiz);

  let pending = 0;
  let correct = 0;
  let incorrect = 0;

  questions.forEach((question) => {
    const { correctAnswer, userSelectedAnswer } = question;
    if (userSelectedAnswer === undefined) {
      pending++;
    } else if (userSelectedAnswer === correctAnswer) {
      correct++;
    } else {
      incorrect++;
    }
  });

  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", gap: 5, justifyContent: "space-around" }}>
        <p>Pendientes: {pending}</p>
        <p>Correctas: {correct}</p>
        <p>Incorrectas: {incorrect}</p>
      </div>
      <Button onClick={() => resetQuiz()}>Restart Quiz</Button>
    </footer>
  );
};

export default Footer;
