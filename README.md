# Alex Petrov's Portfolio Frontend

This is a Next.js project bootstrapped with `create-next-app`.

## Overview
This project showcases my portfolio, including a live chat application and landing page. It utilizes modern web technologies to deliver a seamless and responsive user experience.

### Landing Page
- Hosted on **Vercel** for optimized performance.
- Highlights portfolio projects and skills.
- Responsive design with Tailwind CSS.
- [Landing](https://www.alexspetrov.com)

### Chat Application
- Demo available at [Chat Demo](https://www.alexspetrov.com/chat).
- **Backend Hosted On**:
  - **Fly.io**: Handles user authorization and logs. ([Identia](https://github.com/alexxpetrov/identia-be), [Erdtree](https://github.com/alexxpetrov/erdtree))
  - **Vultr**: Ubuntu VPS serves as the chat application backend. ([Beef](https://github.com/alexxpetrov/beef))
- Utilizes **ConnectRPC** for robust communication between the client and server.
- Fully responsive UI built with Tailwind CSS.

### Kudos to Brittany Chiang
Stumbled across the portfolio https://github.com/bchiang7 Brittany Chiang did at https://brittanychiang.com and couldn't resist copying it for mine

## Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org) with App Router.
- **Frontend**: [React 18](https://reactjs.org) (to be upgraded to v 19).
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for utility-first styling.
- **Communication**: [Protocol Buffers (Protobuf)](https://protobuf.dev) and [ConnectRPC](https://connectrpc.com) for efficient server-client interaction. REST
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) for managing pre-commit hooks.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Prerequisites
Make sure you have the following installed:

- [Node.js](https://nodejs.org) (version 16 or higher).
- [pnpm](https://pnpm.io), [yarn](https://yarnpkg.com), or [bun](https://bun.sh) (optional).

### Setting Up
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio-frontend.git
   cd portfolio-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Linting & Formatting
This project uses **Husky** for pre-commit hooks and **ESLint** for code linting.

To lint and format your code:
```bash
npm run lint
npm run format
```

---

Thank you for checking out my portfolio project! For any questions, reach out via the contact form on the [landing page](https://www.alexspetrov.com).
