# Notes

## 2.2

- The application layer in the TCP/IP model is the interface that prepares our communication for trasmission over the computer networks

- Sockets are identified by an IP:PORT
- for client-server communication, thre should be two sockets involved (one socket on each side).
- physical, link, network & transport layers and managed by the OS
- between the transport and the application layer sits the socket API.
- ![visualization](image.png)

- To use a socket, you need to decide what transport layer protocol to use
- This can be either TCP or UDP

The table below has been yoinked from the lecture video into chatgpt to generate a table in markdown with the RFC specification documents properly linked.

| Application            | Application-layer protocol                                                                                                                               | Transport-layer protocol                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| File transfer/download | [FTP — RFC 959](https://www.rfc-editor.org/rfc/rfc959.html)                                                                                              | [TCP — RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html)                                                                |
| E-mail                 | [SMTP — RFC 5321](https://www.rfc-editor.org/rfc/rfc5321.html)                                                                                           | [TCP — RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html)                                                                |
| Web documents          | HTTP/1.1 — [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) and [RFC 9112: HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112.html) | [TCP — RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html)                                                                |
| Internet telephony     | [SIP — RFC 3261](https://www.rfc-editor.org/rfc/rfc3261.html), [RTP — RFC 3550](https://www.rfc-editor.org/rfc/rfc3550.html), or proprietary protocols   | [TCP — RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html) or [UDP — RFC 768](https://www.rfc-editor.org/rfc/rfc768.html) |
| Streaming audio/video  | [HTTP — RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), [MPEG-DASH — ISO/IEC 23009-1](https://www.iso.org/standard/89027.html)                   | [TCP — RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html)                                                                |
| Interactive games      | World of Warcraft, first-person shooters and other proprietary protocols                                                                                 | [UDP — RFC 768](https://www.rfc-editor.org/rfc/rfc768.html) or [TCP — RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html) |


## 2.3

- The application layer protocols are essential.

## 2.4

- HTTP/1.1 - [RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616)
- HTTP/2 - [RFC 7540](https://datatracker.ietf.org/doc/html/rfc7540)


request structure:
![alt text](image-2.png)

response structure:
![alt text](image-3.png)



# Exercises

## Exercise 2.2.1

Client-server architechture:
- A web application/server uses a client-server model. 
- The client sends an HTTP request.
- The server will listen on a TCP socket, proecess the recieved request through the application layer and will return an HTTP response.
- TLS is used to ensure confidentiality, integrity and server authentication when HTTPS is used. 
- The web server might also communicate with other services like APIs, database servers, authentication providers, etc... 
- This architechture allows the administrators to have centralized logging, data stores and app states.

Peer to peer architechture:
- BitTorrent is a decentralized p2p file distribution protocol where each of its "nodes" (devices in the network/swarm) can operate either as a client or a server.
- Each file being shared is fixed into small pieces (chunks) allowing peers to download them simultaneously from multiple services and recreate the file at the every end.
- Because of this architechture, it allows nodes even without the full file to still share the chunks they have.
- When exchanging these files, peers use rarest file selection algorithms and a lot of other techniques to select which chunks to download the first.
- Trackers with distributed hash tables are used to discover peers, while the actual transfer happens between the peers directly.
- The more devices in the swarm, the more reliable and fast the file distribution will become.

## Exercise 2.2.2

- I use `ping` everyday for basic troubleshooting. It uses the ICMP protocol - the ICMP Echo Request (type 8) and ICMP Echo Reply (type 0) to be specific. And, ICMP is a network layer protocol. Therefore, this cannot be included here. https://stackoverflow.com/a/19218648
- In general day to day web browsing, we use HTTP and HTTPS. This traffic usually uses TCP but HTTP3 uses QUIC over UDP. https://www.f5.com/glossary/quic-http3 
- For emails, application layer protocols like SMTP and IMAP are used with TCP as the transport layer protocol.
- For DNS lookups, we usually use UDP (53/udp). Sometimes, there might also be a TCP fallback.
- SIP (Session Initiation Protocol) is mainly used in VoIP and calls and it usually uses UDP, however, we can also configure it to use TCP if required.

## Exercise 2.4.1

![alt text](image-1.png)

My browser uses persistant HTTP connections. Instead of creating a new connection for every object, it simply reuses an already established connection when having to deal with multiple HTTP requests and responses. 

HTTP 1.1 uses persistant connections by default. HTTP 2 can multiple multiple request-response streams over one TCP connection and HTTP 3 also provides a similar multiplexing capability over QUIC. Therefore, modern browser traffic is generally persistent unless the server explicitly closes the connection or doesn't support connection reuse.

Multiplexing allows several HTTP requests to be sent over the same connection at the same time and their responses can arrive in any interleaved order. This is used by both HTTP 2 and 3 to ensure that one slow response doesnt completely block everything else.

## Exercise 2.4.2

- GET: retrieves a resource
- POST: sends data to the server for processing. Very commonly used for form submissions, authentication, file uploads, and similar actions.
- PUT: create or fully replace an existing resource
- PATCH: update a resource without replacing everything
- DELETE: remove a resource
- HEAD: works like GET but will only return the response headers and not the response body.
- OPTIONS: request information about methods and features supported by a server (or a resource)
- QUERY: perform a read only server side query with the query parameters in the request body. introduced in June 2026 in [RFC 10008](https://datatracker.ietf.org/doc/html/rfc10008). 


## Exercise 2.4.3

Command to run is: `curl -sI -L <URL>`.
Based on https://stackoverflow.com/a/4497786

![alt text](image-4.png)

This command displays all the headers. Since we want to filter out cookie details, I will just grep it / use `findstr`.

Three cookies set from google.com. There are three cookies.
- __Secure-STRP
    - has not been documented officially but seems to be something security related and expires within 5 minutes.
    - Response was generated at 11:26:45 GMT and expires at 11:31:45 GMT.
    - Cookie will only be sent during same site interactions. It won't be sent when user visits google from another site to protect against XSS attacks.
    - Might be accessible via document.cookie.
- AEC
    - Used to detect spam, fraud and abuse by google. 
    - Expires in 22 January 2027, 11:26:45 GMT
    - Secure: Only sent through HTTPS
    - HttpOnly: not accessible via document.cookie
    - SameSite=Lax: generally blocked from cross site subrequests. However, it might still be available if the user directly goes to google through a normal top level link. 
    - Path=/: applies to every URL path under the specified domain.
- NID
    - Used to store user preferences and to support with analytics and advertising.
    - It's HttpOnly.
    - However, it doesn't have the Secure attribute set. This means the cookie is not restircted to HTTPS - but google uses HTTPS and HSTS. 
    - Has no SameSite attribute explicitly set, but by default, chromium treats this as SameSite=Lax. https://privacysandbox.google.com/cookies/basics/cookie-attributes

Functionalities of these cookies can be found here: https://policies.google.com/technologies/cookies

![alt text](image-5.png)

However, with amazon, at first, the response was a "503 Service Temporarily Unavailable".
![alt text](image-6.png)

Next, I attempted it with a user agent and I got a "405 Method Not Allowed". The only allowed methods here are "GET, POST, PUT, DELETE, OPTIONS" as seen below.
![alt text](image-7.png)


## Exercise 2.6.1






