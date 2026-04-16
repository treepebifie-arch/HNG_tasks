# Personal Identity Prediction API
A robust Node.js and Express API that integrates multiple external data sources to predict demographic profiles based on a name. The system aggregates data from Genderize, Agify, and Nationalize APIs, processing the results into a unified, stored user profile.

## Features
Data Aggregation: Consolidates gender, age, and nationality probability from three distinct external services.

Intelligent Logic: Automatically identifies the country with the highest probability using $O(n)$ reduction logic.

Strict Validation: Implements input checking and handles "invalid response" scenarios from external providers.

Database Persistence: Automatically checks for existing profiles and saves new records with unique UUID v7 identifiers.

## Stack
Runtime: Node.js

Framework: Express

Database: MongoDB

HTTP Client: Axios

ID Generation: UUID (v7)

## Using the Repo
Clone the repository.

Install dependencies: npm install.

Set up your .env file (ensure MONGO_URI is defined).

Start the server: npm start.

## API Endpoints

POST /api/profiles : Creates a new user profile by calling external APIs and saving the result.

Body: { "name": "Alex" }

GET /api/profiles : Retrieves all stored profiles. Includes support for filtering via query parameters.Query Example: GET /api/users?gender=male (Case-insensitive).

GET /api/profiles/:id : Retrieves a specific profile using its UUID.

DELETE /api/profiles/:id : Removes a specific profile from the database.

## Error Handling
The API uses specific status codes for predictable error states:

400 Bad Request: Missing name parameter.

404 Not found: User not found

422 Unprocessable Entity: Name is not a valid string.

502 Bad Gateway: One of the external APIs (Genderize, Agify, or Nationalize) returned an invalid response.

500 Internal Server Error: Unexpected database or server issues.

## Implementation Note

Dates are stored in the database using the UTC ISO 8601 format to ensure global consistency. 

Age groups are dynamically categorized into "child", "teenager", "adult", or "senior" based on the age returned by the external service.

Nationality is determined by the country with the highest  probability from the Nationalize response

## Live URL

https://hngtasks-stage-1.up.railway.app