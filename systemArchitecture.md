
# System Architecture

## Overview

This document provides a high-level overview of the system architecture of the Performance Optimization Guide application. The architecture follows a client-side focused approach with Supabase handling authentication and data storage.

## Core Components Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                         Client Application                         │
│                                                                   │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐    │
│   │             │     │             │     │                 │    │
│   │    Pages    │◄────┤  Components │◄────┤ UI Components   │    │
│   │             │     │             │     │                 │    │
│   └──────┬──────┘     └──────┬──────┘     └─────────────────┘    │
│          │                   │                                    │
│          ▼                   ▼                                    │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐    │
│   │             │     │             │     │                 │    │
│   │   Context   │◄────┤    Hooks    │◄────┤    Services     │    │
│   │             │     │             │     │                 │    │
│   └─────────────┘     └─────────────┘     └────────┬────────┘    │
│                                                    │              │
└────────────────────────────────────────────────────┼──────────────┘
                                                     │
                                                     ▼
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│                         Supabase Backend                          │
│                                                                   │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐    │
│   │             │     │             │     │                 │    │
│   │ Auth Service│────▶│   Database  │────▶│  Storage        │    │
│   │             │     │             │     │                 │    │
│   └──────┬──────┘     └─────────────┘     └─────────────────┘    │
│          │                                                        │
│          ▼                                                        │
│   ┌─────────────┐                                                │
│   │             │                                                │
│   │ OAuth (GitHub)                                               │
│   │             │                                                │
│   └─────────────┘                                                │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Client Application

#### Pages
- **Index.tsx**: Main landing page with guide navigation
- **AuthPage.tsx**: Authentication page for login/registration
- **Dashboard.tsx**: User dashboard with personalized content
- **NotFound.tsx**: 404 error page

#### Components
- **Section Components**: Content sections for the guide
- **Navigation Components**: For moving between sections
- **UserProfile**: Displays user information
- **GitHubLoginButton**: Handles OAuth authentication

#### UI Components
- **shadcn/ui Components**: Reusable interface elements
- **Custom UI Components**: Application-specific interface elements

#### Context
- **UserContext**: Authentication state management

#### Hooks
- **use-toast**: For notification management
- **use-mobile**: For responsive design

#### Services
- **authService**: Handles authentication flows

### Supabase Backend

#### Auth Service
- **GitHub OAuth**: Social authentication
- **Session Management**: User session handling

#### Database
- **User Data**: Profile information
- **Application Data**: Guide content and user preferences

#### Storage
- **Assets**: Images and other media

## Data Flow

1. **Authentication Flow**:
   ```
   User → GitHub OAuth → Supabase Auth → Application
   ```

   When a user authenticates:
   1. They click the GitHub login button
   2. They're redirected to GitHub for authorization
   3. GitHub redirects back to the application with an auth code
   4. Supabase exchanges this code for a token
   5. The UserContext is updated with the authenticated user state

2. **Protected Content Access**:
   ```
   User Request → ProtectedRoute → Auth Check → Content or Redirect
   ```

   When a user accesses protected content:
   1. The request is intercepted by the ProtectedRoute component
   2. It checks authentication status in UserContext
   3. If authenticated, it allows access to the content
   4. If not authenticated, it redirects to the auth page

## Deployment Architecture

The application is deployed using Lovable's hosting service:

```
┌───────────────────┐     ┌───────────────────┐
│                   │     │                   │
│   Build Process   │────▶│   CDN / Hosting   │
│                   │     │                   │
└───────────────────┘     └───────────────────┘
         ▲                          │
         │                          │
         │                          ▼
┌───────────────────┐     ┌───────────────────┐
│                   │     │                   │
│   Source Code     │     │    End Users      │
│   Repository      │     │                   │
│                   │     │                   │
└───────────────────┘     └───────────────────┘
```

## Design Decisions

1. **Client-side Routing**: Using React Router for a smoother user experience without full page reloads

2. **Authentication Strategy**: GitHub OAuth via Supabase for secure and easy authentication without managing credentials

3. **UI Component Library**: shadcn/ui for consistent design and accessibility

4. **State Management**: React Context for global state, local state for component-specific needs

5. **Responsive Design**: Tailwind CSS for adaptable layouts across devices

## Scaling Considerations

- **Content Delivery**: CDN distribution for fast global access
- **Static Generation**: Pre-rendering content for performance
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Performance Monitoring**: Analytics for user experience tracking

## Future Architecture Improvements

1. **Server-side Rendering**: For improved SEO and initial load performance
2. **Microservices**: Breaking down backend functionality into specialized services
3. **Edge Functions**: Moving computation closer to users for lower latency
4. **PWA Features**: Offline capabilities and installation support
