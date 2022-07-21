import { FC, useEffect, useState } from "react";
import {
  AnswerResponseType,
  getUserById,
  UserResponseType,
} from "../../../Services/request";
import {
  AnswerAuthor,
  AnswerContainer,
  AnswerDate,
  VotingWrapper,
} from "./Answer.styles";
import parse from "html-react-parser";
import moment from "moment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const RenderAnswer: FC<AnswerResponseType> = ({
  textBody,
  author,
  created,
}) => {
  const [user, setUser] = useState<UserResponseType | null>(null);
  console.log("author", author);
  const fetUser = async () => {
    try {
      const user = await getUserById(author);
      setUser(user);
      console.log("user", user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetUser();
  }, []);

  return (
    <AnswerContainer>
      <VotingWrapper>
        <ArrowDropUpIcon fontSize="large"></ArrowDropUpIcon>
        <span>20</span>
        <ArrowDropDownIcon fontSize="large"></ArrowDropDownIcon>
      </VotingWrapper>
      <div>
        {parse(textBody)}
        <AnswerAuthor>By: {user?.name}</AnswerAuthor>
        <AnswerDate>
          {moment(created).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </AnswerDate>
      </div>
    </AnswerContainer>
  );
};
export default RenderAnswer;
