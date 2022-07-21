import { FC, useEffect, useState } from "react";
import {
  AnswerResponseType,
  getUserById,
  UserResponseType,
} from "../../../Services/request";
import { AnswerAuthor, AnswerContainer } from "./Answer.styles";
import parse from "html-react-parser";
import moment from "moment";

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
      {parse(textBody)}
      <AnswerAuthor>By: {user?.name}</AnswerAuthor>
      {moment(created).format("dddd, MMMM Do YYYY, h:mm:ss a")}
    </AnswerContainer>
  );
};
export default RenderAnswer;
