import { useState } from "react";
import Formatter from "./components/Formatter";
import "./App.css";

function App() {
  const defaultLines: string[] = [
    "for (var iiii = 1; i <= 10; i++) {",
    "    console.log(`Pass number ${a}`);",
    "}",
  ];
  const [lines /*setLines*/] = useState(defaultLines);

  return (
    <main className="App">
      <Formatter lines={lines} />
    </main>
  );
}

export default App;
