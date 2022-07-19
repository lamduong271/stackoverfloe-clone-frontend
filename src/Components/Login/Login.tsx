import { FC, FormEvent, useState } from "react";
import {
  Button,
  FormField,
  Input,
  LoginForm,
  LoginWrapper,
} from "./Login.styles";
import { useAppContext } from "../../Services/app-context";
import { useNavigate } from "react-router-dom";
import { getLoginResponseDate } from "../../Services/request";

const Login: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { setJwtToken } = useAppContext();
  const navigate = useNavigate();

  const submitFeedbackHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const authResponseData = await getLoginResponseDate(email, password);
    if (authResponseData.success) {
      setJwtToken(authResponseData.token);
      localStorage.setItem("jwtToken", authResponseData.token);
      navigate("/");
    }
  };

  return (
    <LoginWrapper>
      <LoginForm data-testid="form" onSubmit={submitFeedbackHandler}>
        <FormField>
          <label htmlFor="email"> Email </label>
          <Input
            name="Email"
            id="email"
            value={email}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="name"> Password </label>
          <Input
            name="password"
            id="password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormField>

        <Button>Login</Button>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
