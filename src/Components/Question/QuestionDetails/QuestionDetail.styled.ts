import styled from "styled-components";

export const QuestionDetailContainer = styled.div``;

export const QuestionContent = styled.div`
  padding: 20px;
  border-bottom: 1px solid black;
`;

export const QuestionHeader = styled.div`
  font-size: 20px;
  padding: 16px 0 8px;
`;

export const PostedDate = styled.div`
  padding: 0 0 16px;
  font-size: 12px;
  border-bottom: 1px solid;
`;

export const QuestionBody = styled.div`
  padding: 20px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

export const CommentBody = styled.textarea`
  width: 500px;
  height: 200px;
`;

export const QuestionFooter = styled.div`
  border-top: 1px solid black;
  padding: 16px 0;
`;

export const CommentContainer = styled.div`
  background-color: #fff4d2;
  padding: 20px;
  margin: 20px 40px;
`;

export const AnswerContainer = styled.div`
  background-color: #edf7ff;
  padding: 20px;
`;

export const CommentItem = styled.div`
  padding: 8px 20px;
  border-bottom: 1px solid;
  margin: 0 20px;
`;

export const CommentText = styled.span`
  font-size: 16px;
`;

export const CommentAuthorAndDate = styled.span`
  border-radius: 2px;
  padding-left: 8px;
  font-size: 12px;
`;
