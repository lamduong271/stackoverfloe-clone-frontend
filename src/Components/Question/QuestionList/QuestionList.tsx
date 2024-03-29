import { Box, Button, Grid, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllQuestionsResponseDate,
  QuestionType,
} from "../../../Services/request";
import QuestionItem from "../QuestionItem/QuestionItem";
import { QuestionListContainer, SortingWrapper } from "./QuestionList.styles";

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
    if (questions !== null && search) {
      const filteredQuestions = questions.filter((question) =>
        question.title.includes(search)
      );
      setFilteredQuestions([...filteredQuestions]);
    } else {
      setFilteredQuestions(questions);
    }
  };

  if (questions === null) {
    return <>Empty list</>;
  }

  const renderQuestionList = () => {
    if (filteredQuestions !== null) {
      return filteredQuestions;
    } else {
      return questions;
    }
  };

  const sortingQuestions = (direct: string) => {
    const sortedQuestions = questions.sort(
      (a: QuestionType, b: QuestionType) => {
        if (direct === "asc") {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        } else {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        }
      }
    );
    setQuestions([...sortedQuestions]);
  };

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
      <SortingWrapper>
        <div>Sort by created date</div>
        <Button variant="outlined" onClick={() => sortingQuestions("desc")}>
          Latest date
        </Button>
        <Button variant="outlined" onClick={() => sortingQuestions("asc")}>
          Oldest date
        </Button>
      </SortingWrapper>
      {renderQuestionList().map((question) => (
        <QuestionItem key={question._id} {...question} />
      ))}
    </QuestionListContainer>
  );
};

export default QuestionList;
