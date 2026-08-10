def generate_recommendation(
    service: str,
    port: int,
    cvss: float,
    epss: float,
    priority: str
):
    """
    Generate AI-style remediation recommendations.
    """

    recommendations = []

    # Patch recommendation
    if priority == "Critical":
        recommendations.append("Patch immediately.")
    elif priority == "High":
        recommendations.append("Patch within 24 hours.")
    elif priority == "Medium":
        recommendations.append("Patch during the next maintenance window.")
    else:
        recommendations.append("Monitor and patch when convenient.")

    # Network recommendation
    if port in [22, 3389]:
        recommendations.append(
            "Restrict access using a firewall or VPN."
        )

    elif port in [80, 443]:
        recommendations.append(
            "Deploy a Web Application Firewall (WAF)."
        )

    # Service-specific recommendations
    if service.lower() == "ssh":
        recommendations.append(
            "Disable password authentication and use SSH keys."
        )

    elif service.lower() == "http":
        recommendations.append(
            "Disable unnecessary HTTP methods."
        )

    elif service.lower() == "https":
        recommendations.append(
            "Ensure TLS 1.2 or TLS 1.3 is enabled."
        )

    elif service.lower() == "ftp":
        recommendations.append(
            "Replace FTP with SFTP if possible."
        )

    # High exploitation probability
    if epss >= 0.5:
        recommendations.append(
            "This vulnerability is actively likely to be exploited. Prioritize remediation."
        )

    return recommendations