 ## For Prerequisites
## =>>> Read Instruction.txt


##                   Personal Finance Management API Documentation 
Introduction
The Personal Finance Management API allows users to track their incomes, expenses, and gain insights into their spending habits. This API provides endpoints for managing transactions, retrieving transaction summaries, and more.

     Authentication
Authentication is required to access most endpoints of the API. Authentication is done via JWT (JSON Web Token). Clients must include a valid JWT token in the Authorization header of their requests.

Base URL
The base URL for accessing the API endpoints is:

arduino
Copy code
http://localhost:3000/api/
Endpoints
1. ## Add a New Transaction
Method: POST
Endpoint: /transactions
Description: Add a new transaction (income or expense).
Authentication: Required
Request Body:
json
Copy code
{
    "user_id": 1,
    "amount": 100.50,
    "description": "Grocery shopping",
    "transaction_type": "expense"
}
Response:
Success: Returns the newly created transaction object, insertId, get OkPacket.
Error: Returns an error message if the transaction creation fails.

2. ##  Retrieve Transactions

Method: GET

Endpoint: /transactions

Description: Retrieve a list of transactions for a given period.

Authentication: Required

Query Parameters:
start_date (optional): Start date of the period (format: YYYY-MM-DD).

end_date (optional): End date of the period (format: YYYY-MM-DD).

Response:

Success: Returns a list of transactions.
Error: Returns an error message if retrieval fails.


3. ## Retrieve Transaction Summary


Method: GET
Endpoint: /transactions/summary

Description: Retrieve a summary of transactions (total income, total expenses, and savings) for a given period.
Authentication: Required

Query Parameters:

start_date (optional): Start date of the period (format: YYYY-MM-DD).
end_date (optional): End date of the period (format: YYYY-MM-DD).

Response:

Success: Returns a summary object containing total income, total expenses, and savings.

Error: Returns an error message if retrieval fails.


4. ## Delete Transaction


Method: DELETE
Endpoint: /transactions/:id

Description: Delete a specific transaction.

Authentication: Required
Path Parameters:
id: ID of the transaction to delete.

Response:
Success: Returns a success message indicating the transaction was deleted.
Error: Returns an error message if deletion fails.
Error Handling

If an error occurs during the processing of a request, an appropriate error response will be returned with the corresponding HTTP status code and error message.
Rate Limits

There are currently no rate limits imposed on API requests.
Testing Instructions
Obtain a JWT token by authenticating using valid credentials.
Use the obtained token to make requests to the API endpoints, ensuring that the token is included in the Authorization header of the request.
Verify the responses returned by the API endpoints, and handle any errors as needed.


For User 


# User Authentication API Documentation

## Introduction
This API provides endpoints for user authentication, including signup and signin functionality.

## Base URL
The base URL for accessing the API endpoints is: `https://example.com/api/auth`

## Endpoints

### Signup

- **Method**: POST
- **Endpoint**: `/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
      "email": "user@example.com",
      "password": "password123",
      "username": "exampleuser"
  }


## Response:
Success: Returns a JWT token for the newly registered user.
#  Errors:
400 Bad Request: Invalid request body.
409 Conflict: Email already exists.
500 Internal Server Error: Server error.


## Signin


Method: POST
Endpoint: /signin
Description: Authenticate an existing user.
Request Body:

{
    "email": "user@example.com",
    "password": "password123"
}



## Response:
Success: Returns a JWT token for the authenticated user.
Errors:
401 Unauthorized: Invalid email or password.
500 Internal Server Error: Server error.
## Authentication
JWT (JSON Web Token) is used for authentication. Clients must include a valid JWT token in the Authorization header of their requests.

## Error Handling
The API returns appropriate HTTP status codes and error messages for different scenarios, such as invalid requests, conflicts, and server errors.

## Usage
To use the API, send requests to the specified endpoints with the required parameters in the request body. Ensure that you handle authentication and errors appropriately in your client application.

 ## Security
User passwords are hashed before storing them in the database.
JWT tokens are used for authentication to secure endpoints.
## Rate Limits
There are currently no rate limits imposed on API requests.

 ## Testing
Use a tool like Postman or cURL to test the API endpoints.
Ensure that you test different scenarios, including valid and invalid requests, to verify the API's behavior.

