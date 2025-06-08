#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRAMEWORKS = ["vue3", "nuxt3", "react18", "nextjs15"];

const STATE_MANAGERS = {
  vue3: ["pinia@^2.1.6", "vuex@^4.1.0"],
  nuxt3: ["pinia@^2.1.6", "vuex@^4.1.0"],
  react18: ["@reduxjs/toolkit@^2.1.1", "redux@^5.0.1", "mobx@^6.11.0"],
  nextjs15: ["@reduxjs/toolkit@^2.1.1", "redux@^5.0.1", "mobx@^6.11.0"],
};

const UI_LIBS = {
  tailwind: "tailwindcss@^3.4.1",
  mui: "@mui/material@^5.15.0",
  shadcn: "class-variance-authority@^0.7.0",
  none: null,
};

const TEST_TOOLS = {
  vue3: ["jest", "@testing-library/vue"],
  nuxt3: ["jest", "@testing-library/vue"],
  react18: ["jest", "@testing-library/react"],
  nextjs15: ["jest", "@testing-library/react"],
};

async function run() {
  console.log(chalk.cyanBright("🔧 Генератор TypeScript-проекта"));

  const { framework } = await inquirer.prompt({
    type: "list",
    name: "framework",
    message: "Выберите фреймворк:",
    choices: FRAMEWORKS,
  });

  const { state } = await inquirer.prompt({
    type: "list",
    name: "state",
    message: "Выберите state-менеджер:",
    choices: STATE_MANAGERS[framework],
  });

  const { ui } = await inquirer.prompt({
    type: "list",
    name: "ui",
    message: "Выберите UI-библиотеку:",
    choices: Object.keys(UI_LIBS),
  });

  const { useEslint } = await inquirer.prompt({
    type: "confirm",
    name: "useEslint",
    message: "Установить ESLint с конфигом Airbnb?",
    default: true,
  });

  const { usePrettier } = await inquirer.prompt({
    type: "confirm",
    name: "usePrettier",
    message: "Установить Prettier?",
    default: true,
  });

  const { testTools } = await inquirer.prompt({
    type: "checkbox",
    name: "testTools",
    message: "Добавить тестирование?",
    choices: TEST_TOOLS[framework],
  });

  const { tools } = await inquirer.prompt({
    type: "checkbox",
    name: "tools",
    message: "Дополнительные инструменты:",
    choices: ["sanity", "sonar"],
  });

  
  const { projectName } = await inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "Введите имя проекта (будет создана папка):",
    validate: input => input ? true : "Имя проекта не может быть пустым"
  });

  const projectDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, "../templates", framework);


  console.log(chalk.green(`📁 Копируем шаблон: ${framework}`));
  await fs.copy(templateDir, projectDir);
  // Обновление имени в package.json
  const pkgPath = path.join(projectDir, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }


  process.chdir(projectDir);

  console.log(chalk.blue("📦 Установка базовых зависимостей..."));
  // Копирование общих конфигов
  const configBasePath = path.resolve(__dirname, "../config-templates");

  if (useEslint) {
    await fs.copy(path.join(configBasePath, ".eslintrc.json"), path.join(projectDir, ".eslintrc.json"));
  }

  if (usePrettier) {
    await fs.copy(path.join(configBasePath, ".prettierrc"), path.join(projectDir, ".prettierrc"));
  }

  if (testTools.includes("jest")) {
    await fs.copy(path.join(configBasePath, "jest.config.js"), path.join(projectDir, "jest.config.js"));
  }

  if (ui === "tailwind") {
    await fs.copy(path.join(configBasePath, "tailwind.config.js"), path.join(projectDir, "tailwind.config.js"));
  }

  // Всегда копируем базовый tsconfig
  await fs.copy(path.join(configBasePath, "tsconfig.json"), path.join(projectDir, "tsconfig.json"));

  await execa("npm", ["install"]);

  if (state) {
    console.log(chalk.blue(`🔧 Установка ${state}`));
    await execa("npm", ["install", state]);
  }

  if (ui !== "none") {
    const uiPkg = UI_LIBS[ui];
    console.log(chalk.blue(`🎨 Установка ${ui}`));
    await execa("npm", ["install", uiPkg]);
  }

  if (useEslint) {
    console.log(chalk.yellow("📐 Установка ESLint (Airbnb-compatible)"));
    await execa("npm", [
      "install",
      "-D",
      "eslint@^8.57.0",
      "eslint-config-airbnb@^19.0.4",
      "eslint-config-airbnb-typescript@^17.1.0",
      "eslint-plugin-import@^2.29.1",
      "eslint-plugin-react@^7.34.1",
      "eslint-plugin-react-hooks@^4.6.0",
      "eslint-plugin-jsx-a11y@^6.8.0",
      "typescript"
    ]);
  }

  if (usePrettier) {
    console.log(chalk.yellow("🧹 Установка Prettier"));
    await execa("npm", ["install", "-D", "prettier@^3.2.5"]);
  }

  if (testTools.includes("jest")) {
    console.log(chalk.magenta("🧪 Установка Jest"));
    await execa("npm", ["install", "-D", "jest@^29.7.0", "ts-jest@^29.1.1"]);
  }

  if (testTools.includes("@testing-library/react")) {
    console.log(chalk.magenta("🧪 Установка React Testing Library"));
    await execa("npm", ["install", "-D", "@testing-library/react@^14.1.2"]);
  }

  if (testTools.includes("@testing-library/vue")) {
    console.log(chalk.magenta("🧪 Установка Vue Testing Library"));
    await execa("npm", ["install", "-D", "@testing-library/vue@^8.1.0"]);
  }

  if (tools.includes("sanity")) {
    console.log(chalk.green("🧠 Установка Sanity"));
    await execa("npm", ["install", "sanity@^3.26.1"]);
  }

  if (tools.includes("sonar")) {
    console.log(chalk.green("📊 Установка Sonar Scanner"));
    await execa("npm", ["install", "-D", "sonarqube-scanner@^2.8.0"]);
  }

  console.log(chalk.greenBright("\n✅ Проект успешно создан без конфликтов!"));
}

run().catch((err) => {
  console.error(chalk.red("Ошибка:"), err);
});
