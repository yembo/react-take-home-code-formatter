import Analyzer from "./components/Analyzer";
import "./App.css";

function App() {
  const defaultLines: string[] = [
    "for (var iiii = 1; i <= 10; i++) {",
    "    console.log(`Pass number ${a}`);",
    "}",
  ];

  return (
    <main className="App">
      <Analyzer lines={defaultLines} />
    </main>
  );
}

export default App;
