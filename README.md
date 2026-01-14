# Dashboard Application

A modern, production-ready SaaS dashboard built with Next.js 16, TypeScript, and Tailwind CSS. Features authentication, user management, dark mode, and responsive design.

## Setup Instructions

### Prerequisites
- **Node.js**: 18.x or higher
- **Package Manager**: pnpm (recommended), npm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
  
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Email**: demo@example.com
- **Password**: password123

_Note: Any email with a password of 6+ characters will work with the mock authentication._

### Build for Production

```bash
pnpm build
pnpm start
```

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
v0-hello/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Landing/home page
│   ├── globals.css             # Global styles and Tailwind
│   ├── login/                  # Authentication
│   │   └── page.tsx            # Login page
│   └── dashboard/              # Protected dashboard routes
│       ├── layout.tsx          # Dashboard layout with auth check
│       ├── page.tsx            # Dashboard overview
│       ├── users/              # User management
│       │   └── page.tsx
│       └── settings/           # App settings
│           └── page.tsx
│
├── components/                 # React components
│   ├── auth/
│   │   └── login-form.tsx      # Login form component
│   ├── dashboard/
│   │   ├── dashboard-header.tsx    # Top navigation bar
│   │   ├── dashboard-sidebar.tsx   # Side navigation
│   │   ├── dashboard-nav.tsx       # Nav menu items
│   │   ├── data-table.tsx          # Reusable data table
│   │   └── users-table.tsx         # Users table with filters
│   ├── layout/
│   │   ├── dashboard-layout.tsx    # Layout wrapper
│   │   ├── navbar.tsx              # Main navbar
│   │   └── sidebar.tsx             # Main sidebar
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       ├── badge.tsx
│       ├── theme-toggle.tsx
│       └── keyboard-shortcuts.tsx
│
├── hooks/                      # Custom React hooks
│   └── use-debounce.ts         # Debounce hook for search
│
├── lib/                        # Utilities and libraries
│   ├── api.ts                  # Mock API & data fetching
│   ├── auth.ts                 # Zustand auth store
│   └── utils.ts                # Helper functions (cn, etc.)
│
├── public/                     # Static assets
├── styles/                     # Additional styles
│   └── globals.css
│
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies
├── pnpm-lock.yaml              # Lock file
├── postcss.config.mjs          # PostCSS configuration
├── proxy.ts                    # Middleware configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Key Technical Decisions and Trade-offs

### 1. **Next.js App Router**
- **Decision**: Use Next.js 16 with App Router instead of Pages Router
- **Benefits**: 
  - Server Components by default for better performance
  - Improved routing with layouts and templates
  - Better data fetching patterns with async/await
  - Built-in loading and error states
- **Trade-off**: Steeper learning curve, newer API with evolving patterns

### 2. **Client-Side Authentication**
- **Decision**: Use Zustand with localStorage for auth state
- **Benefits**: 
  - Simple implementation for demo purposes
  - Persists across page refreshes
  - Easy to manage and debug
- **Trade-off**: Not production-secure; real apps should use server-side sessions with HttpOnly cookies and proper JWT validation

### 3. **Mock API with Delays**
- **Decision**: Simulate API calls with 600ms delays
- **Benefits**: 
  - Realistic user experience during development
  - Test loading states and skeleton UI
  - No backend dependency for demo
- **Trade-off**: Not suitable for production; needs real API integration

### 4. **URL State Management**
- **Decision**: Store filters, search, and pagination in URL query parameters
- **Benefits**: 
  - Shareable URLs maintain app state
  - Browser back/forward works naturally
  - Page refresh preserves filters
  - Better UX for bookmarking
- **Trade-off**: URL can become lengthy with many filters

### 5. **Debounced Search**
- **Decision**: 300ms debounce on search input
- **Benefits**: 
  - Reduces unnecessary re-renders
  - Fewer API calls (in production)
  - Smoother typing experience
- **Trade-off**: Slight delay before results appear

### 6. **Skeleton Loaders vs Spinners**
- **Decision**: Use skeleton screens for loading states
- **Benefits**: 
  - Better perceived performance
  - Prevents layout shift (CLS)
  - More professional appearance
  - Gives users context about upcoming content
- **Trade-off**: Requires more implementation effort

### 7. **Zustand for State Management**
- **Decision**: Use Zustand instead of Redux or Context API
- **Benefits**: 
  - Minimal boilerplate
  - Excellent TypeScript support
  - Built-in persistence
  - Small bundle size (~1KB)
- **Trade-off**: Less ecosystem/middleware than Redux

### 8. **TypeScript Strict Mode**
- **Decision**: Enable strict TypeScript checking
- **Benefits**: 
  - Catch bugs at compile time
  - Better IDE autocomplete
  - Improved code maintainability
  - Self-documenting code
- **Trade-off**: More verbose code, longer initial development

### 9. **Tailwind CSS v4**
- **Decision**: Use Tailwind CSS for styling
- **Benefits**: 
  - Rapid development with utility classes
  - Consistent design system
  - Smaller bundle with PurgeCSS
  - Built-in responsive design
- **Trade-off**: HTML can become verbose; requires learning utility classes

### 10. **shadcn/ui Components**
- **Decision**: Use shadcn/ui instead of a component library
- **Benefits**: 
  - Copy-paste components you own
  - Full customization freedom
  - No dependency lock-in
  - Built on Radix UI (accessible)
- **Trade-off**: More manual work than pre-built libraries

### 11. **Memoization Strategy**
- **Decision**: Use `useMemo` and `useCallback` selectively
- **Benefits**: 
  - Prevents unnecessary re-renders
  - Optimizes expensive calculations
  - Better performance with large data sets
- **Trade-off**: Premature optimization can complicate code; use judiciously

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand 5.0.10
- **Validation**: Zod 3.25.76
- **Forms**: React Hook Form 7.60.0
- **Icons**: Lucide React 0.454.0
- **Theme**: next-themes 0.4.6
- **Charts**: Recharts 2.15.4
- **Date Handling**: date-fns 4.1.0

## Features

### Authentication
- Login/logout functionality
- Session persistence with localStorage
- Route protection (dashboard requires auth)
- Auto-redirect based on auth state
- Form validation with Zod

### Dashboard
- User management table with search and filters
- Pagination (10 items per page)
- Role and status filtering
- Debounced search (300ms)
- Responsive design (mobile-first)

### UI/UX
- Dark/light mode with system preference detection
- Skeleton loading states
- Smooth transitions and animations
- Keyboard navigation support
- Accessible (ARIA labels, semantic HTML)

### Performance
- Optimized re-renders with React hooks
- Code splitting via Next.js
- Memoized calculations
- Efficient state management

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Manual Deployment
```bash
pnpm build
pnpm start
```

The app will be available on port 3000 by default.

## License

MIT
