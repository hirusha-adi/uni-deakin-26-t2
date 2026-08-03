import socket

HOST = "127.0.0.1"
PORT = 5354

records = {
    "example.com": {
        "@": {
            "A": "93.184.216.34"
        },
        "www": {
            "CNAME": "@"
        },
        "mail": {
            "A": "192.168.1.20"
        },
        "api": {
            "A": "192.168.1.30"
        },
        "shop": {
            "CNAME": "www"
        }
    },

    "google.com": {
        "@": {
            "A": "142.250.70.14"
        },
        "www": {
            "CNAME": "@"
        },
        "mail": {
            "CNAME": "@"
        }
    }
}

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind((HOST, PORT))

print(f"DNS server is running on {HOST}:{PORT}")



while True:
    data, client_address = server_socket.recvfrom(1024)

    query = data.decode()
    hostname, record_type = query.split(",")

    hostname = hostname.lower().strip()
    record_type = record_type.upper().strip()

    print(f"Query received: {hostname} - {record_type}")

    answer = None

    for domain, domain_records in records.items():
        if hostname == domain:
            host_label = "@"
        elif hostname.endswith(f".{domain}"):
            host_label = hostname[:-(len(domain) + 1)]
        else:
            continue

        host_records = domain_records.get(host_label, {})
        answer = host_records.get(record_type)
        break

    if answer is not None:
        response = f"{record_type} record: {answer}"
    else:
        response = "DNS record not found"

    server_socket.sendto(response.encode(), client_address)
