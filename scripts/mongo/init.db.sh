mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  let rootUser = '$MONGO_INITDB_ROOT_USERNAME';
  let rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
  let user = '$MONGO_INITDB_USERNAME';
  let passwd = '$MONGO_INITDB_PASSWORD';
  let database = '$MONGO_INITDB_DATABASE';

  let crimemapdb = db.getSiblingDB(database);
  let crimemapdb.auth(rootUser, rootPassword);

  db.createUser({
    user: user, pwd: passwd,
    roles: [
      {role: 'dbOwner', db: database}
    ]
  });
EOF
