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
  CommentBody,
  QuestionFooter,
} from "./QuestionItem.styles";
import moment from "moment";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { useAppContext } from "../../../Services/app-context";
import { postComment } from "../../../Services/request";

const QuestionItem: FC<QuestionType> = ({
  _id,
  title,
  textBody,
  created,
  comments,
  answers,
}) => {
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  // const { user } = useAppContext();

  const postCommentHandler = async (): Promise<void> => {
    try {
      await postComment({ text: comment, post: _id });
      await getAllQuestionsResponseDate();
    } catch (error) {
      console.log(error);
    }
  };

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
          <QuestionContent>{textBody}</QuestionContent>
          <ButtonGroup>
            <Button variant="contained">Details</Button>
            <Button
              onClick={() => setOpenCommentModal(true)}
              variant="contained"
            >
              Comment
            </Button>
            <Button variant="contained">Answer</Button>
          </ButtonGroup>
        </QuestionBody>
        <QuestionFooter>
          <div> comment: {comments?.length}</div>
          <div> answer: {answers?.length}</div>
        </QuestionFooter>
      </ItemContent>

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
    </ListItemWrapper>
  );
};

export default QuestionItem;
