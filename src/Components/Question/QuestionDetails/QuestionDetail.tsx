import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllQuestionsResponseDate,
  getQuestionById,
  getUserById,
  postComment,
  QuestionType,
  UserResponseType,
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
import MarkdownEditor from "../PostQuestion/MarkdownEditor";
import { convertToRaw, EditorState } from "draft-js";

const RenderComment: FC<{ author: string; text: string }> = ({
  author,
  text,
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
    <CommentItem>
      <span>{text}</span> <CommentAuthor>By: {user?.name}</CommentAuthor>
    </CommentItem>
  );
};

const QuestionDetail: FC = () => {
  const params = useParams();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [openAnswerModal, setOpenAnswerModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState(EditorState.createEmpty());
  const navigate = useNavigate();
  // const { user } = useAppContext();

  const getQuestion = async () => {
    try {
      const question = await getQuestionById(params.id as string);
      setQuestion(question);
    } catch (error) {
      console.log(error);
    }
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
      await getQuestion();
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
        <Button onClick={() => navigate("/")} variant="contained">
          Back to question list
        </Button>
        <Button onClick={() => setOpenCommentModal(true)} variant="contained">
          Comment
        </Button>
        <Button onClick={() => setOpenAnswerModal(true)} variant="contained">
          Answer
        </Button>
      </ButtonGroup>
      {question.comments.length > 0 &&
        question.comments.map((comment: any) => (
          /* @ts-ignore */
          <RenderComment {...comment} />
        ))}
      <CommentContainer></CommentContainer>
      {/* Comment modal*/}
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

      {/* Answer Modal */}
      <Dialog
        open={openAnswerModal}
        keepMounted
        onClose={() => setOpenAnswerModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Answer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <MarkdownEditor
              editorBodyText={answer}
              setEditorBodyText={setAnswer}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAnswerModal(false)}>Discard</Button>
          <Button onClick={postCommentHandler}>Post Answer</Button>
        </DialogActions>
      </Dialog>
    </QuestionDetailContainer>
  );
};

export default QuestionDetail;
