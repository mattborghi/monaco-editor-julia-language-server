// Methods to connect to Language Servers
import { listen } from "vscode-ws-jsonrpc";

import normalizeUrl from "normalize-url";
import ReconnectingWebSocket from "reconnecting-websocket";
import {
    CloseAction,
    createConnection,
    ErrorAction,
    MonacoLanguageClient,
    MonacoServices
} from "monaco-languageclient";


function createLanguageClient(connection) {
    return new MonacoLanguageClient({
        name: "Julia Language Client",
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


function createUrl(path) {
    const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
    const HOST = 'localhost';
    const PORT = '3000';
    return normalizeUrl(`${protocol}://${HOST}:${PORT}${path}`);
}

function createWebSocket(url) {
    const socketOptions = {
        maxReconnectionDelay: 10000,
        minReconnectionDelay: 1000,
        reconnectionDelayGrowFactor: 1.3,
        connectionTimeout: 10000,
        maxRetries: Infinity,
        debug: false,
    };
    return new ReconnectingWebSocket(url, undefined, socketOptions);
}

export const JuliaClient = () => {
    MonacoServices.install(
        require("monaco-editor-core/esm/vs/platform/commands/common/commands")
            .CommandsRegistry
    );
    // MonacoServices.install(monaco);

    // create the web socket
    const url = createUrl("/JuliaLanguageServer");
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

    return null
}