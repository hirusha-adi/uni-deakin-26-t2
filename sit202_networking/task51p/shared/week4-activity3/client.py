from socket import *

serverName = "127.0.0.1"
serverPort = 11500

with socket(AF_INET, SOCK_DGRAM) as clientSocket:
    message = input("Enter message: ")

    clientSocket.sendto(message.encode(), (serverName, serverPort))

    reply, serverAddress = clientSocket.recvfrom(2048)

    print("Server reply:", reply.decode())

