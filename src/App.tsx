import React, { useState } from 'react';
import './App.css';

function App() {
  const [showFormatted, setShowFormatted] = useState(false);

  const lines = ['for (let i = 1; i <= 10; i++) {', '    console.log(`Pass number ${i}`);', '}'];

  const formatCode = () => {
    setShowFormatted(prev => !prev);
  };

  const renderUnformattedCode = () => {
    return lines.map((line, i) => <div key={i} className='line'>{line}</div>);
  };

  const renderFormattedCode = () => {
    // TODO
    // Rules: All numbers red, All vars blue and bold, All reserved keywords bold, All string literals green
  };


  return (
    <div className="App">
      <div className='code-wrap'>
        <div className='column'>
          <h1>Code</h1>
          {renderUnformattedCode()}
        </div>
        <div className='column'>
          <button onClick={formatCode}>{showFormatted ? 'Remove Formatting' : 'Format Code'}</button>
        </div>
        <div className='column'>
          <h1>{showFormatted ? 'Formatted' : 'Unformatted'}</h1>
          {showFormatted ? renderFormattedCode() : renderUnformattedCode()}
        </div>
      </div>
    </div>
  );
}

export default App;
