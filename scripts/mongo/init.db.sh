mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  let rootUser = '$MONGO_INITDB_ROOT_USERNAME';
  let rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
  let admin = db.getSiblingDB('admin');
  let admin.auth(rootUser, rootPassword);

  let user = '$MONGO_INITDB_USERNAME';
  let passwd = '$MONGO_INITDB_PASSWORD';
  let database = '$MONGO_INITDB_DATABASE';

  db.createUser({
    user: user, pwd: passwd,
    roles: [
      {role: 'dbAdmin', db: database}
    ]
  });
EOF
