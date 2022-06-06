import { fireEvent, render } from "@testing-library/react";
import Analyzer from "./index";
import { ModuleProps, REGEX_ENUMS } from "../../utilities";

describe("Analyzer", () => {
  const setup = (props: ModuleProps) => {
    const utils = render(<Analyzer {...props} />);
    return utils;
  };

  test("Supplying No Lines Works", () => {
    const lines = [""];
    const { getByTestId, getByText } = setup({ lines });

    const unanalyzedElement = getByText(/Unanalyzed/i);
    expect(unanalyzedElement).toBeInTheDocument();
    const analyzeCode = getByTestId("toggle-analyze");
    expect(analyzeCode).toBeInTheDocument();
    fireEvent.click(analyzeCode);
    const analyzedElement = getByText(/Clear\sAnalysis/i);
    expect(analyzedElement).toBeInTheDocument();
  });

  test("Valid Line", () => {
    const lines = ["const a = 1 + `${b}`"];
    const { getByTestId, getByText } = setup({ lines });

    const unanalyzedElement = getByText(/Unanalyzed/i);
    expect(unanalyzedElement).toBeInTheDocument();
    const analyzeCode = getByTestId("toggle-analyze");
    expect(analyzeCode).toBeInTheDocument();
    fireEvent.click(analyzeCode);
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
