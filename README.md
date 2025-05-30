# 🚀 Create Template App

Интерактивный CLI для генерации TypeScript-проектов с поддержкой Vue 3, Nuxt 3, React 19 и Next.js 14.  
Позволяет выбрать фреймворк, стейт-менеджер, UI-библиотеку, способ стилизации, линтер, инструменты тестирования и дополнительные Dev-инструменты.

---

## 📦 Установка и запуск

Запустить CLI можно напрямую из GitHub:

```bash
npx github:massume/afterlogic-template-app
```

Или локально:

```bash
git clone https://github.com/massume/afterlogic-template-app
cd afterlogic-template-app
npm install
npm link
afterlogic-template-app
```

---

## 🧩 Поддерживаемые фреймворки

| Фреймворк | Версия | Стек                      |
|----------|--------|----------------------------|
| Vue      | 3.x    | Vite + TypeScript          |
| Nuxt     | 3.x    | Nuxt 3 + TypeScript        |
| React    | 18.x   | Vite + TypeScript          |
| Next.js  | 15.x   | App Router + TypeScript    |

---

## 🔧 Опции CLI

В процессе запуска CLI предложит выбрать:

### ✅ Фреймворк
- `vue3`
- `nuxt3`
- `react18`
- `nextjs15`

---

### 🎨 Способ стилизации
(Зависит от выбранного фреймворка)

| Метод             | Поддержка фреймворков       |
|-------------------|-----------------------------|
| SCSS              | Все                         |
| CSS Modules       | Все                         |
| CSS-in-JS         | Только React/Next.js        |
| Styled Components | Только React/Next.js        |

---

### 🧠 State-менеджеры

| Vue / Nuxt        | React / Next             |
|-------------------|--------------------------|
| `pinia`, `vuex`   | `redux`, `mobx`, `rtk-query` |

---

### 💅 UI-библиотеки

- `tailwindcss`
- `@mui/material`
- `shadcn`
- `none` (без UI)

---

### 📐 ESLint

- ESLint с конфигом `airbnb-extended`
- Генерируется `.eslintrc.json`

---

### 🧹 Prettier

- Версия 3
- Генерируется `.prettierrc`

---

### 🧪 Тестирование

| Vue / Nuxt             | React / Next             |
|------------------------|--------------------------|
| `@testing-library/vue` | `@testing-library/react` |
| `jest`                 | `jest`                   |

- Генерируется `jest.config.js`

---

### 🧰 Дополнительные инструменты

- `sanity`
- `sonarqube-scanner`

---

## 📁 Что создаётся

- 📦 Установлены зависимости
- 📁 Скопирован шаблон под выбранный фреймворк
- 🎨 Добавлены стили и UI
- 🧪 Добавлены тестовые библиотеки
- 📐 Линтер и форматтер
- 📄 Сконфигурированы файлы:
  - `.eslintrc.json`
  - `.prettierrc`
  - `jest.config.js`
  - `tailwind.config.js`
  - `tsconfig.json`

---

## 🔍 Пример запуска

```bash
npx github:massume/afterlogic-template-app
```

```text
? Выберите фреймворк: › react18
? Выберите способ стилизации: › styled-components
? Выберите state-менеджер: › redux
? Выберите UI-библиотеку: › tailwind
? Установить ESLint с конфигом Airbnb? › Yes
? Установить Prettier? › Yes
? Добавить тестирование? › [jest, @testing-library/react]
? Дополнительные инструменты? › [sonar]
```

---

## 📬 Обратная связь

Pull Requests и Issues приветствуются!

**MIT License © Massume**
