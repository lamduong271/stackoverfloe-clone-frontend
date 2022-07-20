import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllQuestionsResponseDate,
  getQuestionById,
  getUserById,
  postComment,
  QuestionType,
} from "../../../Services/request";
import moment from "moment";
import parse from "html-react-parser";
import {
  QuestionDetailContainer,
  QuestionContent,
  QuestionHeader,
  PostedDate,
  QuestionBody,
  CommentContainer,
  ButtonGroup,
  CommentBody,
  CommentItem,
  CommentAuthor,
} from "./QuestionDetail.styled";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const QuestionDetail: FC = () => {
  const params = useParams();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  // const { user } = useAppContext();

  const getQuestion = async () => {
    try {
      const question = await getQuestionById(params.id as string);
      setQuestion(question);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id: string) => {
    const user = await getUserById(id);
    return user;
  };

  useEffect(() => {
    getQuestion();
  }, []);

  if (question === null) {
    return null;
  }
  const { title, created, textBody } = question;

  const postCommentHandler = async (): Promise<void> => {
    try {
      await postComment({ text: comment, post: question._id as string });
      await getAllQuestionsResponseDate();
      setOpenCommentModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <QuestionDetailContainer>
      <QuestionContent>
        <QuestionHeader>{title}</QuestionHeader>
        <PostedDate>
          {moment(created).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </PostedDate>
        <QuestionBody>{parse(textBody)}</QuestionBody>
      </QuestionContent>
      <ButtonGroup>
        <Button variant="contained">Details</Button>
        <Button onClick={() => setOpenCommentModal(true)} variant="contained">
          Comment
        </Button>
        <Button variant="contained">Answer</Button>
      </ButtonGroup>
      {question.comments.length > 0 &&
        question.comments.map((comment) => (
          <CommentItem>
            <span>{comment.text}</span> <CommentAuthor>By: </CommentAuthor>
          </CommentItem>
        ))}
      <CommentContainer></CommentContainer>

      <Dialog
        open={openCommentModal}
        keepMounted
        onClose={() => setOpenCommentModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Comment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <CommentBody
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCommentModal(false)}>Discard</Button>
          <Button onClick={postCommentHandler}>Post comment</Button>
        </DialogActions>
      </Dialog>
    </QuestionDetailContainer>
  );
};

export default QuestionDetail;