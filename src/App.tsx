import { useState } from "react";
import Formatter from "./components/Formatter";
import { MODULE_ENUMS } from "./utilities";
import "./App.css";

function App() {
  const defaultLines: string[] = [
    "for (var iiii = 1; i <= 10; i++) {",
    "    console.log(`Pass number ${a}`);",
    "}",
  ];
  const [lines /*setLines*/] = useState(defaultLines);
  const [options, setOptions] = useState([MODULE_ENUMS.syntax_highlighter]);

  const moduleProps = {
    lines,
    options,
  };
  return (
    <main className="App">
      <Formatter {...moduleProps} />
    </main>
  );
}

export default App;
