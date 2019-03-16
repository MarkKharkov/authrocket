const Action = require ('./classes/Action');

class Realms extends Action {
  constructor (actionData) {
    super('realms', actionData)
  }

  reset (resetOptions){
    return this.request.post(this.url + '/reset', resetOptions)
        .then(res => res.error ? Promise.reject(res.error) : res)
  }
}

class Users extends Action {
  constructor (actionData) {
    super('users', actionData)
  }

  generatePasswordToken (newData){
    return this.request.post(this.url + '/generate_password_token', newData)
      .then(res => res.error ? Promise.reject(res.error) : res)
  }

  resetPasswordWithToken(newData){
    return this.request.post(this.url + '/reset_password_with_token', newData)
      .then(res => res.error ? Promise.reject(res.error) : res)
  }
}

class Credentials extends Action {
  constructor (actionData) {
    super('credentials', actionData)
  }
}

class SignupTokens extends Action {
  constructor (actionData) {
    super('signup_tokens', actionData)
  }
}

class Orgs extends Action {
  constructor (actionData) {
    super('orgs', actionData)
  }
}

class Memberships extends Action {
  constructor (actionData) {
    super('memberships', actionData)
  }
}

class AuthProviders extends Action {
  constructor (actionData) {
    super('auth_providers', actionData)
  }
}

class ConnectedApps extends Action {
  constructor (actionData) {
    super('login_policies', actionData)
  }
}

class Hooks extends Action {
  constructor (actionData) {
    super('app_hooks', actionData)
  }
}

class Sessions extends Action {
  constructor (actionData) {
    super('sessions', actionData)
  }

  /**
   * Throws a error, because sessions don't have a update endpoint.
   * @param updateData
   */
  update (updateData) {
    throw new Error('jwt_keys don\'t have a update endpoint!');
  }
}

class Events extends Action {
  constructor (actionData) {
    super('events', actionData)
  }
}

class Notifications extends Action {
  constructor (actionData) {
    super('notifications', actionData)
  }
}

class JwtKeys extends Action {
  constructor (actionData) {
    super('jwt_keys', actionData)
  }

  /**
   * Throws a error, because jwt_keys don't have a update endpoint.
   * @param updateData
   */
  update (updateData) {
    throw new Error('jwt_keys don\'t have a update endpoint!');
  }
}

module.exports = {
  Realms,
  Users,
  Credentials,
  SignupTokens,
  Orgs,
  Memberships,
  AuthProviders,
  ConnectedApps,
  Hooks,
  Sessions,
  Events,
  Notifications,
  JwtKeys
};
