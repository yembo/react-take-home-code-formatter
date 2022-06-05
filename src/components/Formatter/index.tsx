import { useState } from "react";
import { getPiecesRegex, ModuleProps, MODULE_ENUMS } from "../../utilities";
import Dropdown from "../Dropdown";

import "./index.css";

function Formatter(props: ModuleProps) {
  const [showFormatted, setShowFormatted] = useState(false);
  const [module, setModule] = useState(MODULE_ENUMS.syntax_highlighter);

  const { lines } = props;
  const handleChange = (event: any) => {
    setModule(event.target.value);
  };
  const options = Object.values(MODULE_ENUMS).map((option) => ({
    label: option.replace(/[-_]/, " "),
    value: option,
  }));

  const formatCode = () => {
    setShowFormatted((prev) => !prev);
  };

  const renderUnformattedCode = () => {
    return lines.map((line, i) => (
      <div key={`unformatted-line-${i}`} className="line">
        {line}
      </div>
    ));
  };

  const renderFormattedCode = () => {
    return lines.map((line, lineIndex) => {
      const pieces = getPiecesRegex(line);
      return (
        <>
          <div key={`formatted-line-${lineIndex}`} className="line">
            {pieces.flat(2).map((piece, i) => {
              if (piece.className)
                return (
                  <span
                    className={piece.className}
                    data-testid={piece.testId}
                    key={`piece-${i}`}
                  >
                    {piece.value}
                  </span>
                );
              else return piece.value;
            })}
          </div>
        </>
      );
    });
  };

  return (
    <div className="Formatter">
      <div className="code-wrap">
        <div className="column" key="column-1">
          <h1>Code</h1>
          {renderUnformattedCode()}
        </div>
        <div className="column" key="column-2">
          <button data-testid="toggle-format" onClick={formatCode}>
            {showFormatted ? "Remove Formatting" : "Format Code"}
          </button>
          <Dropdown
            label="select a module to modify how the code is formatted"
            options={options}
            value={module}
            onChange={handleChange}
          />
        </div>
        <div className="column" key="column-3">
          <h1>{showFormatted ? "Formatted" : "Unformatted"}</h1>
          {showFormatted ? renderFormattedCode() : renderUnformattedCode()}
        </div>
      </div>
    </div>
  );
}

export default Formatter;
