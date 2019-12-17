/* eslint-env mongo */

db.createUser({
  user: "crimemap",
  pwd: "crimemappwd",
  roles: [
    {role: "dbAdmin", db: "crimemapdb"}
  ]
});
