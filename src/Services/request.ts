import { instance } from "./api";

interface User {
  _id: string;
  name: string;
  email: string;
}
interface LoginResponseType {
  success: boolean;
  token: string;
  user: User;
}

export const getRegisterResponseData = async (
  name: string,
  email: string,
  password: string
): Promise<string> => {
  const { data: authResponseData } = await instance.post("/auth/register", {
    name,
    email,
    password,
  });
  return authResponseData;
};

export const getLoginResponseDate = async (
  email: string,
  password: string
): Promise<LoginResponseType> => {
  const { data: authResponseData } = await instance.post("/auth/login", {
    email,
    password,
  });
  return authResponseData;
};

let config = {
  headers: {
    "x-access-token": localStorage.getItem("jwtToken") || "",
  },
};

interface AuthorType {
  _id: string;
  email: string;
  name?: string;
}
export interface QuestionType {
  author: AuthorType;
  title: string;
  textBody: string;
  _id: string;
  created: string;
  votes: [any];
  comments: [any];
  answers: [any];
}
export const postQuestionResponseDate = async (
  title: string,
  textBody: string
): Promise<QuestionType> => {
  const { data: postQuestionResponse } = await instance.post(
    "/question",
    {
      title,
      textBody,
    },
    config
  );
  return postQuestionResponse;
};

export const getAllQuestionsResponseDate = async (): Promise<
  QuestionType[]
> => {
  const { data: allQuestionsResponse } = await instance.get("/question");
  return allQuestionsResponse;
};

interface CommentPayload {
  text: string;
  post: string;
}
interface PostCommentResponse {
  author: string;
  text: string;
  post: string;
  _id: string;
  created: string;
}

export const postComment = async ({
  text,
  post,
}: CommentPayload): Promise<PostCommentResponse[]> => {
  const { data: authResponseData } = await instance.post(
    "/comment",
    {
      text,
      post,
    },
    config
  );
  return authResponseData;
};
