// import { useState } from "react";
import Analyzer from "./components/Analyzer";
import "./App.css";

function App() {
  const defaultLines: string[] = [
    "for (var iiii = 1; i <= 10; i++) {",
    "    console.log(`Pass number ${a}`);",
    "}",
  ];
  // const [lines /*setLines*/] = useState(defaultLines);

  return (
    <main className="App">
      <Analyzer lines={defaultLines} />
    </main>
  );
}

export default App;
