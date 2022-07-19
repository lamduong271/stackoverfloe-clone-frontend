import { FC, useState } from "react";
import { FormControl, Box, TextField, Button } from "@mui/material";
import MarkdownEditor from "./MarkdownEditor";
import { convertToRaw, EditorState } from "draft-js";
import { QuestionForm } from "./Question.styles";
import draftToHtml from "draftjs-to-html";

const Question: FC = () => {
  const [questionBody, setQuestionBody] = useState(EditorState.createEmpty());
  const [questionTitle, setQuestionTitle] = useState<string>("");

  console.log(
    "questionBody ",
    draftToHtml(convertToRaw(questionBody.getCurrentContent()))
  );
  console.log(questionTitle);
  return (
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
              questionBody={questionBody}
              setQuestionBody={setQuestionBody}
            />
          </Box>
          <Button variant="contained">Submit question</Button>
        </FormControl>
      </div>
    </QuestionForm>
  );
};

export default Question;
