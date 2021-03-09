import React from "react";
import ReactDOM from "react-dom";
const monaco = require("monaco-editor/esm/vs/editor/editor.api");

import "setimmediate";
import "./styles/main.scss";

// Connect Monaco Editors to Julia Language Servers
import { JuliaClient } from "./LanguageServer.jsx"
JuliaClient()

import MonacoEditor from "./MonacoEditor.jsx";
ReactDOM.render(
    <MonacoEditor />,
    document.getElementById("root")
);