import nmap


def scan_target(target: str):
    scanner = nmap.PortScanner()

    scanner.scan(
        hosts=target,
        arguments="-F"
    )

    results = []

    for host in scanner.all_hosts():
        for proto in scanner[host].all_protocols():
            ports = scanner[host][proto].keys()

            for port in ports:
                service = scanner[host][proto][port]

                results.append({
                    "port": port,
                    "state": service["state"],
                    "service": service["name"],
                    "product": service.get("product", ""),
                    "version": service.get("version", "")
                })

    return {
        "host": target,
        "ip": scanner[target].hostname() if target in scanner.all_hosts() else "",
        "ports": results
    }