import React, { FC, FormEvent, useState } from "react";
import {
  Button,
  FormField,
  Input,
  LoginForm,
  LoginWrapper,
  CongratComponent,
} from "./Register.styles";
import { useNavigate } from "react-router-dom";
import { getRegisterResponseData } from "../../Services/request";

const Register: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const authResponseData = await getRegisterResponseData(
        name,
        email,
        password
      );
      if (authResponseData === "ok") {
        setRegisterSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RenderSuccessScreen: FC = () => {
    return (
      <CongratComponent>
        <h1>Register Success</h1>
        <Button onClick={() => navigate("/login")}>Back to Login</Button>
      </CongratComponent>
    );
  };

  return (
    <LoginWrapper>
      {registerSuccess ? (
        <RenderSuccessScreen />
      ) : (
        <LoginForm data-testid="form" onSubmit={registerHandler}>
          <FormField>
            <label htmlFor="name"> Name </label>
            <Input
              name="name"
              id="name"
              value={name}
              type="text"
              onChange={(event) => setName(event.target.value)}
            />

            <label htmlFor="email"> Email </label>
            <Input
              name="email"
              id="email"
              value={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="email"> Email </label>
            <Input
              name="password"
              id="password"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormField>

          <Button>Register</Button>
        </LoginForm>
      )}
    </LoginWrapper>
  );
};

export default Register;
