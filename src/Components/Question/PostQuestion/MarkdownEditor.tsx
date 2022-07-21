import React, { Dispatch, SetStateAction } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./MarkdownEditor.styles.scss";

interface EditorProp {
  setEditorBodyText: Dispatch<SetStateAction<EditorState>>;
  editorBodyText: EditorState;
}
const MarkdownEditor: React.FC<EditorProp> = (props) => {
  const { setEditorBodyText, editorBodyText } = props;
  const onEditorStateChange = (editorBodyText: EditorState) => {
    setEditorBodyText(editorBodyText);
  };

  return (
    <div>
      <Editor
        editorState={editorBodyText}
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbarClassName="toolbarClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default MarkdownEditor;
