FROM mongo
# Environment variables for Initializing DB
# Mongodb Global variables
ENV MONGO_INITDB_ROOT_USERNAME 'admin'
ENV MONGO_INITDB_ROOT_PASSWORD 'password'

# Environment variables
ENV PRD_DATABASE 'users'
ENV PRD_USERNAME 'develop'
ENV PRD_PASSWORD 'develop!'

# Copy Initialize file
COPY ./users_init.sh /docker-entrypoint-initdb.d/

EXPOSE 27017
