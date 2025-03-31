import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import ShareCodeButton from "./ShareCodeButton";

// Monaco editor theme mapping
const getMonacoTheme = (aceTheme: string): string => {
  const themeMap: Record<string, string> = {
    "monokai": "vs-dark",
    "cobalt": "vs-dark",
    "tomorrow_night_blue": "vs-dark",
    "dracula": "vs-dark",
    "gob": "vs-dark",
    "xcode": "vs-light",
    "terminal": "vs-dark",
    "nord_dark": "vs-dark",
  };

  return themeMap[aceTheme] || "vs-dark";
};

// Monaco language mapping
const getMonacoLanguage = (aceMode: string): string => {
  const modeMap: Record<string, string> = {
    "javascript": "javascript",
    "markdown": "markdown",
    "python": "python",
    "java": "java",
    "c_cpp": "cpp",
    "csharp": "csharp",
    "ruby": "ruby",
    "swift": "swift",
    "typescript": "typescript",
    "php": "php",
    "kotlin": "kotlin",
    "rust": "rust",
  };

  return modeMap[aceMode] || aceMode;
};

const EditorComponent: React.FC<any> = ({
  name,
  height = "85vh",
  fontSize,
  currentTheme,
  width = "100%",
  readOnly,
  showNumberLines,
  mode = "javascript",
  placeholder = "",
  value = "",
  handleOnChange,
}) => {
  // State to track editor value
  const [editorValue, setEditorValue] = useState(value);
  const editorRef = useRef(null);
  
  // Update local state when external value changes
  useEffect(() => {
    setEditorValue(value);
  }, [value]);
  
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };
  
  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setEditorValue(newValue);
      if (handleOnChange) handleOnChange(newValue);
    }
  };
  
  // Enhanced editor classes with rounded corners and shadow
  const editorClasses = "code-editor-overlay rounded-md overflow-hidden w-full h-full shadow-4xl";
  
  return (
    <div className={editorClasses} style={{ position: "relative", width, height }}>
      {!readOnly && (
        <div className="editor-actions">
          <ShareCodeButton code={editorValue} language={mode} />
        </div>
      )}
      <Editor
        height={height}
        width={width}
        language={getMonacoLanguage(mode)}
        value={editorValue}
        theme={getMonacoTheme(currentTheme)}
        defaultValue={placeholder}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly: readOnly,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: fontSize || 12,
          fontFamily: "'IBM Plex Sans', 'Menlo', 'Monaco', 'Courier New', monospace",
          tabSize: 2,
          automaticLayout: true,
          wordWrap: "on",
          lineNumbers: showNumberLines ? "on" : "off",
          glyphMargin: showNumberLines,
          folding: true,
          lineDecorationsWidth: 10,
          bracketPairColorization: { enabled: true },
          renderLineHighlight: "all",
          contextmenu: true,
          lineHeight: 1.4,
          scrollbar: {
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          }
        }}
      />
    </div>
  );
};

export default EditorComponent;

// Editor Themes Array remains unchanged
export const EditorThemes = [
  {
    theme: "monokai",
    name: "Monokai",
  },
  {
    theme: "cobalt",
    name: "Cobalt",
  },
  {
    theme: "tomorrow_night_blue",
    name: "Night Blue",
  },
  {
    theme: "dracula",
    name: "Dracula",
  },
  {
    theme: "gob",
    name: "Gob",
  },
  {
    theme: "xcode",
    name: "Xcode",
  },
  {
    theme: "terminal",
    name: "Terminal",
  },
  {
    theme: "nord_dark",
    name: "Nord Dark",
  },
];
