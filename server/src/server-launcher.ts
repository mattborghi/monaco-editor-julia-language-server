/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as path from "path";
import * as rpc from "vscode-ws-jsonrpc";
import * as server from "vscode-ws-jsonrpc/lib/server";
import * as lsp from "vscode-languageserver";

export function launch(socket: rpc.IWebSocket) {
  const reader = new rpc.WebSocketMessageReader(socket);
  const writer = new rpc.WebSocketMessageWriter(socket);
  // start the language server as an external process
  const extJsonServerPathFile = path.resolve(__dirname, "server.jl");
  const extJsonServerPath = path.resolve(__dirname);
  const SrcPath = "/home/borghi/.julia/environments/v1.5";
  // "/home/borghi/Desktop/umc/monaco-editor-julia-language-server/server/lib"; //path.resolve(__dirname, "code");
  const DepotPath = ""; //"/home/borghi/.julia/packages";
  const StorePath =
    "/home/borghi/Desktop/umc/monaco-editor-julia-language-server/server/cache";
  const socketConnection = server.createConnection(reader, writer, () =>
    socket.dispose()
  );
  console.log([
    `--project=${extJsonServerPath}`,
    extJsonServerPathFile,
    SrcPath,
    DepotPath,
    StorePath,
  ]);
  const serverConnection = server.createServerProcess("JULIA", "julia", [
    `--project=${extJsonServerPath}`,
    extJsonServerPathFile,
    SrcPath,
    DepotPath,
    StorePath,
  ]);

  server.forward(socketConnection, serverConnection, (message) => {
    if (rpc.isRequestMessage(message)) {
      if (message.method === lsp.InitializeRequest.type.method) {
        const initializeParams = message.params as lsp.InitializeParams;
        initializeParams.processId = process.pid;
      }
    }
    return message;
  });
}
