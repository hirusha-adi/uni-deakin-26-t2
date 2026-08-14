from socket import *

serverName = "127.0.0.1"
serverPort = 11500

with socket(AF_INET, SOCK_DGRAM) as serverSocket:
    serverSocket.bind((serverName, serverPort))

    print("The Server is Listening")

    while True:
        message, clientAddress = serverSocket.recvfrom(2048)

        message = message.decode()
        count = len(message)

        print("Message received:", message)
        print("Number of characters:", count)

        reply = str(count) + " " + message.upper()

        serverSocket.sendto(reply.encode(), clientAddress)


