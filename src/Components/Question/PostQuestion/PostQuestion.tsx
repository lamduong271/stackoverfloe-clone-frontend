import { FC, FormEvent, useState } from "react";
import { FormControl, Box, TextField, Button } from "@mui/material";
import MarkdownEditor from "./MarkdownEditor";
import { convertToRaw, EditorState } from "draft-js";
import { QuestionForm, QuestionPostedAlert } from "./PostQuestion.styles";
import draftToHtml from "draftjs-to-html";
import { postQuestionResponseDate } from "../../../Services/request";
import { useNavigate } from "react-router-dom";

const PostQuestion: FC = () => {
  const [questionBody, setQuestionBody] = useState(EditorState.createEmpty());
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [postedQuestion, setPostedQuestion] = useState<any>(null);
  const navigate = useNavigate();

  const submitQuestion = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const postQuestionResponse = await postQuestionResponseDate(
        questionTitle,
        draftToHtml(convertToRaw(questionBody.getCurrentContent()))
      );
      if (postQuestionResponse) {
        setPostedQuestion(postQuestionResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetAll = () => {
    setPostedQuestion(null);
    setQuestionBody(EditorState.createEmpty());
    setQuestionTitle("");
  };

  if (postedQuestion) {
    return (
      <QuestionPostedAlert>
        Question posted:
        <div>{postedQuestion.title}</div>
        <Button onClick={() => resetAll()} variant="contained">
          Post another question
        </Button>
        <Button onClick={() => navigate("/")} variant="contained">
          Go to question list
        </Button>
      </QuestionPostedAlert>
    );
  }
  return (
    <>
      <QuestionForm>
        <div>
          <h2 style={{ textAlign: "center" }}>Question form</h2>
          <FormControl>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "600px" },
              }}
            >
              <label htmlFor="title"> Question Title </label>
              <br />
              <TextField
                id="outlined-basic"
                label="Question title"
                variant="outlined"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "600px" },
              }}
            >
              <label htmlFor="body"> Question Body </label>
              <MarkdownEditor
                editorBodyText={questionBody}
                setEditorBodyText={setQuestionBody}
              />
            </Box>
            <Button onClick={submitQuestion} variant="contained">
              Submit question
            </Button>
            <br />
            <Button onClick={() => navigate("/")} variant="outlined">
              Back to List
            </Button>
          </FormControl>
        </div>
      </QuestionForm>
    </>
  );
};

export default PostQuestion;
