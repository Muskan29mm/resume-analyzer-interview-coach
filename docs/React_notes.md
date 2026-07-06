 # **-----------------------------------------------------REACT---------------------------------------------------------**

 # React Notes

## 1. What is React?

### Definition

React is a JavaScript library used to build interactive and reusable user interfaces (UI)

### Why do we use it?

* To build interactive web applications.
* To create reusable UI components.
* To make applications easier to maintain.


## 2. What is Vite?

### Definition

Vite is a build tool that helps create and run React applications quickly.

### Why do we use it?

* Fast development server.
* Hot Reload.
* Easy project setup.


## 3. Component

### Definition

A component is a reusable JavaScript function that returns UI.

### Syntax

function App() {
return ( <h1>Hello</h1>
);
}

export default App;

### Why do we use it?

To divide the application into reusable parts.

### Where are we using it?

`App.jsx` is our first React component.

---

## 4. JSX

### Definition

JSX allows us to write HTML-like syntax inside JavaScript. 
JSX looks like HTML, but it is actually JavaScript syntax used by React.

### Example

<h1>Resume Analyzer</h1>

### Why do we use it?

It makes writing UI easier and more readable.

---

## 5. Hot Reload (HMR)

### Definition

Hot Module Replacement updates the browser automatically when we save changes.

### Benefit

No need to refresh the browser manually.

### 6. Import 

import Header from "./components/Header";

Definition:
Imports a component from another file.

Why?
To reuse components in different parts of the application

### 7. Export Default

export default Header;

Definition:
Makes a component available to other files.

Rule:
If we write:

import Header from "./components/Header";

Then Header.jsx must contain:

export default Header;

### 8. Component

A component is reusable javascript function that return UI

function Header() {
    return <h1>Hello</h1>;
}

export default Header;


### 9. React Naming Convention

- Component names always begin with a capital letter.
- Examples:
  - App
  - Header
  - Hero

HTML tags are lowercase:
- div
- h1
- p
- section

### 10. Props

Pass data from parent to child.
Props are read-only.
Improve reusability.

<SectionTitle
    badge="Features"
    title="Powerful AI Features"
    subtitle="Everything you need to optimize your resume."
/>

Receiving Props:
function SectionTitle({ badge, title, subtitle }) {
    ...
}