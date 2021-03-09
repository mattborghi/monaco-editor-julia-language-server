# Monaco Editor with Julia Language Server

## About

This repository has an example of how to connect [Monaco Editor](https://microsoft.github.io/monaco-editor/) with [`Julia Language Server`](https://github.com/julia-vscode/LanguageServer.jl). 

## Quick instructions

1. Change the `server/.env` file with your directories for

    - `PROJECT_PATH`: path where the project toml is.
    - `SERVER_FILE`: location of server.jl file.
    - `SOURCE_PATH`: path of your Project.toml.
    - `DEPOT_PATH`: I suggest to leave it empty.
    - `STORE_PATH`: where the indexed packages will be stored.

2. As the cache folder is not commited, create it

```bash
mkdir server/cache
```

3. Run the `Julia Language Server`

```sh
cd server
npm run prepare
npm run start
```

4. Run the client

```bash
cd client
npm run start:dev
```

> You can also run the script `RUN.dev.sh`.

## Resources

- [monaco-languageclient](https://github.com/TypeFox/monaco-languageclient).