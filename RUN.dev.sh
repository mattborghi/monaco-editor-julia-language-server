#!/bin/bash

# Run Client
gnome-terminal --tab --title="Client" -- bash -c "cd client; npm run start:dev"

# Run Julia Language Server
gnome-terminal --tab --title="Julia Language Server" -- bash -c "fuser -k 3000/tcp; cd server; npm run prepare; npm run start"
