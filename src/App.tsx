import { Container } from "@mui/material";

import Start from "./components/Start";
import { useQuestionState } from "./store/questions";
import Game from "./components/Game";
import Title from "./components/Title";

const App = () => {
  const questions = useQuestionState((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Title />
        {questions.length === 0 && <Start />}

        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
};

export default App;
