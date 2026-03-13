import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { foldCode, foldable, unfoldAll } from "@codemirror/language";
import { EditorSelection } from "@codemirror/state";


// ✅ Custom light theme with blue + black
const blueBlackTheme = EditorView.theme({
  "&": {
    backgroundColor: "#f0f8ff", // light blue background
    color: "#000000",           // black text
    height: "100%",             // full height
  },
  ".cm-content": {
    fontFamily: "monospace",
  },
  ".cm-gutters": {
    backgroundColor: "#e6f2ff", // lighter blue gutter
    color: "#000000",
    borderRight: "1px solid #ccc",
  }
}, { dark: false });

function collapseAllDeep(view) {
  const { state } = view;
  // Collect all foldable ranges
  const ranges = [];
  for (let pos = 0; pos < state.doc.length; pos++) {
    const range = foldable(state, pos);
    if (range) {
      ranges.push(range);
      // Move past this block so we don’t get stuck
      pos = range.to;
    }
  }
  // Fold each range
  ranges.forEach(range => foldCode(view, range.from));
}

function expandAllDeep(view) {
  unfoldAll(view);
}



function JsonEditorApp() {
  const [jsonText, setJsonText] = useState("{\n  \"example\": true\n}");
  const editorRef = useRef(null);

  const beautifyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch {
      alert("Invalid JSON");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed));
    } catch {
      alert("Invalid JSON");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonText);
  };

  const downloadJson = () => {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      {/* Toolbar */}
      <div style={{ background: "#eee", padding: "8px", display: "flex", gap: "10px" }}>
        <button onClick={beautifyJson}>Beautify</button>
        <button onClick={minifyJson}>Minify</button>
        <button onClick={() => collapseAllDeep(editorRef.current)}>Collapse All</button>
        <button onClick={() => expandAllDeep(editorRef.current)}>Expand All</button>
        <button onClick={copyToClipboard}>Copy</button>
        <button onClick={downloadJson}>Download</button>
      </div>

      <div style={{ flexGrow: 1 }}>
        <CodeMirror
          value={jsonText}
          height="100%"
          width="100%"
          theme={blueBlackTheme}   // ✅ custom theme applied
          extensions={[json(), EditorView.lineWrapping]}
          onChange={(value) => setJsonText(value)}
          onCreateEditor={(view) => { editorRef.current = view; }} // ✅ capture editor view
        />
      </div>
    </div>
  );
}

export default JsonEditorApp;