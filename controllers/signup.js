const handleSignup = (req, res, db, bcrypt) => {
  const { email, name, password, passwordConfirm } = req.body;
  if (
    !email ||
    !name ||
    !password ||
    !passwordConfirm ||
    password !== passwordConfirm
  ) {
    return res.status(400).json("Incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash,
        email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return db("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("Unable to register"));
};

module.exports = {
  handleSignup
};
