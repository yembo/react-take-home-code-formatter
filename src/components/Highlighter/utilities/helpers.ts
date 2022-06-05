import { REGEXES, REGEX_GROUPS, RESERVED_KEYWORDS } from "./constants";
import { REGEX_ENUMS } from "./enums";
import { PieceProps } from "./interfaces";

/**
 * use regex to evaluate what css class name is relevant to a given piece
 * @param piece of line
 * @returns string
 */
export const getClassName = (piece: string): string => {
  if (REGEX_GROUPS.number.test(piece)) {
    return REGEX_ENUMS.NUMBER;
  }
  if (REGEX_GROUPS.reservedKeyword.test(piece)) {
    return REGEX_ENUMS.RESERVED_KEYWORD;
  }
  if (REGEX_GROUPS.stringLiteral.test(piece)) {
    return REGEX_ENUMS.STRING_LITERAL;
  }
  if (REGEX_GROUPS.templateLiteral.test(piece)) {
    return REGEX_ENUMS.TEMPLATE_LITERAL;
  }
  return "";
};

export const getPiecesRegex = (
  line: string
): Array<PieceProps | PieceProps[]> => {
  // split string if you encounter numbers, reserved keywords, string literals or template literals
  return line.split(REGEXES).map((piece, i) => {
    let className = getClassName(piece);
    if (!className) return getVariables(piece);
    // pull out variables from template literals
    if (className === REGEX_ENUMS.TEMPLATE_LITERAL) return getLiterals(piece);

    return { className, testId: `${className}: ${piece}`, value: piece };
  });
};

const getVariableClassName = (piece: string): string => {
  if (REGEX_GROUPS.string.test(piece)) {
    return REGEX_ENUMS.VARIABLE;
  }
  return "";
};

// const getVariables = (piece: string): RegExpMatchArray | null =>
//   piece.match(REGEX_GROUPS.variable) &&
//   piece.match(REGEX_GROUPS.variable_split);

const getLiterals = (piece: string): Array<PieceProps> => {
  // we split the string based on when we encounter ${variable}
  const parts = piece.split(/(?=\$\{+(\w+)\}+)/g);
  const pieces = [];
  let partToReplace = "";
  for (let index = 0; index < parts.length; index++) {
    let part = parts[index];
    // check if you can look ahead
    if (index < parts.length - 1) {
      const partAhead = parts[index + 1];
      const partRegExp = RegExp(String.raw`(?=\$\{+(${part})\}+)`);
      if (partRegExp.test(partAhead)) {
        partToReplace = part;
        pieces.push({
          className: REGEX_ENUMS.TEMPLATE_LITERAL,
          testId: `${REGEX_ENUMS.TEMPLATE_LITERAL}: ${"${"}`,
          value: "${",
        });
        pieces.push({
          className: REGEX_ENUMS.VARIABLE,
          testId: `${REGEX_ENUMS.VARIABLE}: ${part}`,
          value: part,
        });
        pieces.push({
          className: REGEX_ENUMS.TEMPLATE_LITERAL,
          testId: `${REGEX_ENUMS.TEMPLATE_LITERAL}: }`,
          value: "}",
        });
      } else {
        let replaceRegExp = RegExp(
          String.raw`(\$\{+(${partToReplace.trim()})\}+)`
        );
        part = part.replace(replaceRegExp, "");

        pieces.push({
          className: REGEX_ENUMS.TEMPLATE_LITERAL,
          testId: `${REGEX_ENUMS.TEMPLATE_LITERAL}: ${part}`,
          value: part,
        });
        partToReplace = "";
      }
    } else {
      pieces.push({
        className: REGEX_ENUMS.TEMPLATE_LITERAL,
        testId: `${REGEX_ENUMS.TEMPLATE_LITERAL}: ${part.slice(4)}`,
        value: part.slice(4),
      });
    }
  }
  return pieces;
};

const getVariables = (piece: string): Array<PieceProps> => {
  const variables = piece.split(/([a-zA-Z_][a-zA-Z0-9_]*)/g);

  const pieces = [];

  for (let index = 0; index < variables.length; index++) {
    const variable = variables[index];

    if (
      variable.includes(".") ||
      (index < variables.length - 1 && variables[index + 1].includes("(")) ||
      (index < variables.length - 1 && variables[index + 1].includes("."))
    ) {
      pieces.push({
        className: getClassName(variable),
        testId: `${getClassName(variable)}: ${variable}`,
        value: variable,
      });
    } else
      pieces.push({
        className: getVariableClassName(variable),
        testId: `${getVariableClassName(variable)}: ${variable}`,
        value: variable,
      });
  }
  return pieces;
};
