import { ENUMS, REGEX_GROUPS, REGEXES } from "./constants";

/**
 * use regex to evaluate what css class name is relevant to a given piece
 * @param piece of line
 * @returns string
 */
const getClassName = (piece: string): string => {
  if (REGEX_GROUPS.number.test(piece)) {
    return ENUMS.NUMBER;
  }
  if (REGEX_GROUPS.reservedKeyword.test(piece)) {
    return ENUMS.RESERVED_KEYWORD;
  }
  if (REGEX_GROUPS.stringLiteral.test(piece)) {
    console.log(piece);

    return ENUMS.STRING_LITERAL;
  }
  if (REGEX_GROUPS.templateLiteral.test(piece)) {
    return ENUMS.TEMPLATE_LITERAL;
  }
  return "";
};

interface Piece {
  className: string;
  value: string;
}

/**
 * utilize regex and break line into pieces and then build a list with information
 * on how each piece should be displayed
 * @param line
 * @returns
 */
export const getPiecesRegex = (line: string): Array<Piece> => {
  const pieces = line.match(REGEXES) || [];
  let expressions = [];
  for (const piece of pieces) {
    let className = getClassName(piece);
    if (!className) {
      const variables = getVariables(piece) || [];
      if (variables && variables.length > 0) {
        for (const variable of variables) {
          className = getVariableClassName(variable);
          expressions.push({ className, value: variable });
        }
      } else {
        expressions.push({ className, value: piece });
      }
    } else if (className === ENUMS.TEMPLATE_LITERAL) {
      // we split the string based on when we encounter ${variable}
      const parts = piece.split(/(?=\$\{+(\w+)\}+)/g);
      let partToReplace = "";
      for (let index = 0; index < parts.length; index++) {
        let part = parts[index];
        // check if you can look ahead
        if (index < parts.length - 1) {
          const partAhead = parts[index + 1];
          const partRegExp = RegExp(String.raw`(?=\$\{+(${part})\}+)`);
          if (partRegExp.test(partAhead)) {
            partToReplace = part;
            expressions.push({
              className: ENUMS.TEMPLATE_LITERAL,
              value: "${",
            });
            expressions.push({ className: ENUMS.STRING, value: part });
            expressions.push({
              className: ENUMS.TEMPLATE_LITERAL,
              value: "}",
            });
          } else {
            let replaceRegExp = RegExp(
              String.raw`(\$\{+(${partToReplace.trim()})\}+)`
            );
            part = part.replace(replaceRegExp, "");
            expressions.push({
              className: ENUMS.TEMPLATE_LITERAL,
              value: part,
            });
            partToReplace = "";
          }
        }
      }
    } else {
      expressions.push({ className, value: piece });
    }
  }
  return expressions;
};

const getVariables = (piece: string): RegExpMatchArray | null =>
  piece.match(REGEX_GROUPS.variable) &&
  piece.match(REGEX_GROUPS.variable_split);

const getVariableClassName = (piece: string): string => {
  if (REGEX_GROUPS.string.test(piece)) {
    return ENUMS.STRING;
  }
  return "";
};
