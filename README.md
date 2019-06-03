# MiCM Project Match
In order to realize the potential of Computational Medicine at
McGill University, there is a need to better connect researchers
in life sciences and clinical domains with researchers and students
in the data sciences. The former has interesting datasets and
questions, while the latter can apply or develop quantitative
methods to look for solutions to these questions. MiCM Project Match
provides a database-driven, lightweight, open source web application
with the purpose of matching McGill research data projects, with
masters and doctoral students looking for interesting projects
to analyze.

## Built with
- Node
- Postgres
- React
- Redis

## Installation
To configure the api, copy `api/.env.example` to `api/.env` and modify the variables.
From the project root follow this to set up the database and run the project:
```
# setup database
createdb micm
psql -d micm -f db/sql-scripts/01_build.sql

# installs dependencies
npm install
```
For development run:
```
npm start
```
For production run:
```
npm run build
```

## Installation (Docker)
From the project root follow this to run the project with docker:
```
docker-compose up
```
