# Code Circuit Project

# Horizon - Business Management Platform

[Demo Video Link](https://www.loom.com/share/d5cd74e8121a4d80813fe1e56a79daac?sid=b7820873-28b0-489a-a533-c87f69eb5056)

## Overview

Horizon is a modern, feature-rich business management platform built with React, TypeScript, and Tailwind CSS. It provides a comprehensive suite of tools for businesses to manage their products, tasks, analytics, and customer relationships.

## Features

### 1. Product Management
- Interactive product catalog with filtering and search capabilities
- Product cards with availability status and pricing
- Bulk selection and cart management
- Responsive grid layout with animations
- Advanced filtering by category, availability, and price range

### 2. Dashboard Analytics
- Real-time business metrics and KPIs
- Interactive charts and graphs using Recharts
- Customizable time range views (daily/weekly/monthly)
- Key performance indicators:
  - Total Revenue
  - Customer Count
  - Task Completion Rate
  - Response Time Metrics

### 3. Task Management
- Drag-and-drop task organization
- Task status tracking
- Priority management
- Due date tracking
- Team collaboration features

### 4. User Interface
- Modern, responsive design
- Mobile-first approach
- Smooth animations and transitions
- Accessible components using Radix UI

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** 
  - Radix UI for accessible components
  - Shadcn UI for styled components
  - Framer Motion for animations
- **State Management:** React Context API
- **Routing:** React Router v6
- **Data Visualization:** Recharts
- **Form Handling:** React Hook Form with Zod validation
- **Development Tools:**
  - Vite for build tooling
  - ESLint for code linting
  - TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/horizon.git
cd horizon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── layout/        # Layout components (Navbar, Footer)
│   ├── products/      # Product-related components
│   ├── dashboard/     # Dashboard components
│   ├── tasks/         # Task management components
│   └── ui/            # Reusable UI components
├── pages/             # Page components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
└── styles/           # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Shadcn UI](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for animations 