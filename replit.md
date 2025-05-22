# YouTube Clone Application

## Overview

This is a modern YouTube clone web application built with React, Express.js, and Drizzle ORM. The application provides a clean, responsive interface for browsing, searching, and watching YouTube videos through the YouTube Data API v3.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI primitives with shadcn/ui styling system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **API Integration**: YouTube Data API v3 proxy endpoints
- **Development**: Hot module replacement via Vite integration

### Database Architecture
- **Database**: PostgreSQL (configured via Drizzle)
- **Schema**: Simple user management system with username/password authentication
- **Migration Strategy**: Drizzle Kit for schema migrations

## Key Components

### Core Pages
- **Home Page**: Displays popular/trending YouTube videos
- **Search Page**: Handles video search with query parameters
- **Watch Page**: Video player interface with video details
- **404 Page**: Error handling for unknown routes

### UI Components
- **VideoGrid**: Responsive grid layout for video thumbnails
- **VideoCard**: Individual video display with metadata
- **VideoPlayer**: Embedded YouTube player with controls
- **Header**: Navigation with search functionality and theme toggle
- **Sidebar**: Navigation menu with collapsible functionality

### Utility Features
- **Theme System**: Light/dark mode with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoint handling
- **Search Functionality**: Real-time search with URL state management
- **Loading States**: Skeleton loading components and error handling

## Data Flow

### YouTube API Integration
1. Client makes requests to local Express server endpoints
2. Server proxies requests to YouTube Data API v3
3. API responses are forwarded back to client
4. React Query manages caching and state synchronization

### Search Flow
1. User enters search query in header
2. Navigation updates URL with query parameters
3. Search page component reads URL parameters
4. API request triggered via React Query
5. Results displayed in VideoGrid component

### Video Playback Flow
1. User clicks video thumbnail
2. Navigation to watch page with video ID parameter
3. Video details fetched from YouTube API
4. Embedded YouTube player loads with video

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **react-icons**: Icon library including YouTube branding

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles Express server to single file
3. **Assets**: Client build output served from Express static middleware

### Environment Configuration
- **Development**: Hot reload with Vite middleware integration
- **Production**: Compiled Express server serves static React build
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **YouTube API**: Requires YOUTUBE_API_KEY for video data access

### Hosting Requirements
- **Node.js**: Runtime environment for Express server
- **PostgreSQL**: Database for user management
- **Port Configuration**: Configurable via environment (default: 5000)
- **Static Assets**: Served via Express static middleware

### Key Architectural Decisions

#### Frontend Framework Choice
- **Problem**: Need for fast, modern React development
- **Solution**: Vite + React with TypeScript
- **Rationale**: Excellent developer experience, fast builds, and strong typing

#### Routing Solution
- **Problem**: Need lightweight routing without complex state management
- **Solution**: Wouter instead of React Router
- **Rationale**: Smaller bundle size, simpler API for this use case

#### State Management
- **Problem**: Managing server state and API caching
- **Solution**: TanStack Query for server state, React state for UI
- **Rationale**: Excellent caching, background updates, and error handling

#### UI Component Strategy
- **Problem**: Need consistent, accessible UI components
- **Solution**: Radix UI primitives with shadcn/ui patterns
- **Rationale**: Accessibility built-in, customizable styling, TypeScript support

#### API Architecture
- **Problem**: CORS and API key security for YouTube API
- **Solution**: Express proxy server with API key server-side
- **Rationale**: Secure API key handling, CORS resolution, request logging