# Express.js Application

This is a simple Express.js application demonstrating the use of route parameters and query parameters.

## Endpoints

### Home Page
- **URL:** `/`
- **Method:** `GET`
- **Description:** Returns a welcome message for the home page.

### Profile Page
- **URL:** `/profile/:username`
- **Method:** `GET`
- **Description:** Returns a welcome message for the profile page with the specified username.
- **Route Parameters:**
  - `username`: The username of the profile.

### Article Page
- **URL:** `/profile/:username/article/:slug`
- **Method:** `GET`
- **Description:** Returns a welcome message for the article page with the specified username and article slug.
- **Route Parameters:**
  - `username`: The username of the profile.
  - `slug`: The slug of the article.

### Product Page
- **URL:** `/product`
- **Method:** `GET`
- **Description:** Returns a welcome message for the product page with query parameters.
- **Query Parameters:**
  - `search`: The search term.
  - `page`: The page number.
  - `limit`: The limit of items per page.

## Fetching Data from External API

The application fetches data from an external API (`https://jsonplaceholder.typicode.com/todos/1`) and logs the response to the console.

## Running the Server

The server listens on port `3000`. To start the server, run the following command:

```bash
node app.js