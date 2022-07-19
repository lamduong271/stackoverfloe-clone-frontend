import { FC, useEffect, useState } from "react";
import {
  getAllQuestionsResponseDate,
  QuestionType,
} from "../../../Services/request";
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
        <div>
          <div>title: {question.title}</div>
          <div>content : {question.textBody}</div>
        </div>
      ))}
    </QuestionListContainer>
  );
};

export default QuestionList;
