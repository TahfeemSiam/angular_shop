class User {
  constructor(username, email, password, user_role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.user_role = user_role;
  }
}

module.exports = User;
