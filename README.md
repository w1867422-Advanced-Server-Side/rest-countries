# RestCountries Backend

Express + SQLite API with JWT authentication, per‑user API keys, and admin management — now containerized with Docker.

## Features

- **User Auth** via JWT
    - Register / Login / Profile endpoints
- **API Key Management** for each user
    - Generate, list, update, delete your own keys
    - Per‑key usage logging (count, last used)
- **Countries Endpoints** (proxy to [REST Countries](https://restcountries.com))
    - `/countries` and `/countries/:name` protected by `x-api-key`
- **Admin Functions** (role `admin`)
    - Manage **all** users (view, change role, delete)
    - Manage **all** API keys (view usage, toggle, delete)
- **Error Handling** with consistent JSON responses
- **Dockerized** using the included `Dockerfile` for easy setup

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Docker](#docker)
4. [API Reference](#api-reference)

---

## Prerequisites

- Node.js 18+
- npm or yarn
- (optional) Docker & Docker Compose

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/w1867422-Advanced-Server-Side/w1867422-rest-countries.git
   cd w1867422-rest-countries
   
2. **Install dependencies**
    ```bash
    npm install

## Docker
**A Dockerfile and .dockerignore are included for containerization.**

1. **Build the image**
    
    ```bash
   docker build -t restcountries-backend .
   
## Api Reference
1. **Import openapi.yaml into a Swagger UI instance or view it via:**
    ```bash
   http://localhost:3000/api-docs
