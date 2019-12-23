mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  const rootUser = '$MONGO_INITDB_ROOT_USERNAME';
  const rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
  const user = '$MONGO_INITDB_USERNAME';
  const passwd = '$MONGO_INITDB_PASSWORD';
  const database = '$MONGO_INITDB_DATABASE';
  const testDatabase = '$MONGO_INITDB_TEST_DATABASE';

  const roles = [
    {role: 'dbOwner', db: database}
  ]

  const admindb = db.getSiblingDB('admin');
  admindb.auth(rootUser, rootPassword);

  db.createUser({
    user: user, pwd: passwd,
    roles
  });

  if (testDatabase != '') {
    roles.push({role: 'dbOwner', db: testDatabase});

    const testdb = db.getSiblingDB(testDatabase);
    testdb.createUser({
      user: user, pwd: passwd,
      roles
    });
  }
EOF
