export type Severity = "Critical" | "High" | "Medium" | "Low";

export type Vulnerability = {
  id: number | string;
  cve: string;
  service: string;
  severity: Severity;
  priority: string;
  risk_score: number;
  cvss: number;
  epss?: number;
  port?: number;
  version?: string;
  recommended_action?: string;
  ai_recommendations?: string;
  description?: string;
};

export type Asset = {
  id: number | string;
  asset: string;
  ip: string;
  type: string;
  ports?: string;
  status: string;
  discovered_at?: string;
};

export type Summary = {
  total_assets: number;
  total_vulnerabilities: number;
  average_risk_score: number;
  critical_vulnerabilities: number;
};

export const demoSummary: Summary = {
  total_assets: 148,
  total_vulnerabilities: 372,
  average_risk_score: 6.8,
  critical_vulnerabilities: 24,
};

export const demoPriorityStats = [
  { name: "Critical", value: 24 },
  { name: "High", value: 68 },
  { name: "Medium", value: 154 },
  { name: "Low", value: 126 },
];

export const demoServiceStats = [
  { service: "HTTP", count: 96 },
  { service: "HTTPS", count: 122 },
  { service: "SSH", count: 61 },
  { service: "FTP", count: 47 },
  { service: "SMTP", count: 46 },
];

