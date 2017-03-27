let http = require("http");
let url = require("url");
let settings = require("./settings");

class Server {
    start() {
        this.dumpServerInfo();

        let server = http.createServer((req, res) => {
            let responder = new Responder(req, res);
            responder.handle();
        });
        server.listen(settings.port);
    }

    dumpServerInfo() {
        console.log("start date:", new Date());
        console.log("listening port:", settings.port);
        console.log("");
    }
}

class Responder {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    handle() {
        try {
            this.dumpRequestInfo();

            let parsedUrl = url.parse(this.request.url, true);
            let params = parsedUrl.query;
            this.response.statusCode = params.status || 200;
            for (let key in params) {
                let match = key.match(/^h:(.+)$/);
                if (match) {
                    this.response.setHeader(match[1], params[key]);
                }
            }

            if (params.content) {
                this.response.write(params.content.toString());
            }
            else {
                parsedUrl.headers = this.request.headers;
                this.response.write(JSON.stringify(parsedUrl));
            }
        }
        catch(ex) {
            console.log(ex);
            this.response.statusCode = 400;
            this.response.write(ex.toString());
        }

        this.response.end();
    }

    dumpRequestInfo() {
        console.log("timestamp:", new Date());
        console.log("url:", this.request.url);
        console.log("headers:");
        for (let name in this.request.headers) {
            console.log("    ", name, ":", this.request.headers[name]);
        }
        console.log("");
    }
}

let server = new Server();
server.start();
