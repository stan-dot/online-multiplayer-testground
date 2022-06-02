#!/bin/bash
cd app/server
nodemon src/server.ts &
cd ../client
npm start