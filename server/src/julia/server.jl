# Usage:
#   julia --project=path/to/folder path/to/folder/server.jl [SOURCE_PATH] [DEPOT_PATH] [STORE_PATH]

# Get the source path. In order of increasing priority:
# - default value:  pwd()
# - command-line:   ARGS[1]
src_path = length(ARGS) ≥ 1 ? ARGS[1] : pwd()

# Get the depot path. In order of increasing priority:
# - default value:  ""
# - environment:    ENV["JULIA_DEPOT_PATH"]
# - command-line:   ARGS[2]
depot_path = get(ENV, "JULIA_DEPOT_PATH", "")
if length(ARGS) >= 2
    depot_path = ARGS[2]
end

# Get the project environment from the source path
project_path = something(Base.current_project(src_path), Base.load_path_expand(LOAD_PATH[2])) |> dirname

# Get the store path. In order of increasing priority:
# - default value:  nothing
# - command-line:   ARGS[3]
symserver_store_path = length(ARGS) ≥ 3 ? ARGS[3] : nothing

if !isnothing(symserver_store_path)
    # If we don't use an absolute path the server hangs on indexing..
    # Check if the directoy exists before...
    if !isdir(symserver_store_path)
        @info "Creating Directory: " * symserver_store_path * " for storing cache data"
        mkdir(symserver_store_path)
    end

    symserver_store_path = abspath(joinpath(@__DIR__, "..", symserver_store_path))
end

# Make sure that we only load packages from this environment specifically.
# empty!(LOAD_PATH)
# push!(LOAD_PATH, "@")
# push!(LOAD_PATH, "~/home/borghi/Desktop/umc/UniversalMonteCarlo.jl")
# @show LOAD_PATH

import Pkg
Pkg.instantiate()

using LanguageServer, SymbolServer

function err_handler(err, bt)
    @info "There was an error"
    @info err
end

@info "Running language server" env = Base.load_path()[1] src_path project_path depot_path symserver_store_path
server = LanguageServerInstance(stdin, stdout, project_path, depot_path, err_handler, symserver_store_path)
server.runlinter = true
run(server)

