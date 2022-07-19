import { instance } from "./api";

interface LoginResponseType {
  success: boolean;
  token: string;
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
  votes?: [any];
  comments?: [any];
  answers?: [any];
}
export const postQuestionResponseDate = async (
  title: string,
  textBody: string
): Promise<QuestionType> => {
  const { data: authResponseData } = await instance.post(
    "/question",
    {
      title,
      textBody,
    },
    config
  );
  return authResponseData;
};

export const getAllQuestionsResponseDate = async (): Promise<
  QuestionType[]
> => {
  const { data: authResponseData } = await instance.get("/question");
  return authResponseData;
};
