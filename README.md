# Adonis Feat

## Index

- [Introduction](#introduction)
- [Layers](#layers)
  - [Domains](#domains)
  - [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Command](#command)

## Introduction


### What is Adonis Feat?

Adonis Feat is a software development paradigm for maintaining a scalable application architecture. Writing code is fun. _Writing code is easy_&mdash;writing code that will not muck up the codebase, pile technical debt and is reusable&mdash;not so much.

With Adonis Feat, we attempt to solve these problems. We abstract all business code into a single layer of features for and applications with a specific domain.

#### Domains

We have a concept of domains. Typically, most tasks critical to applications fall into a set of domains. A regular e-commerce application may contain the following domains:

- `UserManagement` domain: Where all code concerning user management is housed.
- `Order` domain: May contain code that creates a new order, logs order information, notifies third parties e.t.c



#### Features

Features are usually what make up our applications. Usually, in many applications, we have features such as search profiles feature, or login feature. Features are used by controllers in our Service layer.

Below is an example Feature class.

```js
"use strict";

const BaseFeature = use("App/Features/BaseFeature");
const User = use("App/Models/User");

class RegisterUserFeature extends BaseFeature {
  constructor(data) {
    super(data);
  }

  async handle() {
    const payload = this.data;
    const [userRegistrationError, user] = await this.doAsyncOperation(
      User.create(payload)
    );
    if (userRegistrationError)
      return this.createOperationResponse({
        error: userRegistrationError,
        statusCode: 400,
        status: "error",
        message: "This User Already Exist In Our System.",
        errorLabel: "User Registration",
      });
    return this.createOperationResponse({
      statusCode: 200,
      status: "success",
      message: "Registration Successful.",
      results: [user],
    });
  }
}
module.exports = RegisterUserFeature;
```

## Installation

Simply run this command to install the Adonis-Feat package into your project.

```bash
adonis install adonis-feat
```

Next, register the provider inside ```start/app.js``` file. 


```javascript
const aceProviders = [
  'adonis-feat/providers/AdonisFeatProvider'
];
```

## Getting Started

We'll demo a sample application now. We'll be building an Adonis  application that registers user, we will create a feature called RegisterUserFeature inside the UserManagement Domain.

### Command

Simply run this command to create a new feature into your project.

```bash
e.g adonis make:feature Domain/Feature
adonis make:feature UserManagement/RegisterUserFeature
```

After running this command, a **Features** directory will be generated inside your **app** directory. Inside the **Features** directory, a file named *BaseFeature.js* and a directory named **UserManagement** is generated.

Inside the **UserManagement** directory, the feature file is generated named *RegisterUserFeature.js* 

```js
"use strict";

const BaseFeature = use("App/Features/BaseFeature");

class RegisterUserFeature extends BaseFeature {
  constructor (data) {
        super(data)
    }

    async handle () {
        // const { userId } = this.data
        // const [userLookupError, user] = await this.doAsyncOperation(User.find(userId))

        // if (userLookupError)
            // return this.createOperationResponse({
            //  error: userLookupError,
            //  statusCode: 400,
            //  status: "error",
            //  message: "We could not find that user",
            // })

        // return this.createOperationResponse({
        //  statusCode: 200,
        //  status: "success",
        //  message: "Successfully did some really cool stuff",
        //  results: [user],
        // })
    }
}
module.exports = RegisterUserFeature;
```

So, there some code commented above which you can replace with your own logic. But **adonis-feat** offers you some methods which are the ``doAsyncOperation()`` method that allows you to run some asynchronous operation and the ``createOperationResponse()`` method that construct a standard successfully or failed response.


Next, paste this inside ``app/Features/UserManagement/RegisterUserFeature.js`` file. 



```js
"use strict";
const BaseFeature = use("App/Features/BaseFeature");
const User = use("App/Models/User");

class RegisterUserFeature extends BaseFeature {
  constructor(data) {
    super(data);
  }

  async handle() {
    const payload = this.data;
    const [userRegistrationError, user] = await this.doAsyncOperation(
      User.create(payload)
    );
    if (userRegistrationError)
      return this.createOperationResponse({
        error: userRegistrationError,
        statusCode: 400,
        status: "error",
        message: "This User Already Exist In Our System.",
        errorLabel: "User Registration",
      });
    return this.createOperationResponse({
      statusCode: 201,
      status: "success",
      message: "Registration Successful.",
      results: user,
    });
  }
}
module.exports = RegisterUserFeature;

```

So, the `handle()` method handles all the logics. Inside the `handle()` method we set the *`payload`* to be *`this.data`* and *`this.data`* is the request object coming from the `UserController`


This is UserController file `app/Controllers/Http/UserController.js`

```js
"use strict";
const RegisterUserFeature = use("App/Features/UserManagement/RegisterUserFeature");

class UserController {

  async register({ response, request }) {

    const payload = request.all();
    const result = await new RegisterUserFeature(payload).handle();
    const { status_code } = result;

    return response.status(status_code).json(result);
  }

}

module.exports = UserController;
```

## Contributing

Contributions are welcome! Check out the [issues](https://github.com/ogbiyoyosky/adonis-feat/issues) or the [PRs](https://github.com/ogbiyoyosky/adonis-feat/pull-requests), and make your own if you want something that you don't see there.

## License

[GPLv3.0](https://github.com/ogbiyoyosky/adonis-feat)
