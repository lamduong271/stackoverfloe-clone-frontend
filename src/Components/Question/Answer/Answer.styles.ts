import styled from "styled-components";

export const AnswerContainer = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
`;

export const Answer = styled.div`
  border-bottom: 1px solid #bcbcbc;
`;

export const AnswerAuthor = styled.div`
  font-size: 12px;
`;

export const AnswerDate = styled.div`
  font-size: 12px;
`;

export const VotingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30px;
  justify-content: center;
  align-items: center;
`;

export const AnswerComment = styled.div`
  position: absolute;
  right: 20px;
`;

export const AnswerCommentWrapper = styled.div`
  font-size: 12px;
`;
