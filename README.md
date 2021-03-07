# Monaco Editor with Julia Language Server

## Getting started

### About

This package is intented for connecting [Monaco Editor](https://microsoft.github.io/monaco-editor/) to Julia [Language Server](https://github.com/julia-vscode/LanguageServer.jl). This first implementation is based on [this](https://github.com/TypeFox/monaco-languageclient) repo.

### Quick instructions

> Actually, the first step is **NOT** necessary as it's run there.

1. Run the Julia Language Server

```sh
cd server/src/julia
julia --project="." server.jl jl ~/home/<user>/.julia/packages
```

2. As the cache folder is not commited, create it

```bash
mkdir server/cache
```

3. Change the `.env` file with your directories for

    - `PROJECT_PATH`: path where the project toml is.
    - `SERVER_FILE`: location of server.jl file.
    - `SOURCE_PATH`: path of your Project.toml.
    - `DEPOT_PATH`: I suggest to leave it empty.
    - `STORE_PATH`: where the indexed packages will be stored.

4. Run the following on the terminal

```bash
cd server
npm install
npm run build or npm run prepare
npm run start
```

After staring the express server go to http://localhost:3000 to open the sample page.