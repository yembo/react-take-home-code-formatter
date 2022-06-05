import { Fragment, useState } from "react";
import { getPiecesRegex } from "./utilities/helpers";

import "./App.css";
import Highlighter from "./components/Highlighter";

function App() {
  const lines: string[] = [
    "for (var iiii = 1; i <= 10; i++) {",
    "    console.log(`Pass number ${a}`);",
    "}",
  ];
  return <Highlighter lines={lines} />;
}

export default App;
