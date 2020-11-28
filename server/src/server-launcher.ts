/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as rpc from "vscode-ws-jsonrpc";
import * as server from "vscode-ws-jsonrpc/lib/server";
import * as lsp from "vscode-languageserver";
require("dotenv").config();

export function launch(socket: rpc.IWebSocket) {
  const reader = new rpc.WebSocketMessageReader(socket);
  const writer = new rpc.WebSocketMessageWriter(socket);
  // start the language server as an external process
  const extJsonServerPathFile = process.env.SERVER_FILE!;
  const extJsonServerPath = process.env.PROJECT_PATH!;
  const SrcPath = process.env.SOURCE_PATH!;
  const DepotPath = process.env.DEPOT_PATH!;
  const StorePath = process.env.STORE_PATH!;
  const socketConnection = server.createConnection(reader, writer, () =>
    socket.dispose()
  );

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
