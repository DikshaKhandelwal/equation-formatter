# Equation Formatter

## Overview
Equation Formatter is a React-based web application that allows users to input, preview, and format mathematical equations using LaTeX. The app provides a seamless experience for working with mathematical expressions in a visually appealing way.

## Features
- **Live LaTeX Equation Rendering**: Enter equations and see them rendered in real-time.
- **Equation History**: View previously entered equations.
- **Theme Selection**: Switch between different UI themes.
- **Smooth Animations**: Powered by Framer Motion.
- **GitHub Pages Deployment**: Easily accessible via GitHub Pages.
- **LaTeX Guide**: Provides users with a reference for LaTeX syntax and equation formatting.
- **Export Equations**: Save formatted equations as images or LaTeX code.
- **Copy to Clipboard**: Easily copy LaTeX equations for use in other applications.
- **Download Equations**: Download formatted equations as PNG or SVG files.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/equation-formatter.git
   cd equation-formatter
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`.

## Check it Out
The project is live at: [Equation Formatter](https://dikshakhandelwal.github.io/equation-formatter/)

## Dependencies
The project uses the following dependencies:
- [React](https://react.dev/) (UI framework)
- [Vite](https://vitejs.dev/) (Fast build tool)
- [react-latex-next](https://www.npmjs.com/package/react-latex-next) (LaTeX rendering)
- [KaTeX](https://katex.org/) (Math rendering engine)
- [mathjs](https://mathjs.org/) (Mathematical computations)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [React Icons](https://react-icons.github.io/react-icons/) (Icons for UI)

## Usage
- **Enter an equation** in LaTeX format in the input box.
- **Preview the formatted equation** in real-time.
- **Select different themes** using the ThemeSelector component.
- **View equation history** of previously entered expressions.
- **Export equations** as images or LaTeX code.
- **Copy equations** to clipboard.
- **Download formatted equations** in PNG format.

## Example Equations
Try these LaTeX equations in the app:
```latex
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
$$\int_a^b f(x) \,dx = F(b) - F(a)$$
$$e^{i\pi} + 1 = 0$$
```

## Build
To build the project for production:
```sh
npm run build
```

To preview the built files locally:
```sh
npx serve -s dist
```

## Contributing
Pull requests are welcome! If you’d like to contribute, please fork the repository and submit a PR.

## Author
Created by [Diksha Khandelwal](https://github.com/DikshaKhandelwal).

