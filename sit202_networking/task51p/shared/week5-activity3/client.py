from socket import *

serverName = "127.0.0.1"
serverPort = 11500

with socket(AF_INET, SOCK_STREAM) as clientSocket:
    clientSocket.connect((serverName, serverPort))
    message = input("Enter message: ")
    clientSocket.send(message.encode())
    reply = clientSocket.recv(2048)
    print("Server reply:", reply.decode())

