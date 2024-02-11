import { Button } from "@mui/material";
import { useQuestionState } from "../store/questions";

const Start = () => {
  const fetchQuestion = useQuestionState((state) => state.fetchQuestion);

  const handleClick = () => {
    fetchQuestion(10);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "2rem",
      }}
    >
      <Button onClick={handleClick} variant="contained">
        Start
      </Button>
    </div>
  );
};

export default Start;
