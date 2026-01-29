# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 3.1.x   | :white_check_mark: |
| 3.0.x   | :white_check_mark: |
| < 3.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Send an email to: **dominiktyrnel@gmail.com**
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes (optional)

### What to Expect

- **Response Time**: You can expect an initial response within 48 hours
- **Updates**: You will receive updates on the progress every 5-7 days
- **Resolution**: Once fixed, you will be credited (if desired) in the release notes

### Scope

This security policy applies to:
- The main web application (React/TypeScript frontend)
- Firebase Cloud Functions
- Study Bot (Node.js backend)

### Out of Scope

- Third-party dependencies (please report to respective maintainers)
- Issues in Firebase/Google Cloud infrastructure

## Security Best Practices

This project implements:
- Firebase Authentication for user management
- Firestore Security Rules for data access control
- Environment variables for sensitive configuration
- CORS restrictions on Cloud Functions

---

Thank you for helping keep this project secure!
