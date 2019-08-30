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

## Google Summer of Code 2019
This repository was made for [Google Summer of Code](https://summerofcode.withgoogle.com/ "Google Summer of Code - Home") 2019 for the project [MiCM Project Match](https://summerofcode.withgoogle.com/projects/#6634545296703488 "Project Description") under [Canadian Center for Computational Genomics](https://summerofcode.withgoogle.com/organizations/5303751997390848/ "Organization page").

### Work Done
The final commit as part of the Google Summer of Code 2019 program is [30e1e2a](https://github.com/pranavtharoor/micm-project-match/commit/30e1e2aebbb49c78bcbf830e4d27f279c6a591f0). All commits done before this (on and before Aug 26, 2019) was done as part of the program.

### Work Left
Any remaining work has been detailed in the [issues page](https://github.com/pranavtharoor/micm-project-match/issues "Issues Page") of this repository. Remaining work mainly comprises of small bug fixes.
