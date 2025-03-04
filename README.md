# CTF427
- by Mars Ponce & Haashir Khan

_This repository holds the vulnerable "hacker forum" that will be used in the week 8 CTF lab_

## Setup

- Ensure that a PostgreSQL server is available and running
- Enter it's values into `.env` (see `.env.example`)
- To run the site, there are two options:
    - Dockerized:
        - create the container with:
```bash
docker build -t ctf-427 .
```
        - run the container and make sure to expose the relevant ports:
```
docker run -d --restart unless-stopped --env-file .env -p 3000:3000 --name hacker-forum ctf-427
```
    - Normal:
