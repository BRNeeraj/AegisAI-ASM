# Aegis AI Dashboard

Build a modern enterprise-grade Cybersecurity Attack Surface Management (ASM) Dashboard called AegisAI-ASM.

Tech Stack:

- React

- Vite

- Tailwind CSS

- React Router

- Axios

- Recharts

- Lucide Icons

Theme:

- Dark cybersecurity theme

- Blue and cyan accents

- Glassmorphism cards

- Responsive design

- Smooth animations

The application has the following pages.

1. Login Page

- Email

- Password

- Login Button

- Modern security illustration

- Redirect to Dashboard after login

2. Register Page

- Name

- Email

- Password

- Confirm Password

- Register Button

3. Dashboard

Top cards:

• Total Assets

• Total Vulnerabilities

• Average Risk Score

• Critical Vulnerabilities

Charts:

• Pie Chart

    Critical

    High

    Medium

    Low

• Bar Chart

    Vulnerabilities by Service

    HTTP

    HTTPS

    SSH

    FTP

    SMTP

Recent Vulnerabilities Table

Columns:

ID

CVE

Service

Severity

Priority

Risk Score

CVSS

Show latest 10 vulnerabilities.

4. Asset Discovery Page

Input:

Domain/IP

Button:

Discover

Display discovered assets in a table.

5. Vulnerability Scanner Page

Input:

Domain/IP

Button:

Scan

Display results inside expandable cards.

Each vulnerability card should show

Port

Service

Version

Severity

CVE

CVSS

EPSS

Risk Score

Priority

Recommended Action

AI Recommendations

Description

Use colored badges

Critical = Red

High = Orange

Medium = Yellow

Low = Green

Navigation

Left Sidebar

Dashboard

Asset Discovery

Vulnerability Scanner

Settings

Profile

Logout

Backend API Base URL

http://127.0.0.1:8000

Endpoints

POST /auth/login

POST /auth/register

GET /dashboard/summary

GET /dashboard/priority-stats

GET /dashboard/service-stats

GET /dashboard/recent-vulnerabilities

POST /assets/discover

POST /vulnerabilities/scan

Use Axios for all API calls.

Use loading spinners while waiting for API responses.

Handle API errors using toast notifications.

The UI should look similar to Microsoft Defender, CrowdStrike Falcon, Palo Alto Cortex XDR and Tenable dashboards.

Produce clean production-ready React code.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d686fb41-dfcc-43a8-b955-8eeac926017e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
