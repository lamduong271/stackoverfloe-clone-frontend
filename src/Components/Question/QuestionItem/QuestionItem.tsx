import { FC, useState } from "react";
import {
  getAllQuestionsResponseDate,
  QuestionType,
} from "../../../Services/request";
import {
  ListItemWrapper,
  QuestionTitle,
  ItemContent,
  QuestionHeader,
  PostedDate,
  QuestionBody,
  QuestionContent,
  ButtonGroup,
} from "./QuestionItem.styles";
import moment from "moment";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const QuestionItem: FC<QuestionType> = ({
  _id,
  title,
  textBody,
  created,
  comments,
  answers,
}) => {
  const navigate = useNavigate();
  // const { user } = useAppContext();

  return (
    <ListItemWrapper>
      <ItemContent>
        <QuestionHeader>
          <QuestionTitle>{title}</QuestionTitle>
          <PostedDate>
            created at:{" "}
            {moment(created).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </PostedDate>
        </QuestionHeader>
        <QuestionBody>
          <QuestionContent>{parse(textBody)}</QuestionContent>
          <ButtonGroup>
            <Button
              onClick={() => navigate(`/question/${_id}`)}
              variant="contained"
            >
              Details
            </Button>
          </ButtonGroup>

          <div>Comments :{comments.length}</div>
          <div>Answer :{answers.length}</div>
        </QuestionBody>
      </ItemContent>
    </ListItemWrapper>
  );
};

export default QuestionItem;
