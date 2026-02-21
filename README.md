# DigitalCraft Agency Landing Page

A modern, responsive, and interactive landing page for a creative digital agency built with HTML5, vanilla JavaScript, and Tailwind CSS v4.

## Features

- **Fully Responsive Design**: Fluid layout that looks great on mobile, tablet, and desktop devices.
- **Dynamic Theme Switcher**: Users can choose between 5 color themes (Default Indigo, Green, Red, Purple, Orange) which modify the primary, secondary, and accent colors across the entire site. The selected theme is saved to `localStorage`.
- **Interactive Chatbot Simulation**: A beautifully designed interactive chatbot widget with smart contextual responses, delay simulation, suggestion buttons, and bouncy typing indicators.
- **Testimonial Carousel**: Auto-playing testimonial carousel with pause-on-hover functionality and manual navigation controls.
- **Scroll Animations**: Elements fade and slide into view as the user scrolls down the page.
- **Sticky Header & Mobile Navigation**: The navigation bar hides on scroll down, shows on scroll up, and features a smooth slide-out menu for mobile devices.
- **Parallax Hero Section**: The background image of the hero section moves relative to scroll for a subtle depth effect.

## Tech Stack

- **HTML5**: Semantic markup structuring the document.
- **CSS**: [Tailwind CSS v4](https://tailwindcss.com/) for rapid utility-first styling. Custom properties setup in `input.css`. FontAwesome is included via CDN for icons. Google Fonts (Poppins) is used for typography.
- **JavaScript (Vanilla)**: Handles UI interactions like scroll animations, theme switching, the chatbot, the mobile menu, the carousel, and the FAQ accordion. No heavy JS frameworks required.

## Folder Structure

```
├── index.html       # The main HTML structure
├── input.css        # The source CSS file containing Tailwind imports and theme variables
├── script.js        # The JavaScript for interactions and animations
├── package.json     # Node.js dependencies (Tailwind CLI)
└── README.md        # Project documentation
```

## Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed to run the Tailwind CSS compiler.

### Installation & Running

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Watch for CSS changes** (Development):
   Generate the `output.css` file and watch for changes using the Tailwind CLI.

   ```bash
   npx @tailwindcss/cli -i ./input.css -o ./output.css --watch
   ```

3. **View the site**:
   Open `index.html` in your web browser, or serve it using a local development server like VS Code's "Live Server" extension, HTTP-Server, or similar tools.

## Development

- **Modifying Colors**: You can update the base CSS variables in `input.css` under the `@theme` directive, or add/modify the JavaScript themes object in `script.js` under the `themeColors` variable.
- **Modifying Content**: All copy, images, and content are present directly in `index.html`. You can replace the placeholder Unsplash images with your own project assets.

## License

This project is licensed under the MIT License.
