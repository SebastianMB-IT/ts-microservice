#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function createProjectStructure(projectName) {
  console.log(`Creating project structure for ${projectName}...`);

  // Create project directory
  fs.mkdirSync(projectName);
  process.chdir(projectName);

  // Run `npm init -y`
  execSync("npm init -y");

  // Add scripts to package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = require(packageJsonPath);
  packageJson.scripts = {
    test: "npx jest",
    dev: "npx nodemon",
    build: "rimraf ./dist && tsc -p ./tsconfig.build.json",
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Install typescript
  execSync("npm install --save-dev typescript");
  execSync("npx tsc --init --rootDir src --outDir dist");

  // Create the typescript config file for the build
  const tsconfigBuildContent = {
    extends: "./tsconfig",
    exclude: ["node_modules", "test", "dist"],
  };
  fs.writeFileSync(
    "tsconfig.build.json",
    JSON.stringify(tsconfigBuildContent, null, 2)
  );

  // Create the source directory
  execSync("mkdir src");

  // Install nodemon and ts-node
  execSync("npm install --save-dev ts-node nodemon");

  // Create the nodemon configuration file
  const nodemonConfigContent = {
    watch: "src",
    ext: ".ts,.js",
    ignore: [],
    exec: "npx ts-node ./src/index.ts",
  };
  fs.writeFileSync(
    "nodemon.json",
    JSON.stringify(nodemonConfigContent, null, 2)
  );

  // Install rimraf
  execSync("npm install --save-dev rimraf");

  // Install jest
  execSync("npm install --save-dev jest");
  execSync(`yes '' | npx jest --init`);

  // Modify jest.config.js preset
  const jestConfigPath = path.join(process.cwd(), "jest.config.js");
  let jestConfigContent = fs.readFileSync(jestConfigPath, "utf-8");
  jestConfigContent = jestConfigContent.replace(
    "// preset: undefined",
    'preset: "ts-jest"'
  );
  fs.writeFileSync(jestConfigPath, jestConfigContent);

  // Create basic files
  fs.writeFileSync("README.md", `# ${projectName}`);
  fs.writeFileSync("./src/index.ts", 'console.log("Hello, world!");');

  // Initialize Git repository
  execSync("git init -q 2>/dev/null");
  execSync("git add .");
  execSync('git commit -m "Initial commit"');
}

const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide a project name.");
  process.exit(1);
}

createProjectStructure(projectName);
console.log("Project initialization complete!");
