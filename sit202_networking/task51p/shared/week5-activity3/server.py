from socket import *

serverName = "127.0.0.1"
serverPort = 11500

with socket(AF_INET, SOCK_STREAM) as serverSocket:
    serverSocket.bind((serverName, serverPort))
    serverSocket.listen()

    print("The Server is Listening")

    # while True:
    # -----------
    # put line 16-28 inside the while loop to allow multiple clients to connect
    # and also multiple connections
    # -----------
    connectionSocket, clientAddress = serverSocket.accept()
    with connectionSocket:
        message = connectionSocket.recv(2048)

        message = message.decode()
        count = len(message)

        print("Message received:", message)
        print("Number of characters:", count)

        reply = str(count) + " " + message.upper()

        connectionSocket.send(reply.encode())

