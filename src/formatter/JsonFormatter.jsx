import React, { useState, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import "./styles/JsonFormatter.css";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const monaco = useMonaco();
  const inputEditorRef = useRef(null);
  const debounceTimer = useRef(null);

  // Debounced live validation
  const handleInputChange = (value) => {
    setInput(value || "");
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      try {
        JSON.parse(value || "");
        clearMarkers();
      } catch (err) {
        highlightError(err, value || "");
      }
    }, 300);
  };

  const beautifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      let formatted = JSON.stringify(parsed, null, 2).trim();
      setOutput(formatted);
      clearMarkers();
    } catch (err) {
      highlightError(err, input);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      let formatted = JSON.stringify(parsed).trim();
      setOutput(formatted);
      clearMarkers();
    } catch (err) {
      highlightError(err, input);
    }
  };

  // Copy to clipboard
  const copyInput = async () => {
    try {
      await navigator.clipboard.writeText(input);
      alert("Input JSON copied!");
    } catch {
      alert("Failed to copy input.");
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("Output JSON copied!");
    } catch {
      alert("Failed to copy output.");
    }
  };

  // Highlight JSON parse errors inline
  const highlightError = (err, text) => {
    if (!monaco || !inputEditorRef.current) return;
    const model = inputEditorRef.current.getModel();

    const match = err.message.match(/position (\d+)/);
    let pos = match ? parseInt(match[1], 10) : 0;

    let line = 1, column = 1;
    for (let i = 0; i < pos && i < text.length; i++) {
      if (text[i] === "\n") {
        line++;
        column = 1;
      } else {
        column++;
      }
    }

    monaco.editor.setModelMarkers(model, "json", [
      {
        startLineNumber: line,
        startColumn: column,
        endLineNumber: line,
        endColumn: column + 1,
        message: err.message,
        severity: monaco.MarkerSeverity.Error,
      },
    ]);
  };

  const clearMarkers = () => {
    if (!monaco || !inputEditorRef.current) return;
    const model = inputEditorRef.current.getModel();
    monaco.editor.setModelMarkers(model, "json", []);
  };

  const editorOptions = {
    lineNumbers: "on",
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: "on",
    wordWrapColumn: 0,
    wrappingIndent: "same",
  };

  return (
    <div className="container">
      {/* Column 1: Input */}
      <div className="column input-area">
        <div className="toolbar">
          <span>Input JSON</span>
          <button onClick={copyInput}>📋 Copy</button>
        </div>
        <Editor
          height="100%"
          defaultLanguage="json"
          value={input}
          onChange={handleInputChange}
          options={editorOptions}
          onMount={(editor) => (inputEditorRef.current = editor)}
        />
      </div>

      {/* Column 2: Buttons */}
      <div className="column button-area">
        <button onClick={beautifyJson}>Beautify</button>
        <button onClick={minifyJson}>Minify</button>
      </div>

      {/* Column 3: Output */}
      <div className="column output-area">
        <div className="toolbar">
          <span>Output JSON</span>
          <button onClick={copyOutput}>📋 Copy</button>
        </div>
        <Editor
          height="100%"
          defaultLanguage="json"
          value={output}
          onChange={(value) => setOutput(value || "")}
          options={editorOptions}
        />
      </div>
    </div>
  );
}

export default JsonFormatter;