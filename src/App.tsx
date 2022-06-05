import "./App.css";
import Highlighter from "./components/Highlighter";
import HighlighterV2 from "./components/HighlighterV2";

function App() {
  const lines: string[] = [
    "for (var iiii = 1; i <= 10; i++) {",
    "    console.log(`Pass number ${a}`);",
    "}",
  ];
  return (
    <main className="App">
      <Highlighter lines={lines} />
      {/* <HighlighterV2 /> */}
    </main>
  );
}

export default App;
