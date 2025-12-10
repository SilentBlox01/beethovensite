# 🛡️ LibreShield - Privacy Protection Suite

A comprehensive privacy protection and cybersecurity education platform designed to empower users with knowledge and tools to protect their digital privacy and security online.

## 📋 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Privacy Assessment** - Interactive quiz to evaluate your privacy awareness and risk level
- **Security Tools** - Practical tools for password checking, encryption, and more
- **Image Lab** - Advanced image analysis and metadata inspection
- **Phishing Detection Guide** - Educational content on identifying phishing attempts
- **Privacy Hub** - Comprehensive privacy policies and best practices
- **Documentation** - Detailed guides and tutorials for digital safety
- **Dark Mode** - Eye-friendly dark theme with customizable accent colors
- **Multi-language Support** - Available in multiple languages
- **Element Inspector** - Developer-friendly element inspection tool
- **Open Source** - Free and open-source software

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd libreshield
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` directory.

## 📁 Project Structure

```
├── components/          # Reusable React components
│   ├── Layout.tsx      # Main layout wrapper with navbar and footer
│   └── ui/             # UI component library
├── context/            # React Context for global state management
│   └── AppContext.tsx  # Application-wide state (theme, language, etc.)
├── data/               # Static data and content
│   ├── content.ts      # Page content and copy
│   └── locales.ts      # Language translations
├── pages/              # Page components for each route
│   ├── Home.tsx        # Landing page
│   ├── Assessment.tsx  # Privacy assessment quiz
│   ├── Tools.tsx       # Security tools collection
│   ├── PrivacyHub.tsx  # Privacy resources
│   ├── ImageLab.tsx    # Image analysis tool
│   └── ...             # Other pages
├── App.tsx             # Main app component
├── index.tsx           # React entry point
├── version.ts          # Application version
└── vite.config.ts      # Vite configuration
```

## 🛠️ Technologies

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS framework

## 📦 Available Scripts

In the project directory, you can run:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Theme Colors

The app supports multiple theme colors. Customize the default theme in `AppContext.tsx`.

### Languages

Add or modify language translations in `data/locales.ts`.

### Content

Edit page content and copy in `data/content.ts`.

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open-source and free to use. Check the LICENSE file for more details.

## 📞 Support

For questions, issues, or suggestions, please open an issue on the repository.

---

**Version:** v0.0.0 | Made with ❤️ for digital privacy

