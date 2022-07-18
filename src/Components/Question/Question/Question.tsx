import { FC, useState } from "react";
import { FormControl, Box, TextField, Button } from "@mui/material";
import { QuestionBody } from "./Question.styles";
import MarkdownEditor from "./MarkdownEditor";

const Question: FC = () => {
  const [questionBody, setQuestionBody] = useState<string>("");
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
            onChange={(event) => setQuestionBody(event.target.value)}
          ></MarkdownEditor>
        </Box>
        <Button variant="contained">Submit question</Button>
      </FormControl>
    </div>
  );
};

export default Question;
