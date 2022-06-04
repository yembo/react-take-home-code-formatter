import { useState } from "react";
import { ENUMS, REGEXES } from "./constants";
import { getClassName, getVariables, getVariableClassName } from "./helpers";

import "./App.css";

function App() {
  const [showFormatted, setShowFormatted] = useState(false);

  const lines: string[] = [
    "for (let i = 1; i <= 10; i++) {",
    "    console.log(`what is ${{i}}i${i}}   ${I}`);",
    "}",
  ];

  const formatCode = () => {
    setShowFormatted((prev) => !prev);
  };

  const renderUnformattedCode = () => {
    return lines.map((line, i) => (
      <div key={`line-${i}`} className="line">
        {line}
      </div>
    ));
  };

  const renderFormattedCode = () => {
    let key = crypto.randomUUID();

    return lines.map((line, i) => {
      const pieces = line.match(REGEXES) || [];
      let items: any[] = [];
      for (const piece of pieces) {
        key = crypto.randomUUID();
        let className = getClassName(piece);
        if (!className) {
          const variables = getVariables(piece) || [];
          if (variables && variables.length > 0) {
            for (const variable of variables) {
              className = getVariableClassName(variable);
              if (className) {
                items.push(
                  <span className={className} key={key}>
                    {variable}
                  </span>
                );
              } else {
                items.push(variable);
              }
            }
          } else {
            items.push(piece);
          }
        } else if (className === ENUMS.TEMPLATE_LITERAL) {
          // we split the string based on when we encounter ${variable}
          const parts = piece.split(/(?=\$\{+(\w+?)\}+)/g);
          let partToReplace = "";
          for (let index = 0; index < parts.length; index++) {
            console.log(`${index}\n`);

            let part = parts[index];
            // check if you can look ahead
            if (index < parts.length - 1) {
              const partAhead = parts[index + 1];
              const partRegExp = RegExp(String.raw`(?=\$\{+(${part})\}+)`);
              if (partRegExp.test(partAhead)) {
                partToReplace = part;
                console.log({ part, partToReplace });

                items.push(
                  <span className={ENUMS.TEMPLATE_LITERAL} key={key}>
                    {"${"}
                  </span>
                );
                items.push(
                  <span className={ENUMS.STRING} key={key}>
                    {part}
                  </span>
                );
                items.push(
                  <span className={ENUMS.TEMPLATE_LITERAL} key={key}>
                    {"}"}
                  </span>
                );
              } else {
                let replaceRegExp = RegExp(
                  String.raw`(\$\{+(${partToReplace.trim()})\}+)`
                );
                part = part.replace(replaceRegExp, "");
                items.push(
                  <span className={ENUMS.TEMPLATE_LITERAL} key={key}>
                    {part}
                  </span>
                );
                partToReplace = "";
              }
            } else {
              console.log(part);
            }
          }
        } else {
          items.push(
            <span className={className} key={key}>
              {piece}
            </span>
          );
        }
      }
      // }

      return (
        <div key={key} className="line">
          {items}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <div className="code-wrap">
        <div className="column">
          <h1>Code</h1>
          {renderUnformattedCode()}
        </div>
        <div className="column">
          <button onClick={formatCode}>
            {showFormatted ? "Remove Formatting" : "Format Code"}
          </button>
        </div>
        <div className="column">
          <h1>{showFormatted ? "Formatted" : "Unformatted"}</h1>
          {showFormatted ? renderFormattedCode() : renderUnformattedCode()}
        </div>
      </div>
    </div>
  );
}

export default App;
