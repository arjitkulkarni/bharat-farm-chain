# KisanConnect - Bharat Farm Chain

## 🌾 Project Overview

**KisanConnect** is a comprehensive agricultural platform designed to empower India's farming ecosystem by connecting farmers, vendors, and buyers through a transparent, AI-powered marketplace. Built with trust, traceability, and fair pricing at its core, the platform leverages blockchain technology, DPIN verification, and offline-first design to serve rural India.

## ✨ Key Features

### For Farmers 🚜
- **AI Soil Health Analysis**: Upload soil/leaf photos for instant health diagnostics and fertilizer recommendations
- **Direct Crop Listings**: Sell produce in 60 seconds with blockchain traceability
- **Vendor Connect**: Access verified suppliers for seeds, fertilizers, and tools
- **Buyer Connect**: Talk directly to verified buyers with privacy-protected contact reveals
- **Community Exchange**: Borrow/lend tools like tractors, pumps, and sprayers
- **Government Schemes**: Discover personalized schemes by district and crop type
- **Weather Integration**: Real-time weather updates with irrigation hints
- **Multi-language Support**: Full interface in English, Hindi (हिंदी), and Kannada (ಕನ್ನಡ)

### For Vendors 🏪
- **Product Listings**: Sell agricultural inputs with verified profiles
- **Crop Purchasing**: Buy directly from farmers at transparent rates
- **AI Recommendations**: Products suggested automatically based on farmer needs
- **Community Services**: Offer tractor rentals, tool lending, and irrigation services

### For Buyers 🛒
- **Verified Crop Discovery**: Search fresh produce with advanced filters
- **Secure Communication**: Request contact approval with masked numbers
- **Blockchain Traceability**: Full supply chain transparency for exports
- **Flexible Payments**: UPI, escrow, bank transfer, or cash on delivery

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn-ui components
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arjitkulkarni/bharat-farm-chain.git

# Navigate to project directory
cd bharat-farm-chain

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
bharat-farm-chain/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn-ui components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Footer component
│   │   └── PortalCard.tsx  # Role-based portal cards
│   ├── pages/              # Route pages
│   │   ├── Index.tsx       # Landing page
│   │   ├── Farmer.tsx      # Farmer portal dashboard
│   │   ├── Vendor.tsx      # Vendor portal
│   │   ├── Buyer.tsx       # Buyer portal
│   │   └── farmer/         # Farmer sub-pages
│   │       ├── Login.tsx
│   │       ├── CreateListing.tsx
│   │       ├── SoilAnalysis.tsx
│   │       └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── assets/             # Images and static files
│   ├── App.tsx             # Root component with routing
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
└── package.json
```

## 🌐 Multi-Language Support

The platform supports three languages with full UI translation:
- **English** (Default)
- **हिंदी** (Hindi)
- **ಕನ್ನಡ** (Kannada)

Language switching is available in the farmer dashboard header.

## 🔐 Security & Trust Features

- **Blockchain Traceability**: Every transaction and listing gets a unique hash
- **DPIN Verification**: Offline identity verification for low-network areas
- **Contact Approval System**: Privacy-protected buyer-farmer connections
- **Verified Profiles**: Government-backed vendor and farmer verification

## 🎯 Roadmap

- [ ] Backend API integration with Supabase
- [ ] Real AI soil analysis with computer vision
- [ ] SMS/OTP authentication system
- [ ] Payment gateway integration (UPI, escrow)
- [ ] PWA support for offline functionality
- [ ] Real-time chat between users
- [ ] Government scheme API integration
- [ ] Weather API integration (OpenWeatherMap)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built for HackKarnataka by the Bharat Farm Chain team.

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for India's farmers**
