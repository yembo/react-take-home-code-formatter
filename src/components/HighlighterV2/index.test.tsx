import { fireEvent, render } from "@testing-library/react";
import Highlighter from "./index";
import { REGEX_ENUMS } from "../../utilities/enums";
import { HighlighterProps } from "../../utilities/interfaces";

describe("Highlighter", () => {
  const setup = (props: HighlighterProps) => {
    const utils = render(<Highlighter {...props} />);
    return utils;
  };

  test("Supplying No Lines Works", () => {
    const lines = [""];
    const { getByTestId, getByText } = setup({ lines });

    const unformattedElement = getByText(/Unformatted/i);
    expect(unformattedElement).toBeInTheDocument();
    const formatCode = getByTestId("toggle-format");
    expect(formatCode).toBeInTheDocument();
    fireEvent.click(formatCode);
    const formattedElement = getByText(/Formatted/i);
    expect(formattedElement).toBeInTheDocument();
  });

  test("Valid Line", () => {
    const lines = ["const a = 1 + `${b}`"];
    const { getByTestId, getByText } = setup({ lines });

    const unformattedElement = getByText(/Unformatted/i);
    expect(unformattedElement).toBeInTheDocument();
    const formatCode = getByTestId("toggle-format");
    expect(formatCode).toBeInTheDocument();
    fireEvent.click(formatCode);
    const number = getByTestId(`${REGEX_ENUMS.NUMBER}: 1`);
    expect(number).toBeInTheDocument();
    const templateLiteral = getByTestId(
      `${REGEX_ENUMS.TEMPLATE_LITERAL}: ${"${"}`
    );
    expect(templateLiteral).toBeInTheDocument();
    const reservedKeyword = getByTestId(
      `${REGEX_ENUMS.RESERVED_KEYWORD}: const`
    );
    expect(reservedKeyword).toBeInTheDocument();
    const variable = getByTestId(`${REGEX_ENUMS.VARIABLE}: b`);
    expect(variable).toBeInTheDocument();
  });
});
