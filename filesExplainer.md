
# Project Files Explainer

This document provides an overview of all files in the project, organized by their folder structure. Each file is marked with an emoji to indicate its importance based on the number of imports:

- 🟢 Green: Few imports (0-5) - Simple, focused component or utility
- 💛 Yellow: Moderate imports (6-10) - Medium complexity 
- 🔴 Red: Many imports (11+) - Complex component or core functionality

## Root Directory

- `.env` 🟢 - Environment configuration file storing provider settings
- `README.md` 🟢 - Project documentation with setup instructions and information
- `SECURITY.md` 🟢 - Security policies and vulnerability reporting guidelines
- `supabase/config.toml` 🟢 - Supabase configuration file with project settings

## src/ (Source Code)

- `main.tsx` 🟢 - Entry point of the application that renders the root React component
- `App.tsx` 🔴 - Main application component with routing configuration and provider setup
- `index.css` 🟢 - Global CSS styles for the application
- `vite-env.d.ts` 🟢 - TypeScript definitions for Vite environment variables

### src/components/

- `GitHubLoginButton.tsx` 💛 - Button component for GitHub OAuth authentication
- `GuideHeader.tsx` 💛 - Header component for the performance guide sections
- `LogoutButton.tsx` 💛 - Button component for user logout functionality
- `Navbar.tsx` 💛 - Navigation bar component used across the application
- `PerformanceMetric.tsx` 💛 - Component for displaying performance metrics with visualizations
- `ProtectedRoute.tsx` 💛 - Higher-order component for route protection based on auth state
- `SectionNavigation.tsx` 💛 - Navigation component for switching between guide sections
- `UserProfile.tsx` 💛 - Component displaying user profile information and settings
- `Footer.tsx` 💛 - Footer component with links and copyright information
- `DatabaseSchema.tsx` 💛 - Component visualizing database schema and relationships
- `ErrorAnalysis.tsx` 💛 - Component for analyzing and displaying error information
- `UsabilityTestingPlan.tsx` 💛 - Component outlining usability testing methodology
- `VibeCoding.tsx` 💛 - Component displaying code snippets with visual styling

### src/components/ui/ (UI Components)

- `accordion.tsx` 🟢 - Collapsible accordion component for toggling content display
- `alert-dialog.tsx` 🟢 - Dialog component for important notifications requiring action
- `alert.tsx` 🟢 - Component for displaying alert messages to users
- `aspect-ratio.tsx` 🟢 - Component that maintains a specified aspect ratio for content
- `avatar.tsx` 🟢 - Component for displaying user avatars or profile pictures
- `badge.tsx` 🟢 - Small label component for displaying status or categories
- `button.tsx` 🟢 - Reusable button component with various styles and states
- `calendar.tsx` 🟢 - Date picker component for selecting dates
- `card.tsx` 🟢 - Container component with a card-like appearance for content grouping
- `carousel.tsx` 🟢 - Slideshow component for cycling through elements
- `chart.tsx` 🟢 - Data visualization component for creating charts and graphs
- `checkbox.tsx` 🟢 - Interactive checkbox input component
- `collapsible.tsx` 🟢 - Component that can be expanded or collapsed to show/hide content
- `command.tsx` 🟢 - Command palette interface component for keyboard interactions
- `context-menu.tsx` 🟢 - Menu component that appears on right-click or context actions
- `dialog.tsx` 🟢 - Modal dialog component for displaying content in a focused overlay
- `drawer.tsx` 🟢 - Sliding panel component that enters from screen edge
- `dropdown-menu.tsx` 🟢 - Menu component that opens on click to display a list of options
- `form.tsx` 💛 - Form component with validation and submission handling
- `hover-card.tsx` 🟢 - Card that appears when hovering over a trigger element
- `input-otp.tsx` 💛 - One-time password input component for verification codes
- `input.tsx` 🟢 - Text input field component for user data entry
- `label.tsx` 🟢 - Label component for form controls with styling options
- `menubar.tsx` 🟢 - Horizontal menu component for application navigation
- `navigation-menu.tsx` 🟢 - Component for creating accessible navigation menus
- `pagination.tsx` 💛 - Component for navigating through multi-page content
- `popover.tsx` 🟢 - Component that displays floating content when triggered
- `progress.tsx` 🟢 - Progress indicator component for showing completion status
- `radio-group.tsx` 🟢 - Group of radio buttons for selecting a single option
- `resizable.tsx` 🟢 - Component that allows users to resize elements
- `scroll-area.tsx` 🟢 - Custom scrollable container with consistent styling
- `select.tsx` 🟢 - Dropdown selection component for choosing from options
- `separator.tsx` 🟢 - Visual divider component for separating content sections
- `sheet.tsx` 🟢 - Slide-in panel component for additional content or forms
- `sidebar.tsx` 🟢 - Side navigation component for application structure
- `skeleton.tsx` 🟢 - Loading placeholder component that mimics content structure
- `slider.tsx` 🟢 - Interactive slider component for selecting values from a range
- `sonner.tsx` 💛 - Toast notification system for displaying brief messages
- `switch.tsx` 🟢 - Toggle switch component for binary options
- `table.tsx` 💛 - Data table component for displaying structured information
- `tabs.tsx` 🟢 - Tabbed interface component for organizing content into sections
- `textarea.tsx` 🟢 - Multi-line text input component for longer text entry
- `toast.tsx` 💛 - Notification component for displaying brief messages
- `toaster.tsx` 💛 - Container component for managing toast notifications
- `toggle-group.tsx` 💛 - Group of toggle buttons for multi-selection
- `toggle.tsx` 🟢 - Button that can be toggled on or off
- `tooltip.tsx` 🟢 - Component for displaying additional information on hover
- `use-toast.ts` 🟢 - Hook for programmatically creating toast notifications

