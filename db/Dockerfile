FROM postgres

ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG NO_PROXY

COPY ./db/sql-scripts/ /docker-entrypoint-initdb.d/
