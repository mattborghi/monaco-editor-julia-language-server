# Monaco Editor with Julia Language Server

## Getting started

### About

This package is intented for connecting [Monaco Editor](https://microsoft.github.io/monaco-editor/) to Julia [Language Server](https://github.com/julia-vscode/LanguageServer.jl). This first implementation is based on [this](https://github.com/TypeFox/monaco-languageclient) repo.

### Quick instructions

> Actually, the first step is not necessary as it's run there.

1. Run the Julia Language Server

```sh
cd server/src/julia
julia --project="." server.jl jl ~/home/<user>/.julia/packages
```

2. As the cache folder is not commited, create it

```bash
mkdir server/cache
```

3. Run the following on the terminal

```bash
git clone https://github.com/mattborghi/monaco-editor-julia-language-server
cd server
npm install
npm run build or npm run prepare
npm run start
```

After staring the express server go to http://localhost:3000 to open the sample page.