# Pokédex

Welcome to **Pokédex**, a Vue.js application designed to showcase and manage your favorite Pokémon. With this project, you can explore a list of Pokémon, mark your favorites, and access detailed information about each one. Built with performance, scalability, and clean code practices in mind, this app serves as a prime example of how to structure a modern front-end application.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Testing](#-testing)
- [Project Architecture](#-project-architecture)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## ✨ Features

- **Search and Filter Pokémon:**  
  Quickly find Pokémon by name or filter them to see your favorites.

- **Favorite Management:**  
  Mark Pokémon as favorites and persist them locally.

- **Responsive UI:**  
  Mobile-first design ensures a smooth experience on any device.

- **Copy to Clipboard:**  
  Easily share Pokémon details with a single click.

- **Seamless Navigation:**  
  Use Vue Router to switch between views effortlessly.

- **Loading Animations:**  
  A custom Pokéball loader provides visual feedback during data fetching.

---

## 💻 Technologies

- **Framework:** [Vue.js 3](https://vuejs.org/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **API:** [PokeAPI](https://pokeapi.co/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Icons:** Custom SVGs and Tailwind utilities for flexible styling.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/altguerrero/pokedex.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd pokedex
   ```
3. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

4. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

---

## 🛠️ Development

### Scripts

- **Start Development Server:**
  ```sh
  npm run dev
  ```
- **Build for Production:**
  ```sh
  npm run build
  ```
- **Lint Code:**
  ```sh
  npm run lint
  ```
- **Format Code:**
  ```sh
  npm run format
  ```

---

## 🧪 Testing

Unit tests are included for key components and stores to ensure reliability and maintainability. To run tests, use the following command:

```sh
npm run test:unit
```

---

## 🏗️ Project Architecture

- **`src/components`**:  
  Contains reusable UI components such as buttons, cards, and loaders.

- **`src/views`**:  
  Holds page-level components representing the main application views.

- **`src/stores`**:  
  Includes Pinia stores for managing application state.

- **`src/composables`**:  
  Provides custom logic hooks (composables) for modular code reuse.

- **`src/api`**:  
  Handles API calls and data-fetching logic.

- **`src/adapters`**:  
  Ensures consistent data formatting by adapting API responses into usable formats.

---

## 📸 Screenshots

- **Welcome View:**  
  ![Welcome](/public/images/welcome.png)

- **Pokémon List View:**  
  ![Pokémon List](/public/images/pokemons.png)

- **Favorites View:**  
  ![Favorites](/public/images/favorites.png)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**🎉 Thank you for exploring the Pokédex project!**  
If you have any questions or suggestions, feel free to open an issue on GitHub.