export const demoVulnerabilities: Vulnerability[] = [
  {
    id: 1041,
    cve: "CVE-2024-21762",
    service: "HTTPS",
    severity: "Critical",
    priority: "P1",
    risk_score: 9.6,
    cvss: 9.8,
    epss: 0.91,
    port: 443,
    version: "FortiOS 7.4.2",
    recommended_action: "Patch immediately and rotate SSL VPN credentials.",
    ai_recommendations:
      "Isolate the appliance from the public internet, apply vendor hotfix, then hunt for webshell artifacts in /migadmin.",
    description: "Out-of-bounds write in SSL VPN allows unauthenticated remote code execution.",
  },
  {
    id: 1040,
    cve: "CVE-2023-44487",
    service: "HTTP",
    severity: "High",
    priority: "P2",
    risk_score: 8.1,
    cvss: 7.5,
    epss: 0.74,
    port: 80,
    version: "nginx 1.24.0",
    recommended_action: "Enable HTTP/2 rapid-reset mitigation at the edge.",
    ai_recommendations: "Apply per-connection stream limits and enable WAF rate-based rules.",
    description: "HTTP/2 rapid reset enables high-volume denial of service.",
  },
  {
    id: 1039,
    cve: "CVE-2024-6387",
    service: "SSH",
    severity: "Critical",
    priority: "P1",
    risk_score: 9.2,
    cvss: 8.1,
    epss: 0.63,
    port: 22,
    version: "OpenSSH 9.2p1",
    recommended_action: "Upgrade OpenSSH to 9.8p1 or set LoginGraceTime=0.",
    ai_recommendations: "Restrict SSH to bastion CIDRs and enforce key-only authentication.",
    description: "Signal handler race condition in OpenSSH server (regreSSHion).",
  },
  {
    id: 1038,
    cve: "CVE-2021-44228",
    service: "HTTPS",
    severity: "Critical",
    priority: "P1",
    risk_score: 9.9,
    cvss: 10,
    epss: 0.97,
    port: 8443,
    version: "log4j 2.14.1",
    recommended_action: "Upgrade log4j to 2.17.1 and block outbound LDAP.",
    ai_recommendations: "Search JNDI lookup strings in access logs for the last 90 days.",
    description: "JNDI lookup in Log4j 2 allows remote code execution via crafted input.",
  },
  {
    id: 1037,
    cve: "CVE-2023-38408",
    service: "SSH",
    severity: "High",
    priority: "P2",
    risk_score: 7.6,
    cvss: 9.8,
    epss: 0.41,
    port: 22,
    version: "OpenSSH 8.9",
    recommended_action: "Disable ssh-agent forwarding on jump hosts.",
    ai_recommendations: "Audit which hosts allow agent forwarding and remove PKCS#11 providers.",
    description: "Remote code execution in OpenSSH's forwarded ssh-agent.",
  },
  {
    id: 1036,
    cve: "CVE-2020-9273",
    service: "FTP",
    severity: "Medium",
    priority: "P3",
    risk_score: 5.4,
    cvss: 6.5,
    epss: 0.18,
    port: 21,
    version: "ProFTPD 1.3.6",
    recommended_action: "Migrate FTP traffic to SFTP and decommission the listener.",
    ai_recommendations: "Legacy FTP has no business owner — schedule removal in the next window.",
    description: "Use-after-free in mod_sftp allows memory corruption.",
  },
  {
    id: 1035,
    cve: "CVE-2022-31813",
    service: "HTTP",
    severity: "Medium",
    priority: "P3",
    risk_score: 5.1,
    cvss: 5.9,
    epss: 0.12,
    port: 8080,
    version: "Apache 2.4.52",
    recommended_action: "Update Apache httpd to 2.4.54+.",
    ai_recommendations: "Validate X-Forwarded-* handling behind the load balancer.",
    description: "mod_proxy may drop X-Forwarded-* headers, bypassing IP-based authentication.",
  },
  {
    id: 1034,
    cve: "CVE-2023-51765",
    service: "SMTP",
    severity: "Medium",
    priority: "P3",
    risk_score: 4.8,
    cvss: 5.3,
    epss: 0.09,
    port: 25,
    version: "Postfix 3.7.4",
    recommended_action: "Enable smtpd_forbid_bare_newline.",
    ai_recommendations: "Add DMARC enforcement to reduce spoofing impact of SMTP smuggling.",
    description: "SMTP smuggling allows spoofed email to bypass sender validation.",
  },
  {
    id: 1033,
    cve: "CVE-2019-11500",
    service: "SMTP",
    severity: "Low",
    priority: "P4",
    risk_score: 3.2,
    cvss: 3.7,
    epss: 0.04,
    port: 587,
    version: "Dovecot 2.3.7",
    recommended_action: "Upgrade Dovecot during routine maintenance.",
    ai_recommendations: "Low exploit likelihood — bundle with the next quarterly patch cycle.",
    description: "Improper NUL byte handling in IMAP/SMTP protocol parsing.",
  },
  {
    id: 1032,
    cve: "CVE-2018-15473",
    service: "SSH",
    severity: "Low",
    priority: "P4",
    risk_score: 2.9,
    cvss: 5.3,
    epss: 0.06,
    port: 22,
    version: "OpenSSH 7.6",
    recommended_action: "Upgrade to a supported OpenSSH release.",
    ai_recommendations: "Username enumeration only — monitor for spray attempts meanwhile.",
    description: "OpenSSH allows username enumeration through response timing differences.",
  },
];

export const demoAssets: Asset[] = [
  {
    id: 1,
    asset: "app.example.com",
    ip: "93.184.216.34",
    type: "Web App",
    ports: "80, 443",
    status: "Active",
    discovered_at: "2026-08-05T08:12:00Z",
  },
  {
    id: 2,
    asset: "vpn.example.com",
    ip: "93.184.216.61",
    type: "VPN Gateway",
    ports: "443, 4433",
    status: "Active",
    discovered_at: "2026-08-05T08:12:00Z",
  },
  {
    id: 3,
    asset: "mail.example.com",
    ip: "93.184.217.12",
    type: "Mail Server",
    ports: "25, 587, 993",
    status: "Active",
    discovered_at: "2026-08-05T08:13:00Z",
  },
  {
    id: 4,
    asset: "legacy-ftp.example.com",
    ip: "93.184.219.88",
    type: "File Transfer",
    ports: "21",
    status: "Unmanaged",
    discovered_at: "2026-08-05T08:13:00Z",
  },
  {
    id: 5,
    asset: "staging.example.com",
    ip: "10.24.8.19",
    type: "Web App",
    ports: "22, 8080",
    status: "Shadow IT",
    discovered_at: "2026-08-05T08:14:00Z",
  },
];
