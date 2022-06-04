export const ENUMS = {
  NUMBER: "number",
  RESERVED_KEYWORD: "reserved-keyword",
  VARIABLE: "variable",
  STRING: "string",
  STRING_LITERAL: "string-literal",
  TEMPLATE_LITERAL: "template-literal",
  DEFAULT: "default",
};

export const REGEX_GROUPS: {
  number: RegExp;
  reservedKeyword: RegExp;
  string: RegExp;
  stringLiteral: RegExp;
  templateLiteral: RegExp;
  variable: RegExp;
  variable_split: RegExp;
} = {
  number: /\d+\.?\d*/,
  reservedKeyword: /\b(for|while|let|const|var|try|catch)\b/,
  string: /[a-zA-Z]/g,
  stringLiteral: /"[^"]*"|'[^']*'/,
  templateLiteral: /`[^`]*`/,
  variable: /([a-zA-Z_][a-zA-Z0-9_]*)(\s?)([<=>,;){\s%\/]|[\+\*\-]{1,2})/g,
  variable_split: /([a-zA-Z_][a-zA-Z0-9_]*)|([<=>,;){\s%\/]|[\+\*\-]{1,2})/g,
};
export let REGEXES: RegExp =
  /"[^"]*"|`[^`]*`|'[^']*'|\b(for|while|let|const|var|try|catch)\b|\d+\.?\d*|[(]|[a-zA-Z\s;=<>\.)|&^{}\+]+/g;

export const VARIABLE_BUILDERS: string[] = ["const", "let", "var"];

export const RESERVED_KEYWORDS: string[] = [
  ...VARIABLE_BUILDERS,
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];

/**
 * if (!className && piece.match(REGEX_GROUPS.variable)) {
            console.log(piece.match(REGEX_GROUPS.variable));

            const variables = piece.split(" ");

            for (const variable of variables) {
              console.log(variable);

              className = getVariableClassName(variable);
              items.push(
                <span className={className} key={`code-${j}`}>
                  {piece}
                </span>
              );
            }
          }
 */
