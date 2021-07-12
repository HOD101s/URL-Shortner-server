# URL Shortner Server

You can find the complete project [here](https://github.com/HOD101s/URL-Shortner). This backend service is a submodule of the larger URL Shortner Web App.

## Stack

-   nodejs
-   express
-   mongodb

## APIs

-   POST /api/shorten

    -   input {long_url: long_url}
    -   output {short_url: short_url, long_url: long_url}

-   GET /:short-link-code
    -   output: redirects to original link

## Docker

Used to containerize the application. The Dockerfile here sets up a node based environment with yarn to run our application.
