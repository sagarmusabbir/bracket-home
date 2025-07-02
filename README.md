# Bracket home

![Bracket Home](https://img.shields.io/badge/Bracket%20Home-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

A modern media sharing application for local networks, designed for seamless photo and video sharing within home or office environments. Built with Next.js, PayloadCMS, and Tailwind CSS.

## 🌟 Features

- **Elegant User Interface**: Modern, responsive design with dark mode support
- **Media Management**: Upload, view, and share photos and videos
- **Local Network Optimized**: Designed for high-speed sharing within local networks
- **Multi-format Support**: Handles various image and video formats including MKV files
- **User Authentication**: Secure access control for media content
- **Admin Dashboard**: Comprehensive admin interface for content management
- **Mobile-First Design**: Optimized for both mobile and desktop experiences
- **Progressive Web App**: Installable on devices for app-like experience

## 🚀 Technologies

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: PayloadCMS, Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT-based auth system
- **Media Handling**: Sharp for image processing
- **Deployment**: Docker-ready configuration

## 📸 Screenshots

_Screenshots will be added soon_

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sagarmusabbir/bracket-home.git
   cd bracket-home
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your database and configuration settings.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. For local network access:
   ```bash
   npm run dev:network
   ```

## 🌐 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Network Deployment

```bash
npm run prod:network
```

## 🔧 Configuration

The application can be configured through environment variables:

- `DATABASE_URI`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for PayloadCMS
- `NEXT_PUBLIC_SERVER_URL`: URL for the server
- `PAYLOAD_PUBLIC_SERVER_URL`: Public URL for PayloadCMS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Musabbir Sagar**

- GitHub: [sagarmusabbir](https://github.com/sagarmusabbir)
- Website: [Third Bracket](https://thirdbracket.co.uk)

---

Developed with ❤️ by [Third Bracket](https://thirdbracket.co.uk)
