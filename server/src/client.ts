/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { listen, MessageConnection } from "vscode-ws-jsonrpc";
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices,
  createConnection,
} from "monaco-languageclient";
import normalizeUrl = require("normalize-url");
const ReconnectingWebSocket = require("reconnecting-websocket");

// register Monaco languages
monaco.languages.register({
  id: "julia",
  extensions: [".jl"],
  aliases: ["julia", "jl", "Julia", "JULIA", "JL"],
});

// create Monaco editor
const value = `using Statistics

μ = mean([1,2,3])

function hello_world()
    println("hello world!")
end

hello_world()

`;

const editor = monaco.editor.create(document.getElementById("container")!, {
  model: monaco.editor.createModel(
    value,
    "julia",
    monaco.Uri.parse(
      "file:///home/borghi/Desktop/monaco-editor-julia-language-server/server/src/code/file.jl"
    )
  ), // 'inmemory://model.json'
  glyphMargin: true,
  theme: "vs-dark",
  lightbulb: {
    enabled: true,
  },
});

// install Monaco language client services
MonacoServices.install(editor, {
  rootUri:
    "file:///home/borghi/Desktop/monaco-editor-julia-language-server/server/src/code/",
});

// create the web socket
const url = createUrl("/sampleServer");
const webSocket = createWebSocket(url);
// listen when the web socket is opened
listen({
  webSocket,
  onConnection: (connection) => {
    // create and start the language client
    const languageClient = createLanguageClient(connection);
    const disposable = languageClient.start();
    connection.onClose(() => disposable.dispose());
  },
});

function createLanguageClient(
  connection: MessageConnection
): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name: "Sample Language Client",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ["julia"],
      // disable the default error handler
      errorHandler: {
        error: () => ErrorAction.Continue,
        closed: () => CloseAction.DoNotRestart,
      },
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: (errorHandler, closeHandler) => {
        return Promise.resolve(
          createConnection(connection, errorHandler, closeHandler)
        );
      },
    },
  });
}

function createUrl(path: string): string {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  return normalizeUrl(
    `${protocol}://${location.host}${location.pathname}${path}`
  );
}

function createWebSocket(url: string): WebSocket {
  const socketOptions = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: Infinity,
    debug: false,
  };
  return new ReconnectingWebSocket(url, [], socketOptions);
}
