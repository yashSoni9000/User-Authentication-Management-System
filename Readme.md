# User Management System

## 1. SignIn SignUp with email verification

### 1.1 Installation:

You need to first download following by official sites or by clicking below links:

<li>
<a href="https://nodejs.org/en/download">Node</a>
</li>
<li>
<a href="https://www.postman.com/downloads/">Postman</a>
</li>
<li>
<a href="https://www.mongodb.com/try/download/community">MongoDB Compass</a>
</li>

<br>
<b>Note: You need to download the above softwares according to your pc. I am using windows 64-bit :-</b>

#### 1.2 Create a new project and install the dependencies:

You need to download the zip file :
<br>

```
https://github.com/yashSoni9000/User-Authentication-Management-System.git
```

Now extract the files and place in your folder and open your terminal and type the command given below:

```
npm install
```

This will create node_modules file for our project.

<b>Note : You need to switch port in index.js to your own available port

Also you need to create a .env file in root folder and paste codes from .example.env file and replace the values with yours </b>


to get password you need to enable 2 factor authentication on your gmail id and then go to app passwords and make a new password for type "nodemailer" in it.
It will generate a new password and paste that in place of password placeholder in .env file

#### 1.3 Run the application:

Now type the command given below:

```
node index.js
```

This will start our backend application and now we are ready to use our application

### 1.4 APIs used:

If there is body used in any of following API I have given a sample body which you need to raw and then select JSON type and paste it if needed
<b>Note : You need to user your port which you used earlier in index.js</b>

POST Method for signing up

<li>
http://127.0.0.1:9003/auth/signup
</li>
<b>Body</b>

```
{
    "username":"yash",
    "email":"<Your-EmailID>",
    "password":"abc123",
    "confirmPassword":"abc123"
}
```

<br>
POST Method for signing in
<li>
http://127.0.0.1:9003/auth/signin
</li>
<b>Body</b>
        
```
{
    "email":"<Your-EmailID>",
    "password":"abc123",
} 
```
<br>
POST Method for resetting password
<li>
http://127.0.0.1:9003/auth/resetpasswd
</li>
<b>Body</b>
        
```
{
    "email":"<Your-EmailID>",
} 
```
GET Method for Updating Password
<li>
http://127.0.0.1:9003/auth/update-passwd
</li>
<br>
GET Method for Success password
<li>
http://127.0.0.1:9003/auth/successReset
</li>
<br>
GET Method for verifying email
<li>
http://127.0.0.1:9003/auth/verify-email
</li>
<br>
POST Method for sending email
<li>
http://127.0.0.1:9003/auth/logout
</li>

### 1.5 Explanation:

There are multiple folder which increases the code readability and make code more clean

```
/config/db.js
```

This file contains database configuration for connecting to mongodb server

```
/controllers/user.controller.js
```

This is controller file where we have defined functions related to sign up, sign in, log out etc

```
/middleware/auth.js
/middleware/joi_verification.js
```

These two files contain middlewares which are used by controllers to authenticate ,validate incoming data

```
/models/User.js
```

This is model file where we have defined schema for storing data related to users like username, email id, password etc
This model file defines schema structure for storing data into mongodb server

```
/routes/authRoutesjs
```

This route file defines routes for accessing different end points of our application

## 2. User Authentication with 3rd party API

### 2.1 Google Authentication

Passport.js was used for google authentication
<br>
GET method for google authentication

```
http://localhost:9003/auth/google
```

upon successful authentication it will redirect to
<br>

```
http://localhost:9003/auth/google/success
```

### 2.2 Hubspot Authentication

Passport.js and normal authentication were used for hubspot authentication but it requires premium account subscription to use it.
<br>
Above issue is mentioned
<a href="https://community.hubspot.com/t5/APIs-Integrations/This-account-doesn-t-have-access-to-some-HubSpot-features-that/m-p/810808#:~:text=This%20account%20doesn%27t%20have%20access%20to%20some%20HubSpot,in%20the%20Free%20tier%29%20the%20app%20won%27t%20install">here</a>

GET method for hubspot authentication

```
http://localhost:9003/auth/hubspot
```

upon successful authentication it will redirect to
<br>

```
http://localhost:9003/auth/hubspot/callback
```

### 2.3 Facebook Authentication

Passport.js was used for facebook authentication
<br>
GET method for facebook authentication

```
http://localhost:9003/auth/facebook
```

upon successful authentication it will redirect to
<br>

```
http://localhost:9003/auth/facebook/callback
```

### 2.4 Instagram Authentication

