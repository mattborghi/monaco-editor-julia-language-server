import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";

// TODO: Import other themes and let the user choose them 

// Use theme as theme: 'monokai'
// import('monaco-themes/themes/Monokai.json')
//     .then(data => {
//         monaco.editor.defineTheme('monokai', data);
//     })

const CodeEditor = () => {
    const editor = useRef(null);
    const element = useRef(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (element.current) {
            editor.current = monaco.editor.create(element.current, {
                model: monaco.editor.createModel(value, "julia"),
                glyphMargin: true,
                lightbulb: {
                    enabled: true,
                },
                scrollBeyondLastLine: false,
                // theme,
                theme: "vs-dark",
                minimap: {
                    enabled: false,
                },
                wordWrap: "on",
            });

            editor.current.onDidChangeModelContent(_.debounce(() => {
                if (editor.current) {
                    const myval = editor.current.getValue()
                    setValue(myval)
                }
            }, 100))
        }

        return () => editor.current
    }, []);

    return <div ref={element} style={{ width: '100%', height: '100%' }} />;
};

export default CodeEditor;