### src/components/sections/ (Guide Sections)

- `BackendPerformance.tsx` 💛 - Component covering backend performance optimization strategies
- `DatabaseOptimization.tsx` 💛 - Component explaining database optimization techniques
- `FrontendOptimization.tsx` 💛 - Component detailing frontend performance improvements
- `InfrastructureScaling.tsx` 💛 - Component covering infrastructure scaling approaches
- `PerformanceAnalysis.tsx` 💛 - Component for analyzing and measuring performance
- `PerformanceFundamentals.tsx` 💛 - Component introducing core performance concepts
- `UsabilityTesting.tsx` 💛 - Component covering usability testing methodologies

#### src/components/sections/frontend/

- `AssetOptimization.tsx` 💛 - Component explaining image and asset optimization techniques
- `BundleSizeReduction.tsx` 💛 - Component covering strategies to reduce JavaScript bundle size
- `CodeSplitting.tsx` 💛 - Component explaining code splitting for performance benefits
- `KeyTakeaways.tsx` 💛 - Component summarizing key frontend optimization principles
- `ReactPerformance.tsx` 💛 - Component detailing React-specific performance optimizations

#### src/components/sections/usability/

- `Documentation.tsx` 💛 - Component covering documentation best practices
- `MetricsAndMeasurements.tsx` 💛 - Component explaining usability metrics and measurements
- `ParticipantSelection.tsx` 💛 - Component detailing participant selection for usability tests
- `TestEnvironment.tsx` 💛 - Component explaining test environment setup for usability testing
- `TestProtocol.tsx` 💛 - Component covering usability test protocols and procedures
- `TestScenarios.tsx` 💛 - Component detailing test scenario creation for usability testing
- `ValidationRequirements.tsx` 💛 - Component explaining validation requirements in usability testing

### src/context/

- `UserContext.tsx` 🔴 - Context provider for managing user authentication state

### src/hooks/

- `use-mobile.tsx` 💛 - Custom hook for responsive design and mobile detection
- `use-toast.ts` 💛 - Custom hook for managing toast notifications

### src/integrations/

#### src/integrations/supabase/

- `client.ts` 💛 - Supabase client configuration and initialization
- `types.ts` 💛 - TypeScript type definitions for Supabase database schema

### src/lib/

- `utils.ts` 🟢 - Utility functions used throughout the application

### src/pages/

- `AuthPage.tsx` 💛 - Authentication page for user login and registration
- `Dashboard.tsx` 💛 - User dashboard page displaying personalized information
- `Index.tsx` 🔴 - Main landing page and performance guide entry point
- `NotFound.tsx` 🟢 - 404 page displayed when a route is not found

### src/services/

- `authService.ts` 🔴 - Authentication service handling login, logout, and sessions
