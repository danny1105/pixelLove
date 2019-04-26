# PixelLove

A growing camera app.

## Getting Started

These instructions will let you know about the API endpoints which are required for this application.

### Prerequisites

You should have node installed in your system and for Database we are using MongoDb, so you should also have an account in mlab, as we are not using local mongoDB.

### Endpoints

## POST Endpoint for registering a User

This endpoint is used to register a user and store the user information in the Database. The following inputs are required for this endpoint:
* first name
* last name
* email
* password
* confirm password

```
/api/users/register
```

## GET Endpoint for login

This endpoint is used to login a user. The following inputs are required for this endpoint:
* email
* password

```
/api/users/login
```

## POST Endpoint for multimedia file upload

This endpoint is used to upload a multimedia file and store it into the Database.

```
/upload
```

## GET Endpoint for fetching all the multimedia files.

This endpoint is used to fetch all the multimedia files from the Database.

```
/files
```

## Authors

* **Ashish Tiwari** 
* **Abhishek Kalia** 
* **Aakash Mittal** 


