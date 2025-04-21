# Muhammad Rafiq Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. This portfolio showcases my projects, skills, and professional background in a clean and interactive interface with PWA support.

## 📋 Features

- **Responsive Design:** Works perfectly on all devices from mobile to desktop
- **Progressive Web App (PWA):** Installable and works offline with service worker support
- **Modern UI:** Beautiful gradient backgrounds with smooth scrolling and animations
- **Interactive Sections:** Home, About, Projects, and Contact sections
- **Dynamic Project Showcase:** Display projects with descriptions and technologies used
- **Skills Categories:** Organized skills display with interactive tabs
- **AI-Powered Chatbot:** Interactive assistant that answers questions about my experience and skills
- **Social Media Integration:** Easy access to all professional profiles
- **Typewriter Effect:** Engaging animated text on the home page
- **Archive Projects Page:** View all projects in a dedicated page
- **Resume Access:** Quick link to download/view resume

## 🛠️ Technologies Used

- **React 18** - Frontend library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - For navigation and routing
- **React Icons** - Icon library
- **React Scroll** - For smooth scrolling to page sections
- **Typewriter Effect** - For animated text typing
- **Google Gemini AI** - For powering the AI chatbot assistant
- **Vite PWA Plugin** - For Progressive Web App capabilities
- **EmailJS** - For contact form functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/Rafiqdevhub/Rafiqdev.git
cd Rafiqdev
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
├── public/            # Public assets
│   ├── manifest.json  # PWA manifest file
│   ├── Rafiq.PNG      # App icon
│   ├── robots.txt     # SEO configuration
│   ├── sitemap.xml    # SEO sitemap
│   └── sw.js          # Service Worker for PWA functionality
│
├── src/
│   ├── Assets/        # Static assets
│   │   ├── images/    # Image files
│   │   └── svg/       # SVG icons for skills
│   │
│   ├── components/    # Reusable UI components
│   │   ├── Cards.jsx  # Project card component
│   │   ├── Chatbot.jsx# AI assistant component
│   │   ├── Footer.jsx # Footer component
│   │   └── Header.jsx # Navigation header
│   │
│   ├── data/          # Data files
│   │   ├── ProjectsList.js  # Project information
│   │   ├── SkillsData.js    # Skills list
│   │   └── UserData.js      # Personal information
│   │
│   ├── pages/         # Page components
│   │   ├── About.jsx        # About page
│   │   ├── ArchiveProjects.jsx  # Projects archive
│   │   ├── Contact.jsx      # Contact page
│   │   ├── Home.jsx         # Home page
│   │   └── Project.jsx      # Projects section
│   │
│   ├── utils/         # Utility functions
│   │   ├── chatbotResponses.js  # Chatbot logic
│   │   ├── geminiAI.js      # Google AI integration
│   │   ├── SkillsImage.js   # Skill icons mapping
│   │   └── serviceWorkerRegistration.js # PWA registration
│   │
│   ├── App.css        # Global styles
│   ├── App.jsx        # Main App component
│   └── main.jsx       # Entry point
│
├── build.js           # Custom build script
├── copy-pwa-assets.js # PWA asset preparation script
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── vercel.json        # Vercel deployment config
└── netlify.toml       # Netlify deployment config
```

## 📄 Customization

### Personal Information

Edit the data files in the `src/data` directory:

- `UserData.js` - Your personal information, social links, resume URL, and typewriter options
- `ProjectsList.js` - Your projects with descriptions, technologies, and GitHub links
- `SkillsData.js` - Your technical skills organized by category

### Images

Replace the images in the `src/Assets/images` directory with your own:

- `Rafiq.PNG` - Your profile icon (also used for PWA)
- `AboutImage.png` - Image shown in the About section
- `RafiqImage.svg` - Your main profile image on the Home page

### Colors & Styling

The main styling is defined in:

- `src/App.css` - Contains CSS variables for theme colors and animations
- `tailwind.config.js` - Custom Tailwind CSS configuration including animations and breakpoints

### AI Chatbot

The chatbot is powered by Google Gemini AI. To customize:

1. Edit the responses in `src/utils/chatbotResponses.js`
2. Modify the AI context in `src/utils/geminiAI.js`

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_EMAIL_SERVICE_ID=your_emailjs_service_id
VITE_EMAIL_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAIL_PUBLIC_KEY=your_emailjs_public_key
```

## 📦 Build for Production

The project includes a custom build script with optimizations:

```bash
npm run build
# or
yarn build
```

This will:

1. Clean previous build artifacts
2. Copy PWA assets and configuration files
3. Build the project with Vite optimizations
4. Generate a build report

The output will be in the `dist_new` directory which is configured for deployment in `vercel.json`.

## 🚢 Deployment

This portfolio is configured for multiple deployment platforms:

### Vercel (Recommended)

- Already configured with `vercel.json`
- Connect your GitHub repository to Vercel
- Set the output directory to `dist_new`

### Netlify

- Configured with `netlify.toml`
- Connect your GitHub repository to Netlify
- The build command and publish directory are already set

### Self-hosting

- The build script generates optimal Apache server configuration
- Upload the contents of `dist_new` to your web server
- Make sure to configure proper routing for SPA

## 🌐 Browser Compatibility

This portfolio is optimized for modern browsers with:

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome for Android)

The PWA functionality allows users to install the portfolio as an app on compatible devices.

## ⚡ Performance Optimizations

The portfolio includes several optimizations:

- Code splitting with React lazy loading
- Image optimization with vite-imagetools
- PWA caching for offline access
- Tailwind CSS purging for minimal CSS
- Custom animations with minimal performance impact
- Memoized components for reduced re-renders

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Muhammad Rafiq - [rafkhan9323@gmail.com](mailto:rafkhan9323@gmail.com)

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
