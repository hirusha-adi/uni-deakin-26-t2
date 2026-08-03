# Pseudocode

## Server

```text
BEGIN
    Set the server address to 127.0.0.1
    Set the port to 5354
    Store the A and CNAME records for each domain and host (using a correct data type)

    Create an IPv4 UDP socket
    Bind the socket to the server address and port
    Display that the server is running

    WHILE the server is running
        Receive a query and the client's address
        Decode the query into text
        Split the query into a hostname and record type
        Convert the hostname to lowercase
        Convert the record type to uppercase

        FOR each domain in the DNS records
            IF the hostname matches the domain
                Use @ as the host label
            ELSE IF the hostname is a subdomain
                Extract the host label from the hostname
            END IF

            Search the host records for the requested record type
        END FOR

        IF a matching record is found
            Create a response containing the record type and value
        ELSE
            Set the response to "DNS record not found"
        END IF

        Encode the response
        Send the response to the client's address
    END WHILE
END
```

## Client

```text
BEGIN
    Set the server address to 127.0.0.1
    Set the server port to 5354
    Create an IPv4 UDP socket
    Set a five-second timeout

    Ask the user to enter a hostname
    Ask the user to enter an A or CNAME record type
    Combine the hostname and record type with a comma
    Encode and send the query to the server

    IF a response is received within five seconds
        Decode and display the server's response
    ELSE
        Display that the server did not respond
    END IF

    Close the client socket
END
```
