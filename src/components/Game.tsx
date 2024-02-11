import {
  Button,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuestionState } from "../store/questions";
import { type Question as QuestionsType } from "../types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Footer from "./Footer";

const getBackgorundColor = (info: QuestionsType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) return "transparent";

  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";

  if (index === correctAnswer) return "green";

  if (index === userSelectedAnswer) return "red";

  return "transparent";
};

const Question = ({ info }: { info: QuestionsType }) => {
  const selectAnswer = useQuestionState((state) => state.selectAnswer);

  const handleClick = (i: number) => {
    selectAnswer(info.id, i);
  };
  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#333", padding: 2, marginTop: "2rem" }}
    >
      <Typography variant={"h4"}>{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#222" }}>
        {info.answers.map((el, i) => {
          return (
            <ListItem key={i} divider>
              <ListItemButton
                onClick={() => handleClick(i)}
                disabled={info.userSelectedAnswer !== undefined}
                sx={{ backgroundColor: getBackgorundColor(info, i) }}
              >
                <ListItemText primary={el} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Footer></Footer>
    </Card>
  );
};

const Game = () => {
  const questions = useQuestionState((state) => state.questions);
  const currentQuestion = useQuestionState((state) => state.currentQuestion);

  const goNextQuestion = useQuestionState((state) => state.goNextQuestion);
  const goPrevQuestion = useQuestionState((state) => state.goPrevQuestion);

  const infoQuestion = questions[currentQuestion];
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Button onClick={goPrevQuestion}>
          <ArrowBackIos></ArrowBackIos>
        </Button>
        {currentQuestion + 1}
        {" / "} {questions.length}
        <Button onClick={goNextQuestion}>
          <ArrowForwardIos></ArrowForwardIos>
        </Button>
      </Stack>
      <Question info={infoQuestion} />
    </>
  );
};

export default Game;
