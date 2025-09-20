# E-Cell NCE Website

## Overview

This is a React-based web application for the Entrepreneurship Cell (E-Cell) of Nalanda College of Engineering. The application serves as a platform for the student-driven entrepreneurship community, providing features for member interaction, event management, and content sharing. The website is designed with a modern educational institution aesthetic, taking inspiration from established E-Cell websites like IIT Bombay's, while maintaining a professional yet dynamic brand identity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React architecture with the following key components:

- **Framework**: React 18 with TypeScript for type safety and better development experience
- **Routing**: Wouter for lightweight client-side routing with support for Home, Post, Events, and Profile pages
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Form Handling**: React Hook Form with Hookform resolvers for form validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The backend follows a simple Express.js server architecture:

- **Framework**: Express.js with TypeScript
- **Architecture Pattern**: RESTful API design with route-based organization
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) that can be easily swapped for database integration
- **Development Environment**: Hot reload with Vite integration for seamless full-stack development

### Data Storage Solutions
- **Current Implementation**: In-memory storage using JavaScript Map for user data and localStorage for client-side persistence
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions for users table
- **Schema Design**: User entity with username/password authentication structure, extensible for additional profile fields

### Component Architecture
- **Design System**: Centralized component library using shadcn/ui with consistent styling and behavior
- **Layout Structure**: Fixed header navigation, main content areas, and bottom navigation for mobile-first design
- **State Patterns**: Local component state for UI interactions, React Query for data fetching, localStorage for persistence

### Authentication and Authorization
- **Current State**: Basic user schema defined with username/password structure
- **Implementation**: Storage interface includes user creation and retrieval methods
- **Future Ready**: Session management and authentication middleware can be easily integrated

### Styling and Theming
- **Design Tokens**: CSS custom properties for consistent theming across components
- **Color System**: Blue-purple gradient brand palette with light/dark mode support
- **Typography**: Inter and Poppins font families for modern, readable typography
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built accessible component library based on Radix UI primitives
- **Radix UI**: Headless component primitives for accessibility and keyboard navigation
- **class-variance-authority**: Utility for creating variant-based component APIs

### Development and Build Tools
- **Vite**: Fast build tool with hot module replacement for development
- **TypeScript**: Static type checking for better code quality and developer experience
- **ESBuild**: Fast JavaScript bundler used by Vite for production builds

### Database and ORM
- **Drizzle ORM**: Type-safe ORM for PostgreSQL with migration support
- **@neondatabase/serverless**: Serverless PostgreSQL driver for production deployment
- **Drizzle Kit**: CLI tools for database migrations and schema management

### State Management and Data Fetching
- **@tanstack/react-query**: Powerful data synchronization for React applications
- **React Hook Form**: Performant forms library with minimal re-renders

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: URL-safe unique string ID generator

### Development Environment
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for better debugging experience
- **tsx**: TypeScript execution environment for Node.js development