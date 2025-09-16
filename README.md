<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  <b>♾️ Avatar Engine™</b><br/>
  A modular NestJS + MongoDB backend for powering avatars with identity, voice, humor, and progression.
</p>

<p align="center">
  <!-- Badges -->
  <img src="https://img.shields.io/badge/built%20with-NestJS-red" alt="NestJS"/>
  <img src="https://img.shields.io/badge/language-TypeScript-blue" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/database-MongoDB-green" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/auth-JWT%20%26%20Passport-yellow" alt="Auth"/>
  <img src="https://img.shields.io/badge/license-MIT-lightgrey" alt="License"/>
</p>

---

## 🧠 Description

The **Avatar Engine™** is a backend framework built with NestJS and Mongoose.  
It provides gamified, AI-ready avatars with:

- Core identity + progression (XP, levels, rarity)
- Voice profiles (emotion-based clips)
- Humor module (profiles + random quotes)
- Multi-tenant support for app-agnostic deployments
- JWT auth + role-based access (user, mod, admin)

Designed for scalability, this engine is the backbone for platforms like **Combat Confidence™** and **JavaScript Jungle™**.

---

## 🔗 Quick Links

- **API Docs (Swagger)** → `http://localhost:3000/api` (after running `yarn start:dev`)
- **Firebase Emulator UI** → `http://127.0.0.1:4000`
- **Postman Collection** → [./postman/avatar-engine.postman_collection.json](./postman/avatar-engine.postman_collection.json)
- **GitHub Issues** → [GoReala23/avatar-engine/issues](https://github.com/GoReala23/avatar-engine/issues)

---

## 🧰 Getting Started

Clone the repo, install dependencies, and fire up the dev server.

## 🚀 Project setup

```
# install dependencies
$ yarn install
```

## 🏃 Compile and run

```
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## 🧪 Testing

```
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# coverage
$ yarn test:cov
```

## 📂 Project structure

```
src/
 ├── auth/         # JWT login, logout placeholder, role guards
 ├── users/        # user schema, profile mgmt, bonds
 ├── avatars/      # core CRUD, XP, voice, humor
 └── app.module.ts # root wiring
```

## 📦 Modules

- **auth/** → Handles authentication with JWT + Passport, role guards, and (future) logout/blacklist support.
- **users/** → User schema and profile management, including bonds, roles, and references.
- **avatars/** → Core avatar logic: CRUD, XP leveling, humor profiles, and voice behaviors.
- **app.module.ts** → Main application wiring; imports and ties all modules together.

## 🛠 Tools & Libraries

- NestJS – modular backend framework
- TypeScript – type safety and scalability
- MongoDB + Mongoose – database + ODM
- Passport + JWT – authentication
- bcrypt – password hashing
- @nestjs/swagger – API documentation
- @nestjs/config – environment variable management
- Jest + Supertest – testing suite
- Firebase Emulator – local testing for auth/firestore/storage

## 🔒 Security notes

- Never commit .env files (JWT_SECRET, DB URIs, etc.).
- Passwords are hashed with bcrypt.
- All protected routes require valid JWT + role check.

## 🌍 Status

✅ Core modules complete

✅ Auth + User modules wired

✅ Avatars (core, voice, humor) functional

🚧 AI extensions and advanced features in progress

## 🛣️ Roadmap

🤖 AI-powered avatars (dynamic responses + teaching styles)

🎭 Advanced behavior profiles (animations, interactions)

📡 Multi-tenant dashboard + admin tools

🔗 Integration with external platforms (LinkedIn, Google, Apple login)

🚀 Deploy to cloud (Docker + CI/CD)

## 📜 License

MIT – open for use, modification, and extension.

> “Real Code Realized™ — powering avatars with logic and lore.”
