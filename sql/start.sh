#!/bin/bash
# Launch a docker postgres container
docker run --name ctf_postgres -e POSTGRES_USER=ctf_user -e POSTGRES_PASSWORD=ctf_password -e POSTGRES_DB=ctf_db -p 5432:5432 -d postgres
