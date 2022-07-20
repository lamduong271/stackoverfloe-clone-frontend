import { FC, useEffect, useState } from "react";
import {
  getAllQuestionsResponseDate,
  QuestionType,
} from "../../../Services/request";
import QuestionItem from "../QuestionItem/QuestionItem";
import { QuestionListContainer } from "./QuestionList.styles";

const QuestionList: FC = () => {
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  useEffect(() => {
    fetchAllQuestions();
  }, []);
  const fetchAllQuestions = async (): Promise<void> => {
    try {
      const allQuestions = await getAllQuestionsResponseDate();
      setQuestions(allQuestions);
    } catch (error) {
      console.log(error);
    }
  };
  if (questions === null) {
    return <>Empty list</>;
  }
  return (
    <QuestionListContainer>
      {questions.map((question) => (
        <QuestionItem key={question._id} {...question} />
      ))}
    </QuestionListContainer>
  );
};

export default QuestionList;
