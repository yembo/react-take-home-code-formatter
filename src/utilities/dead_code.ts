// export let OLD_REGEXES: RegExp =
//   /"[^"]*"|`[^`]*`|'[^']*'|(for|while|let|const|var|try|catch)|\d+\.?\d*|[(]|[a-zA-Z\s;=<>\.)|&^{}\+]+/g;

// export const RESERVED_KEYWORDS: string[] = [
//   "abstract",
//   "arguments",
//   "await",
//   "boolean",
//   "break",
//   "byte",
//   "case",
//   "catch",
//   "char",
//   "class",
//   "const",
//   "continue",
//   "debugger",
//   "default",
//   "delete",
//   "do",
//   "double",
//   "else",
//   "enum",
//   "eval",
//   "export",
//   "extends",
//   "false",
//   "final",
//   "finally",
//   "float",
//   "for",
//   "function",
//   "goto",
//   "if",
//   "implements",
//   "import",
//   "in",
//   "instanceof",
//   "int",
//   "interface",
//   "let",
//   "long",
//   "native",
//   "new",
//   "null",
//   "package",
//   "private",
//   "protected",
//   "public",
//   "return",
//   "short",
//   "static",
//   "super",
//   "switch",
//   "synchronized",
//   "this",
//   "throw",
//   "throws",
//   "transient",
//   "true",
//   "try",
//   "typeof",
//   "var",
//   "void",
//   "volatile",
//   "while",
//   "with",
//   "yield",
// ];

/*


export const getPiecesRegexOutdated = (line: string): Array<Piece> => {
  const pieces = line.match(OLD_REGEXES) || [];
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

const hasInitializer = (expressions: Array<Piece>) =>
  INITIALIZERS.includes(expressions[expressions.length - 1].value);

const variables: any[] = [];

export const getPiecesBruteForce = (line: string): Array<Piece> => {
  const pieces = line.split("");
  const expressions: any[] = [];
  let foundSpaceIndex = -1;
  const variableRE = /([a-zA-Z_][a-zA-Z0-9_]*)/;
  let variablesRE;

  let tracker = "";
  variablesRE = RegExp(String.raw`${variables.join("|")}`);
  for (let index = 0; index < pieces.length; index++) {
    const piece = pieces[index];
    tracker = tracker + piece;

    // identify keywords
    if (REGEX_GROUPS.reservedKeyword.test(tracker)) {
      const keywords = tracker.split(/(for|while|let|const|var|try|catch)/g);
      for (const keyword of keywords) {
        if (keyword) {
          expressions.push({
            className: getClassName(keyword),
            value: keyword,
          });
        }
      }
      tracker = "";
    }
    // identify variables
    if (variablesRE.test(tracker)) {
      const variablePieces = tracker.split(variablesRE);
      if (
        variablePieces[variablePieces.length - 1] === " " &&
        variablePieces.length > 1
      ) {
        for (const variablePiece of variablePieces) {
          if (variablePiece) {
            expressions.push({
              className: getVariableClassName(variablePiece),
              value: variablePiece,
            });
          }
        }
        tracker = "";
      }
    }
    // identify numbers
    if (REGEX_GROUPS.number.test(tracker)) {
      const numbers = tracker.split(/(\d+\.?\d*)/g);
      for (const number of numbers) {
        expressions.push({
          className: getClassName(number),
          value: number,
        });
      }
      tracker = "";
    }

    if (hasInitializer(expressions) && tracker === " ") {
      foundSpaceIndex = index;
    }

    // get second bound
    if (
      hasInitializer(expressions) &&
      tracker.charAt(tracker.length - 1) === " " &&
      variableRE.test(tracker) &&
      foundSpaceIndex > 0
    ) {
      variables.push(tracker.trim());
      foundSpaceIndex = -1;
      variablesRE = RegExp(String.raw`${variables.join("|")}`);
    }
  }

  return expressions;
};
*/

export {};
