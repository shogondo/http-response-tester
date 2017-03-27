# http-response-tester
The HTTP server to respond any HTTP status for testing


# Prerequirement
* Install Node.js


# Setup
1. `cp settings.js.sample settings.js` and edit `settings.js` to configure listening port of the HTTP server.
2. Run `node index.js`


# How to use

## Basic usage
You can send HTTP request to `http://localhost:${port}` with any HTTP client, then the HTTP server responds json data which contains request info like a query string, headeres and so on.

```
$ curl -v localhost:8888

* Rebuilt URL to: localhost:8888/
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8888 (#0)
> GET / HTTP/1.1
> Host: localhost:8888
> User-Agent: curl/7.47.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Mon, 27 Mar 2017 04:22:14 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":"","query":{},"pathname":"/","path":"/","href":"/","headers":{"host":"localhost:8888","user-agent":"curl/7.47.1","accept":"*/*"}}
```

## Specify response status code
If your request contains the `status=XXX` parameter as a query string, the HTTP server returns a HTTP response with the specifeid status code `XXX`.

```
$ curl -v localhost:8888?status=404

* Rebuilt URL to: localhost:8888/?status=404
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8888 (#0)
> GET /?status=404 HTTP/1.1
> Host: localhost:8888
> User-Agent: curl/7.47.1
> Accept: */*
>
< HTTP/1.1 404 Not Found
< Date: Mon, 27 Mar 2017 04:27:52 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":"?status=404","query":{"status":"404"},"pathname":"/","path":"/?status=404","href":"/?status=404","headers":{"host":"localhost:8888","user-agent":"curl/7.47.1","accept":"*/*"}}
```

## Specify response content
If your request contains the `content=XXX` parameter as a query string, the payload of HTTP response is set `XXX`.

```
$ curl -v localhost:8888?content=This_is_test_content

* Rebuilt URL to: localhost:8888/?content=This_is_test_content
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8888 (#0)
> GET /?content=This_is_test_content HTTP/1.1
> Host: localhost:8888
> User-Agent: curl/7.47.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Mon, 27 Mar 2017 04:30:25 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
This_is_test_content
```

## Specify response headers
If your request contains the `h:XXX=YYY` parameter as a query string, the HTTP server adds a response header `XXX=YYY`.

```
$ curl -v localhost:8888?h:X-Dummy-Header=dummy

* Rebuilt URL to: localhost:8888/?h:X-Dummy-Header=dummy
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8888 (#0)
> GET /?h:X-Dummy-Header=dummy HTTP/1.1
> Host: localhost:8888
> User-Agent: curl/7.47.1
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Dummy-Header: dummy
< Date: Mon, 27 Mar 2017 04:33:12 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":"?h:X-Dummy-Header=dummy","query":{"h:X-Dummy-Header":"dummy"},"pathname":"/","path":"/?h:X-Dummy-Header=dummy","href":"/?h:X-Dummy-Header=dummy","headers":{"host":"localhost:8888","user-agent":"curl/7.47.1","accept":"*/*"}}
```
