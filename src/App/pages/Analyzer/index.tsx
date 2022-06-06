import { useState } from "react";
import { getPiecesRegex, ModuleProps, MODULE_ENUMS } from "../../utilities";
import Dropdown from "../../components/Dropdown";

import "./index.css";

function Analyzer(props: ModuleProps) {
  const [showAnalysed, setShowAnalyzed] = useState(false);
  let [module, setModule] = useState(MODULE_ENUMS.syntax_highlighter);

  const { lines } = props;
  const handleChange = (event: any) => setModule(event.target.value);
  const options = Object.values(MODULE_ENUMS).map((option) => ({
    label: option.replace(/[-_]/, " "),
    value: option,
  }));

  const analyze = () => {
    setShowAnalyzed((prev) => !prev);
  };

  const renderUnanalyzed = () => {
    return lines.map((line, i) => (
      <div key={`unanalyzed-line-${i}`} className="line">
        {line}
      </div>
    ));
  };

  const renderAnalyzed = (module: string) => {
    return lines.map((line, lineIndex) => {
      if (module === MODULE_ENUMS.syntax_highlighter) {
        const pieces = getPiecesRegex(line);
        return (
          <>
            <div key={`syntax-highlighted-${lineIndex}`} className="line">
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
      }
      if (module === MODULE_ENUMS.minify) {
        line = line.trimEnd().trimStart();

        return (
          <div key={`minified-${lineIndex}`} className="line">
            {line.trimEnd().trimStart()}
          </div>
        );
      }
      return <div>Not Implemented yet.</div>;
    });
  };

  return (
    <div className="Analyzer">
      <div className="code-wrap">
        <div className="column" key="column-1">
          <h1>Code</h1>
          {renderUnanalyzed()}
        </div>
        <div className="column" key="column-2">
          <button data-testid="toggle-analyze" onClick={analyze}>
            {showAnalysed ? "Clear Analysis" : "Analyze"}
          </button>
          <Dropdown
            label="select a module to modify how the code is analyzed"
            options={options}
            value={module}
            onChange={handleChange}
          />
        </div>
        <div className="column" key="column-3">
          <h1>{showAnalysed ? "Analyzed" : "Unanalyzed"}</h1>
          {showAnalysed ? renderAnalyzed(module) : renderUnanalyzed()}
        </div>
      </div>
    </div>
  );
}

export default Analyzer;