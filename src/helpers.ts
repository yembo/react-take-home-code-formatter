import { ENUMS, REGEX_GROUPS } from "./constants";

export const getVariableClassName = (piece: string): string => {
  if (REGEX_GROUPS.string.test(piece)) {
    return ENUMS.STRING;
  }
  return "";
};

export const getVariables = (piece: string): RegExpMatchArray | null =>
  piece.match(REGEX_GROUPS.variable) &&
  piece.match(REGEX_GROUPS.variable_split);

export const getClassName = (piece: string): string => {
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
