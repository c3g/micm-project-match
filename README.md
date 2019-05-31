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

## Installation - Development
### Database
From the project root follow this build the database.
```
createdb micm
psql -d micm -f db/sql-scripts/01_build.sql
```
### Backend
To configure the server, copy `api/.env.example` to `api/.env` and
modify the variables. From project root, follow this to start the node server.
```
cd api
npm install
npm start
```
### Frontend
From project root, follow this to start webpack-dev-server.
```
cd web
npm install
npm start
```

## Installation - Production
### Database
From the project root follow this build the database.
```
createdb micm
psql -d micm -f db/sql-scripts/01_build.sql
```
### Backend
To configure the server, copy `api/.env.example` to `api/.env` and
modify the variables. From project root, follow this to start the node server.
```
cd api
npm install
npm run build
npm run serve
```
### Frontend
From project root, follow this to start webpack-dev-server.
```
cd web
npm install
npm run build
```

## Installation - Docker
From the project root follow this to run the project with docker.
```
docker-compose up
```
