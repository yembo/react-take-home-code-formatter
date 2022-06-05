import "./App.css";
import Highlighter from "./components/Highlighter";

function App() {
  const lines: string[] = [
    "for (var iiii = 1; i <= 10; i++) {",
    "    console.log(`Pass number ${a}`);",
    "}",
  ];
  return (
    <main className="App">
      <Highlighter lines={lines} />
    </main>
  );
}

export default App;
