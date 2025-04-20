# Rafiq Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. This portfolio showcases my projects, skills, and professional background in a clean and interactive interface.

## 📋 Features

- **Responsive Design:** Works perfectly on all devices from mobile to desktop
- **Modern UI:** Beautiful gradient backgrounds with smooth scrolling and animations
- **Interactive Sections:** Home, About, Projects, and Contact sections
- **Dynamic Project Showcase:** Display projects with descriptions and technologies used
- **Skills Marquee:** Animated display of skills with corresponding icons
- **Social Media Integration:** Easy access to all professional profiles
- **Typewriter Effect:** Engaging animated text on the home page
- **Archive Projects Page:** View all projects in a dedicated page
- **Resume Access:** Quick link to download/view  resume

## 🛠️ Technologies Used

- **React 18** - Frontend library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - For navigation and routing
- **React Icons** - Icon library
- **React Scroll** - For smooth scrolling to page sections
- **Typewriter Effect** - For animated text typing
- **React Fast Marquee** - For the skills carousel
- **Framer Motion** - For animations (included in dependencies)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rafiqdevhub/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
src/
├── Assets/            # Images, SVGs, and other static files
├── components/        # Reusable components
├── data/              # Data files (user info, projects, skills)
├── pages/             # Page components
├── utils/             # Utility functions
├── App.css            # Global styles
├── App.jsx            # Main App component
└── main.jsx          # Entry point
```

## 📄 Customization

### Personal Information
Edit the data files in the `src/data` directory:
- `UserData.jsx` - Your personal information, social links, and typewriter options
- `ProjectsList.jsx` - Your projects with descriptions and technologies
- `SkillsData.jsx` - Your technical skills

### Images
Replace the images in the `src/Assets/images` directory with your own.

### Colors & Styling
The main styling is defined in `src/App.css` and Tailwind configuration in `tailwind.config.js`.

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

This will generate a `dist` folder with all your optimized and minified files ready for deployment.

## 🚢 Deployment

This portfolio can be easily deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages
- AWS Amplify

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
