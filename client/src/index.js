import React from "react";
import ReactDOM from "react-dom";
const monaco = require("monaco-editor/esm/vs/editor/editor.api");

import "setimmediate";
import "./styles/main.scss";

// Connect Monaco Editors to Julia Language Servers
import { JuliaClient } from "./components/MonacoEditor/LanguageServer.jsx";
JuliaClient()

import MonacoEditor from "./components/MonacoEditor/MonacoEditor.jsx";
import GitHub from "./components/GitHub/Github.jsx";

ReactDOM.render(
    <>
        <MonacoEditor />
        <GitHub />
    </>,
    document.getElementById("root")
);