Using PassportJS for Instagram authentication might be outdated and normal method we can authenticate but requires https as website url
<br>
Above issue is mentioned
<a herf="https://stackoverflow.com/questions/20580535/instagram-api-do-scopes-work-with-oauth2-implicit-authentication-flow#:~:text=The%20Instagram%20API%20uses%20the%20OAuth%202.0%20protocol,must%20be%20made%20over%20SSL%20%28https%3A%2F%2F%20not%20http%3A%2F%2F%29.">here</a>

GET method for instagram authentication

```
http://localhost:9003/auth/instagram
```

upon successful authentication it will redirect to
<br>

```
http://localhost:9003/auth/instagram/callback
```

### 2.5 LinkedIn Authentication

LinkedIn authentication was done using basic authentication.

GET method for linkedin authentication

```
http://localhost:9003/auth/linkedin
```

upon successful authentication it will redirect to
<br>

```
http://localhost:9003/auth/linkedin/callback
```

### 2.6 Twitter Authentication

Using PassportJS for Twitter authentication might be outdated and normal method we can authenticate but requires https as website url
<br>
Above issue is mentioned
<a href="https://stackoverflow.com/questions/7556758/website-not-a-valid-url-format-when-creating-an-application-of-twitter#:~:text=Be%20aware%20of%20localhost%2C%20if%20you%20are%20developing%20on%20local%20machine.%20Twitter%20doesn%27t%20allow%20url%20with%20http%3A//localhost%3A3000%20or%20without%20http.">here</a>

GET method for twitter authentication

```
http://localhost:9003/auth/twitter
```

upon successful authentication it will redirect to
<br>

```
http://localhost:9003/auth/twitter/callback
```

## User Management System components

### Note : You can find the schema of each component <a href="https://miro.com/app/board/uXjVMmZq5ck=/?share_link_id=690317642501">here</a>

### 3.1 Team

team has following attributes:

<li>
teamName
</li>
<li>
members
</li>

It has CRUD operations and can be accessed using following routes:
<br>
<br>
POST Method for creating team

```
http://localhost:9003/team
```

<b>Body</b>

```
{
    "teamName":"demoTeam"
}
```

GET Method for getting all teams

```
http://localhost:9003/team
```

PUT Method for updating team

```
http://localhost:9003/team/:id
```

<b>Body</b>

```
{
    "teamName":"second",
    "members":["64ec2cfdc59521bf96cd6842"]
}
```

DELETE Method for deleting team

```
http://localhost:9003/team/:id
```

### 3.2 User

user has following attributes:

<li>
username
</li>
<li>
email
</li>
<li>
password
</li>
<li>
confirmPassword
</li>
<li>
emailToken
</li>
<li>
isVerified
</li>
<li>
date
</li>
<li>
role
</li>
<li>
invoices
</li>
<li>
teamId
</li>

It has CRUD operations and can be accessed using following routes:
<br>
<br>
POST Method for creating user

```
http://localhost:9003/user
```

<b>Body</b>

```
{
    "username":"demo9000",
    "email":"demo@gmail.com",
    "password":"abc123",
    "teamId":"64f701bfc9138391dddd8dbc"
}
```

<b>NOTE :</b> You need to use your own teamId which you can get by creating team using team routes we created earlier

GET Method for getting all users

```
http://localhost:9003/user/:id
```

PUT Method for updating user

```
http://localhost:9003/user/:id
```

<b>Body</b>

```
{
    "username":"demo9000",
    "email":"demo@gmail.com",
    "teamId":"64f70a87bb839c85d62d09b1",
    "password":"abc123"
}
```

DELETE Method for deleting user

```
http://localhost:9003/user/:id
```

### 3.3 Project

project has following attributes:

<li>
projectName
</li>
<li>
tasks
</li>

It has CRUD operations and can be accessed using following routes:
<br>
<br>
POST Method for creating project

```
http://localhost:9003/project
```

<b>Body</b>

```
{
    "projectName":"demoProject"
}
```

GET Method for getting all projects

```
http://localhost:9003/project
```

PUT Method for updating project

```
http://localhost:9003/project/:id
```

<b>Body</b>

```
{
    "projectName":"first project",
    "tasks":["64f57d76a6eeeab9365bd38f"]
}
```

DELETE Method for deleting project

```
http://localhost:9003/project/:id
```

### 3.4 Task

task has following attributes:

<li>
title
</li>
<li>
description
</li>
<li>
projectId
</li>
<li>
assignedTo
</li>

It has CRUD operations and can be accessed using following routes:
<br>
<br>
POST Method for creating task

