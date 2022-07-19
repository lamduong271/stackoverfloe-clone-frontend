import { FC, useState } from "react";
import { FormControl, Box, TextField, Button } from "@mui/material";
import MarkdownEditor from "./MarkdownEditor";
import { EditorState } from "draft-js";

const Question: FC = () => {
  const [questionBody, setQuestionBody] = useState(EditorState.createEmpty());
  const [questionTitle, setQuestionTitle] = useState<string>("");

  return (
    <div>
      <h2>Question form</h2>
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
  );
};

export default Question;
