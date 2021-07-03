# URL Shortner API

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
