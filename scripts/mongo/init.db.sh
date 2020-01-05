mongo -- "crimemapdb" <<EOF
  const rootUser = '$MONGO_INITDB_ROOT_USERNAME';
  const rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
  const user = 'crimemap';
  const passwd = 'crimemappwd';
  const database = 'crimemapdb';
  const testDatabase = 'crimemapdb_test';

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
