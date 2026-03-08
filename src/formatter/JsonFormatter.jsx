import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./styles/JsonFormatter.css";

function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const beautifyJson = () => {
        try {
            const parsed = JSON.parse(input);
            let formatted = JSON.stringify(parsed, null, 2);
            formatted = formatted.trim(); // remove extra newlines/spaces
            setOutput(formatted);
        } catch (err) {
            setOutput("Invalid JSON");
        }
    };

    const minifyJson = () => {
        try {
            const parsed = JSON.parse(input);
            let formatted = JSON.stringify(parsed);
            formatted = formatted.trim(); // remove trailing spaces/newlines
            setOutput(formatted);
        } catch (err) {
            setOutput("Invalid JSON");
        }
    };

    return (
        <div className="container">
            {/* Column 1: Input */}
            <div className="column input-area">
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={input}
                    onChange={(value) => setInput(value || "")}
                    options={{
                        lineNumbers: "on",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: "on",          // wrap long lines instead of scrolling
                        wordWrapColumn: 0,       // wrap at viewport width
                        wrappingIndent: "same",  // keep indent consistent when wrapping
                    }}
                />
            </div>

            {/* Column 2: Buttons */}
            <div className="column button-area">
                <button onClick={beautifyJson}>Beautify</button>
                <button onClick={minifyJson}>Minify</button>
            </div>

            {/* Column 3: Output */}
            <div className="column output-area">
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={output}
                    onChange={(value) => setOutput(value || "")}
                    options={{
                        lineNumbers: "on",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: "on",          // wrap long lines instead of scrolling
                        wordWrapColumn: 0,       // wrap at viewport width
                        wrappingIndent: "same",  // keep indent consistent when wrapping
                    }}
                />
            </div>
        </div>
    );
}

export default JsonFormatter;