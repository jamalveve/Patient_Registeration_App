# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


---

# Patient Registration App

A modern, browser-based patient registration and management system built with React, Vite, Tailwind CSS, and PGlite for client-side SQL storage. This app allows users to register patients, manage patient and user data, and run SQL queries directly in the browser.

---

## Features

- **Patient Registration:** Multi-step form for capturing detailed patient information.
- **User Authentication:** Register and log in with username and password.
- **SQL Query Panel:** Run custom SQL queries on patient and user databases (for admin/testing).
- **Responsive Design:** Works seamlessly on desktop and mobile.
- **Client-side Storage:** All data is stored securely in the browser using IndexedDB via PGlite.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

---

### Installation

1. **Clone the repository:**

   ```sh
   git clone 
   cd Patient_Registeration_App
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

---

### Running the App Locally

Start the development server:

```sh
npm run dev
# or
yarn dev
```

- The app will open at (http://localhost:5173) (or the port shown in your terminal).

---

### Building for Production

To create an optimized production build:

```sh
npm run build
# or
yarn build
```

- The build output will be in the `dist` directory.

---

### Previewing the Production Build

You can locally preview the production build with:

```sh
npm run preview
# or
yarn preview
```

---

### Deployment

- Deploy the contents of the `dist` folder to any static hosting service (e.g., Vercel, Netlify).
- For Vercel/Netlify: Set the build command to `npm run build` and the output directory to `dist`.

---

## Usage

- **Register Patients:** Fill out the registration form and submit.
- **Login:** Use your registered credentials to log in.
- **Query Panel:** Run SQL queries on user and patient data for admin/testing.
- **Navigation:** Use the sidebar/menu to access different sections.

---

## Developer Notes

- **Database:** Uses [PGlite](https://electric-sql.com/docs/pglite/) for browser-based SQL storage.
- **Styling:** Built with [Tailwind CSS](https://tailwindcss.com/).
- **State Management:** Utilizes React hooks and local storage for form persistence.
- **Data Storage:** All data is stored in your browser. Clearing browser storage will erase all records.

---

## Troubleshooting

- **Build errors:** Run `npm run build` locally to catch issues before deploying.
- **Case sensitivity:** Ensure filenames and import paths match exactly (important for Linux servers).
- **Browser storage:** Data is stored in IndexedDB; clearing browser storage or using incognito mode will remove all records.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


