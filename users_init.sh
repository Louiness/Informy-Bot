#!/bin/bash
set -e

echo ">>>>>>> trying to create database and users"
if \
[ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && \
[ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && \
[ -n "${PRD_DATABASE:-}" ] && \
[ -n "${PRD_USERNAME:-}" ] && \
[ -n "${PRD_PASSWORD:-}" ]; then
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
db=db.getSiblingDB('$PRD_DATABASE');
use $PRD_DATABASE;
db.createUser({
  user: '$PRD_USERNAME',
  pwd: '$PRD_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$PRD_DATABASE'
  }]
});
EOF
else
    echo "Not exists environment variables..."
    exit 403
fi

