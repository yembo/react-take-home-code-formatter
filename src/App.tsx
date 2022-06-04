import { useState } from "react";
import { getPiecesRegex } from "./helpers";

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
    return lines.map((line, i) => {
      const pieces = getPiecesRegex(line);

      return (
        <div key={i} className="line">
          {pieces.map((piece, i) => {
            if (piece.className)
              return (
                <span className={piece.className} key={i}>
                  {piece.value}
                </span>
              );
            else return piece.value;
          })}
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
