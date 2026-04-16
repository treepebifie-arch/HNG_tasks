# Gender Prediction API

A lightweight Express-based controller that interacts with the genderize.io API to predict the gender of a name. This implementation is optimized for low internal overhead and follows clean coding practices.

## Features
Validation: input checking for missing parameters or invalid data types.

Safety: Includes Axios timeout handling and URI encoding for special characters.

Confidence Scoring: Automatically determines result reliability based on probability and sample size.

## Stack
Runtime: Node.js

Framework: Express

Language: Javascript

Logger: Morgan

## Using the Repo

Clone the repository

Install dependencies listed in the package.json file.

Set up the environment variables and start the server.


 ## API Endpoint (GET)
 
 /api/classify retrives the gender based on a query parameter.
 
 Example Request: GET /api/classify?name=Alex
 
 
  ## Error Handling
  The API returns semantically correct HTTP status codes: 
  
  400 Bad Request: Missing name parameter.
  
  422 Unprocessable Entity: Input is not a valid string.
  
  404 Not Found: The name could not be found in the Genderize database.
  
  500 Internal Server Error: Unexpected issues or external API downtime.
  
  ## Implementation Note
  The is_confident flag is set to true only if the prediction probability is $\ge 0.7$ and the sample size (count) is $\ge 100$, ensuring data reliability for the end-user.

  ## Live Url

  https//:hngtask-stage-0.up.railway.app