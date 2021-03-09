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

## Docker 

In the root folder

### Client

```sh
docker build -t client client/
docker run -it -p 8080:8080 client
```

### Server

```sh
docker build -t server -f server/buster.Dockerfile server/
docker run -it -p 3000:3000 server
```

### Compose

Instead, we can run both docker with one command using `docker compose` as follows.

```sh
docker-compose up --build
```

Open the project at `http://localhost:8080/`.

## Resources

- [monaco-languageclient](https://github.com/TypeFox/monaco-languageclient).