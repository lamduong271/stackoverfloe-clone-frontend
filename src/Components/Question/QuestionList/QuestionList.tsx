import { Box, Button, Grid, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllQuestionsResponseDate,
  QuestionType,
} from "../../../Services/request";
import QuestionItem from "../QuestionItem/QuestionItem";
import { QuestionListContainer } from "./QuestionList.styles";

const QuestionList: FC = () => {
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<
    QuestionType[] | null
  >(questions);
  useEffect(() => {
    fetchAllQuestions();
  }, []);
  const navigate = useNavigate();
  const fetchAllQuestions = async (): Promise<void> => {
    try {
      const allQuestions = await getAllQuestionsResponseDate();
      setQuestions(allQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  const searchQuestion = () => {
    console.log("haha");
    if (questions !== null && search !== "") {
      const filteredQuestions = questions.filter((question) =>
        question.title.includes(search)
      );
      setQuestions(filteredQuestions);
    }
  };
  if (questions === null) {
    return <>Empty list</>;
  }
  return (
    <QuestionListContainer>
      <Grid style={{ alignItems: "center" }} container spacing={2}>
        <Grid item xs={8}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              size="small"
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" onClick={searchQuestion}>
            Search
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" onClick={() => navigate("/post-question")}>
            Create Question
          </Button>
        </Grid>
      </Grid>
      {questions.map((question) => (
        <QuestionItem key={question._id} {...question} />
      ))}
    </QuestionListContainer>
  );
};

export default QuestionList;
