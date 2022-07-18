import { render, RenderResult } from "@testing-library/react";
import { ComponentType, ReactElement } from "react";
import { AppContextProvider } from "./app-context";

export type DefaultParams = Parameters<typeof render>;
export type RenderUI = DefaultParams[0];
type RenderOptionsWithChildren = {
  children: ReactElement;
};

export const getAllProviders = () => {
  const AllProviders = ({
    children,
  }: RenderOptionsWithChildren): ReactElement => {
    return <AppContextProvider>{children}</AppContextProvider>;
  };
  return AllProviders;
};

const customRender = (ui: RenderUI): RenderResult => {
  const AllProviders = getAllProviders();

  return render(ui, {
    wrapper: AllProviders as ComponentType,
  });
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

export { customRender as render };
