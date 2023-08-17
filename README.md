# TS Microservice Project Initializer

TS Microservice Project Initializer is a tool designed to help you quickly set up and initialize TypeScript-based microservices projects. It automates the process of creating project directories, installing dependencies, and configuring basic files, allowing you to jumpstart your microservices development with ease.

## Features

- Initializes a TypeScript microservices project with a predefined directory structure.
- Sets up a basic `jest.config.js` for testing using Jest.
- Installs and configures Jest for unit and integration testing.
- Generates a `tsconfig.build.json` file for building the project.
- Adds commonly used scripts to your `package.json` for testing, development, and building.
- Integrates with `nodemon` for convenient development server auto-restart.
- Initializes a Git repository for version control.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager) installed on your system.

### Installation

To create a new TypeScript microservices project using this initializer, open your terminal and run:

```sh
npx ts-microservices my-microservice-project
```

Replace my-microservice-project with your desired project name.

- Run tests:
```sh
npm test
```
- Start development server (requires nodemon):
```sh
npm run dev
```
- Build the project:
```sh
npm run build
```

Feel free to customize the project structure, files, and scripts to suit your specific requirements.

## Contributing
Contributions are welcome! If you have suggestions, enhancements, or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.