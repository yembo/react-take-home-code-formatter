import { fireEvent, render, screen } from "@testing-library/react";
import Highlighter from "./index";

test("Checks Columns", () => {
  // const lines: string[] = [
  //   "try {",
  //   "    const response = await read()",
  //   "} catch (error) {",
  //   "    setError(error)",
  //   "}",
  // ];
  const lines = ["const a = 1 + `${b}`"];
  render(<Highlighter lines={lines} />);
  const unformattedElement = screen.getByText(/Unformatted/i);
  expect(unformattedElement).toBeInTheDocument();
  const formatCode = screen.getByTestId("toggle-format");
  expect(formatCode).toBeInTheDocument();
  fireEvent.click(formatCode);
  const removeFormattingElement = screen.getByText(/RemoveFormatting/i);
  expect(removeFormattingElement).toBeInTheDocument();
  // fireEvent.click(formatCode);
  // expect(removeFormattingElement).toBeInTheDocument();
});

// describe("Check Formatting", () => {
//   render(<Highlighter />);
// })
