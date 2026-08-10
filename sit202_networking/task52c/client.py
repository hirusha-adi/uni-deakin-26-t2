import socket

SERVER_HOST = "127.0.0.1"
SERVER_PORT = 5354

client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client_socket.settimeout(5)

hostname = input("Enter hostname: ")
record_type = input("Enter record type (A or CNAME): ")

query = f"{hostname},{record_type}"

client_socket.sendto(
    query.encode(),
    (SERVER_HOST, SERVER_PORT)
)

try:
    response, server_address = client_socket.recvfrom(1024)
    print("Server response:", response.decode())

except socket.timeout:
    print("The DNS server did not respond.")

client_socket.close()
