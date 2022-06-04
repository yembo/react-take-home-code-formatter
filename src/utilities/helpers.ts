import { REGEXES, REGEX_GROUPS, RESERVED_KEYWORDS } from "./constants";
import { REGEX_ENUMS } from "./enums";
import { Piece } from "./interfaces";

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

export const getPiecesRegex = (line: string): Array<Piece | Piece[]> => {
  // split string if you encounter numbers, reserved keywords, string literals or template literals
  return line.split(REGEXES).map((piece, i) => {
    let className = getClassName(piece);
    if (!className) return getVariables(piece);
    // pull out variables from template literals
    if (className === REGEX_ENUMS.TEMPLATE_LITERAL) return getLiterals(piece);

    return { className, value: piece };
  });
};

const getVariableClassName = (piece: string): string => {
  if (REGEX_GROUPS.string.test(piece)) {
    return REGEX_ENUMS.STRING;
  }
  return "";
};

// const getVariables = (piece: string): RegExpMatchArray | null =>
//   piece.match(REGEX_GROUPS.variable) &&
//   piece.match(REGEX_GROUPS.variable_split);

const getLiterals = (piece: string): Array<Piece> => {
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
          value: "${",
        });
        pieces.push({ className: REGEX_ENUMS.STRING, value: part });
        pieces.push({
          className: REGEX_ENUMS.TEMPLATE_LITERAL,
          value: "}",
        });
      } else {
        let replaceRegExp = RegExp(
          String.raw`(\$\{+(${partToReplace.trim()})\}+)`
        );
        part = part.replace(replaceRegExp, "");

        pieces.push({
          className: REGEX_ENUMS.TEMPLATE_LITERAL,
          value: part,
        });
        partToReplace = "";
      }
    } else {
      pieces.push({
        className: REGEX_ENUMS.TEMPLATE_LITERAL,
        value: part.slice(4),
      });
    }
  }
  return pieces;
};

const getVariables = (piece: string): Array<Piece> => {
  const variables = piece.split(/([a-zA-Z_][a-zA-Z0-9_]*)/g);

  const pieces = [];

  for (let index = 0; index < variables.length; index++) {
    const variable = variables[index];
    console.log(variable);

    if (
      variable.includes(".") ||
      (index < variables.length - 1 && variables[index + 1].includes("(")) ||
      (index < variables.length - 1 && variables[index + 1].includes("."))
    ) {
      pieces.push({
        className: getClassName(variable),
        value: variable,
      });
    } else
      pieces.push({
        className: getVariableClassName(variable),
        value: variable,
      });
  }
  return pieces;
};
