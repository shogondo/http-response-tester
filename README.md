# http-response-tester
The HTTP server to respond any HTTP status for testing

# Prerequirement
* Install Node.js

# Setup
1. `cp settings.js.sample settings.js` and edit `settings.js` to configure listening port of the HTTP server.
2. Run `node index.js`
3. Send HTTP request to `http://localhost:${port}` with a web browser, curl, etc.
