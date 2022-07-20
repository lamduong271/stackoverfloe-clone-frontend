import React, { Dispatch, SetStateAction } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./MarkdownEditor.styles.scss";

interface EditorProp {
  setQuestionBody: Dispatch<SetStateAction<EditorState>>;
  questionBody: EditorState;
}
const MarkdownEditor: React.FC<EditorProp> = (props) => {
  const { setQuestionBody, questionBody } = props;
  const onEditorStateChange = (questionBody: EditorState) => {
    setQuestionBody(questionBody);
  };

  return (
    <div>
      <Editor
        editorState={questionBody}
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbarClassName="toolbarClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default MarkdownEditor;
