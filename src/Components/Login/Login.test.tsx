import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../Services/testConfig";
import Login from "./Login";

test("Render Login screen", () => {
  render(<Login />);
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Email")).toBeInTheDocument();
});

test("onChange input value and email work", async () => {
  render(<Login />);
  const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: "abc" } });
  const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
  fireEvent.change(emailInput, { target: { value: "abc@abc.com" } });
  expect(nameInput.value).toBe("abc");
  expect(emailInput.value).toBe("abc@abc.com");
});