```
http://localhost:9003/task
```

<b>Body</b>

```
{
    "title":"demoTask",
    "description":"Demo Task!!",
    "projectId":"64f70988bb839c85d62d099b",
    "assignedTo":["64ec2cfdc59521bf96cd6842","64f705c9865e18a31ab3fa27"]
}
```

<b>NOTE :</b> You need to use your own projectId and assignedTo which you can get by creating project and user using project and user routes we created earlier

GET Method for getting all tasks

```
http://localhost:9003/task
```

PUT Method for updating task

```
http://localhost:9003/task/:id
```

<b>Body</b>

```
{
    "title":"UpdatedTask",
    "description":"Updated Task!!",
    "projectId":"64f6ae74cbc78183bd5f6045",
    "assignedTo":["64f57ceaa6eeeab9365bd386"]
}
```

DELETE Method for deleting task

```
http://localhost:9003/task/:id
```

### 3.5 Customer

Customer has attributes same as user and it has CRUD operations and can be accessed using following routes:

POST Method for creating customer

```
http://localhost:9003/customer
```

<b>Body</b>

```
{
    "username":"customer",
    "email":"customer@gmail.com",
    "password":"abc123",
    "role":"customer"
}
```

<b>NOTE :</b> You need to use your role as customer

GET Method for getting all customers

```
http://localhost:9003/customer
```

PUT Method for updating customer

```
http://localhost:9003/customer/:id
```

<b>Body</b>

```
{
    "username":"updatedCustomer",
    "email":"customer@gmail.com",
    "role":"customer",
    "password":"abc123"
}
```

DELETE Method for deleting customer

```
http://localhost:9003/customer/:id
```

### 3.6 Invoice

Invoice has following attributes:

<li>
customer_id
</li>
<li>
invoiceNumber
</li>
<li>
dateIssued
</li>
<li>
totalAmount
</li>
<li>
items
</li>

It has CRUD operations and can be accessed using following routes:
<br>
<br>
POST Method for creating invoice

```
http://localhost:9003/invoices
```

<b>Body</b>

```
{
    "customer_id":"6500012d28290369268f168d",
    "invoiceNumber":"001",
    "totalAmount":"6960",
    "items":[{
        "description":"Oil",
        "quantity":2,
        "unitPrice":69
    }]
}
```

<b>NOTE :</b> You need to use your own customer_id which you can get by creating customer routes we created earlier

GET Method for getting all invoices

```
http://localhost:9003/invoices
```

PUT Method for updating invoice

```
http://localhost:9003/invoices/:id
```

<b>Body</b>

```
{
    "customer_id":"6500012d28290369268f168d",
    "invoiceNumber":"002",
    "totalAmount":"6969",
    "items":[{
        "description":"Oil",
        "quantity":2,
        "unitPrice":69
    }]
}
```

DELETE Method for deleting invoice

```
http://localhost:9003/invoices/:id
```

### 3.7 Employee

Employee has attributes same as user and it has CRUD operations and can be accessed using following routes:

POST Method for creating employee

```
http://localhost:9003/employee
```

<b>Body</b>

```
{
    "username":"employee",
    "email":"employee@gmail.com",
    "password":"abc123",
    "role":"employee"
}
```

<b>NOTE :</b> You need to use your role as employee

GET Method for getting all employees

```
http://localhost:9003/employee
```

PUT Method for updating employee

```
http://localhost:9003/employee/:id
```

<b>Body</b>

```
{
    "username":"updateEmployee",
    "email":"employee@gmail.com",
    "role":"employee",
    "password":"abc123"
}
```

DELETE Method for deleting employee

```
http://localhost:9003/employee/:id
```

### 3.8 Admin

Admin has attributes same as user and it has CRUD operations and can be accessed using following routes:

POST Method for creating admin

```
http://localhost:9003/admin
```

{
"username":"admin",
"email":"admin@gmail.com",
"password":"abc123",
"role":"admin"
}

```
<b>NOTE :</b> You need to use your role as admin otherwise it wont go forward

GET Method for getting all admins
```

```
http://localhost:9003/admin
```

PUT Method for updating admin

```
http://localhost:9003/admin/:id
```

<b>Body</b>

```
{
    "username":"updatedAdmin",
    "email":"admin@gmail.com",
    "password":"abc123",
    "role":"admin"
}
```

DELETE Method for deleting admin

```
http://localhost:9003/admin/:id
```

### 3.9 Dashboard

Dashboard shows the count and name of projects, tasks,teams and users

GET Method for getting dashboard

```
http://localhost:9003/dashboard
```
