# ITStart Test Task

This project is a Next.js application that can be run in both development mode and production mode with a pre-build step.
It is recommended to use [Bun](https://bun.sh/) as the package manager for better performance.

---

## Prerequisites

Before getting started, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 18 or higher is recommended)
- [Bun](https://bun.sh/) (optional but recommended for better performance)

You can use other package managers if needed, but all examples below will use Bun.

---

## Installation

To install the dependencies, first navigate to the [frontend](./frontend) folder and run the following command:

```bash
bun install
```

Then do the same in the [backend](./backend) folder.

## Running the Backend

To start the backend, run the following command:

```bash
bun run dev
```

## Running the Frontend in Development Mode

To start the frontend in development mode, run the following command:

```bash
bun run dev
```

## Building and Running the Frontend in Production Mode

To build the application for production, run the following command:

```bash
bun run build
```

After a successful build, start the application in production mode:

```bash
bun run start
```

The application will be available at **http://localhost:3000**.

## License

This project is licensed under the [GNU Affero General Public License v3.0](./LICENSE).
