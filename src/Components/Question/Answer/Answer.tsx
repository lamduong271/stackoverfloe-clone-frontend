import { FC, useEffect, useState } from "react";
import {
  AnswerResponseType,
  getAnswerById,
  getUserById,
  postComment,
  UserResponseType,
} from "../../../Services/request";
import {
  AnswerAuthor,
  AnswerContainer,
  AnswerDate,
  VotingWrapper,
  AnswerComment,
  AnswerCommentWrapper,
  Answer,
} from "./Answer.styles";
import parse from "html-react-parser";
import moment from "moment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CommentBody } from "../QuestionItem/QuestionItem.styles";
import {
  CommentContainer,
  CommentItem,
} from "../QuestionDetails/QuestionDetail.styled";

const RenderAnsComment: FC<{ id: string }> = ({ id }) => {
  const [comments, setComments] = useState<any>(null);

  const fetUser = async () => {
    try {
      const answer = await getAnswerById(id);
      setComments(answer.comments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetUser();
  }, []);
  if (comments === null || comments.length === 0) {
    return null;
  }

  return (
    <CommentContainer>
      Comments
      {comments.length > 0 &&
        comments.map((comment: any) => (
          <CommentItem key={comment._id}>{comment.text}</CommentItem>
        ))}
    </CommentContainer>
  );
};

const RenderAnswer: FC<AnswerResponseType> = ({
  textBody,
  author,
  created,
  _id,
}) => {
  const [user, setUser] = useState<UserResponseType | null>(null);
  const [answerCommentModel, setAnswerCommentModel] = useState<boolean>(false);
  const [answerComment, setAnswerComment] = useState<string>("");
  const fetUser = async () => {
    try {
      const user = await getUserById(author);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetUser();
  }, []);

  const commentAnswerHandler = async () => {
    try {
      await postComment({ text: answerComment, answer: _id as string });
      setAnswerCommentModel(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Answer>
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
        <AnswerComment>
          <Button
            onClick={() => setAnswerCommentModel(true)}
            size="small"
            variant="outlined"
          >
            Comment
          </Button>
        </AnswerComment>
      </AnswerContainer>

      <AnswerCommentWrapper>
        <RenderAnsComment id={_id} />
      </AnswerCommentWrapper>
      <Dialog
        open={answerCommentModel}
        keepMounted
        onClose={() => setAnswerCommentModel(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Comment for answer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <CommentBody
              value={answerComment}
              onChange={(e) => setAnswerComment(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAnswerCommentModel(false)}>Discard</Button>
          <Button onClick={commentAnswerHandler}>Post Comment</Button>
        </DialogActions>
      </Dialog>
    </Answer>
  );
};
export default RenderAnswer;
