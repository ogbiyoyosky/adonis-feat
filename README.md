# Adonis Feat

## Index

- [Introduction](#introduction)
- [Layers](#layers)
  - [Domains](#domains)
  - [Features](#feature)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Command](#command)

## Introduction


### What is Adonis Feat?

Adonis Feat is a software development paradigm for maintaining a scalable application architecture. Writing code is fun. _Writing code is easy_&mdash;writing code that will not muck up the codebase, pile technical debt and is reusable&mdash;not so much.

With Adonis Feat, we attempt to solve these problems. We abstract all business code into a single layer of features for and applicaion with a specific domain.

#### Domains

We have a concept of domains. Typically, most tasks critical to applications fall into a set of domains. A regular e-commerce application may contain the following domains:

- `User` domain: Where all code concerning user management is housed.
- `Order` domain: May contain code that creates a new order, logs order information, notifies third parties e.t.c

#### Services

Adonis Feat promotes a single responsibility architecture as we may think of our applications as being comprised of multiple small services as opposed to a single monolithic entity. Typically we could have services such as an API service that exposes a REST API or an Auth service that is especially handy for Single Sign On (SSO) architectures.

Services contain nearly everything that comes with a barebones Adonis installation as well as some new stuff we'll be introducing.



#### Feature

Features are usually what make up our applications. Usually, in many applications we have features such as search profiles feature, or login feature. Features are used by controllers in our Service layer.

Below is an example Feature class.

```js
use strict'
const User = use('App/Models/User')
const Config = use('Config')


class LoginUserFeature {
  constructor(request, response, auth) {
    this.request = request
    this.response = response
    this.auth = auth
  }

  async login() {
    try {
      const {
        email,
        password
      } = this.request.all()

      const user = await User.query()
        .where('email', email)
        .first()

      let token
      if (user.is_activated_at != null) {

        if (user.is_ban) {
          return this.response.status(400).send({
            message: 'User ban please contact th admin',
            status_code: 400,
            status: 'fail'
          })
        }
        token = await this.auth.withRefreshToken()
          .attempt(email, password)

        const authConfig = Config.get('auth')
        const { expiresIn } = authConfig.jwt.options
        token.expiresIn = expiresIn


        return this.response.status(200).send({
          message: 'Login Successful',
          status: "Success",
          status_code: 200,
          result: token
        })
      } else {
        return this.response.status(400).send({
          message: 'User was either not found or has been deactivated by the Admin',
          status_code: 400,
          status: 'fail'
        })
      }
    } catch (error) {
      console.log('Login Error -> ', error);
      return this.response.status(400).send({
        status: 'fail',
        status_code: 400,
        message: 'Email Or Password Incorrect'
      })
    }
  }

}
module.exports = LoginUserFeature
```

## Installation

Simply run this command to install the Adoni package into the project.

```bash
npm i adonis-feat@latest
```



## Getting Started

We'll demo a sample application now. We'll be building an Adonis  application that requires us to be able to login, we will create a feature called LoginUserFeature in the Authentication Module
First of all, run this command to install the global Adonis Hexa project scaffold.


```javascript
const aceProviders = [
  'adonis-feat/providers/AdonisFeatProvider'
];
```
## Command

create a controller and add a method for the route to use then call the method on the feature class.

```js
'strict'

const LoginUserFeature = use('App/Controllers/Features/LoginUserFeature')


class AuthController {


    loginUser({
        request,
        response,
        auth
    }) {
        return new LoginUserFeature(request, response, auth).login()
    }

    
}

module.exports = AuthController



```

```bash
e.g adonis make:feature Domain/Feature
adonis make:feature AuthenticationModule/LoginUserFeature
```




## Contributing

Contributions are welcome! Check out the [issues](https://github.com/ogbiyoyosky/adonis-feat/issues) or the [PRs](https://github.com/ogbiyoyosky/adonis-feat/pull-requests), and make your own if you want something that you don't see there.

## License

[GPLv3.0](https://github.com/ogbiyoyosky/adonis-feat)
