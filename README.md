# Analytics Dashboard - Frontend

Modern analytics dashboard built with React, TypeScript, Vite, and TailwindCSS. Features interactive charts, real-time data visualization, and Excel export functionality.

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles with Tailwind
│   ├── assets/                    # Static assets (images, fonts, etc.)
│   ├── components/
│   │   ├── Dashboard.tsx          # Main dashboard layout
│   │   ├── ChartData.tsx          # Analytics charts component
│   │   ├── ExportForm.tsx         # Data export form with filters
│   │   ├── Navbar.tsx             # Navigation bar component
│   │   └── ui/                    # Reusable UI components (shadcn/ui)
│   │       ├── button.tsx         # Button component
│   │       ├── card.tsx           # Card component
│   │       ├── dialog.tsx         # Dialog/modal component
│   │       ├── input.tsx          # Input field component
│   │       └── label.tsx          # Label component
│   └── lib/
│       └── utils.ts               # Utility functions (cn helper)
├── public/                        # Public static files
├── components.json                # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # App-specific TypeScript config
├── tsconfig.node.json             # Node-specific TypeScript config
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## 🧩 Components Structure

### Main Components

#### **Dashboard** ([src/components/Dashboard.tsx](src/components/Dashboard.tsx))
- Main dashboard layout component
- Contains "Export Excel" dialog
- Renders ChartData component
- Responsive design with mobile support

#### **ChartData** ([src/components/ChartData.tsx](src/components/ChartData.tsx))
Displays analytics data with multiple visualizations:
- **Summary Cards**: Total users, blogs, views, and engagement rate
- **User Growth Chart**: Line chart showing user registration over time
- **Blogs Created Chart**: Bar chart showing blog creation trends
- **Blogs by Category**: Pie chart showing blog distribution
- **Engagement Trend**: Area chart showing engagement metrics

**Features:**
- Date range filters (start date, end date)
- Group by filter (day/month)
- Real-time data fetching
- Responsive chart containers

#### **ExportForm** ([src/components/ExportForm.tsx](src/components/ExportForm.tsx))
Excel export functionality with advanced filtering:
- Export users or blogs data
- Dynamic filter fields based on export type
- User filters: role, status, name, email, date range
- Blog filters: title, category, tags, status, views, likes, comments, date range
- Limit export count
- Downloads Excel file directly

#### **Navbar** ([src/components/Navbar.tsx](src/components/Navbar.tsx))
- Application navigation bar
- Branding and title display

### UI Components

Reusable components built with Radix UI and styled with TailwindCSS:
- **Button**: Customizable button with variants
- **Card**: Container component for grouped content
- **Dialog**: Modal/dialog component
- **Input**: Form input field
- **Label**: Form label component

## 📊 Features

### Analytics Visualizations
- **Line Chart**: User growth over time with date filtering
- **Bar Chart**: Blog creation trends (group by day/month)
- **Pie Chart**: Blog category distribution
- **Area Chart**: Engagement trends
- **Summary Cards**: Key metrics at a glance

### Data Export
- Export users and blogs to Excel format
- Advanced filtering options
- Customizable query parameters
- Direct file download

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## 🔧 Environment Variables

Create a `.env` file in the frontend root directory:

```env
# API Configuration
VITE_API_BASE=http://localhost:5000/api
```

### Environment Variable Details

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE` | No | `http://localhost:3000` | Backend API base URL (without trailing slash) |

**Note:** Vite environment variables must be prefixed with `VITE_` to be exposed to the client.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Backend server running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required environment variables (see above)

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔌 API Integration

The frontend communicates with the backend API through:

### Analytics Endpoints
- `GET /api/analytics/summary` - Dashboard summary data
- `GET /api/analytics/users-growth?startDate=&endDate=` - User growth data
- `GET /api/analytics/blogs-created?groupBy=day|month` - Blog creation data
- `GET /api/analytics/blogs-by-category` - Category distribution
- `GET /api/analytics/engagement-trend` - Engagement metrics

### Export Endpoints
- `GET /api/export/users?filters...` - Export users to Excel
- `GET /api/export/blogs?filters...` - Export blogs to Excel

All API calls are made using the `fetch` API or `axios` for exports.

## 🎨 Styling

### Tech Stack
- **TailwindCSS v4** - Utility-first CSS framework
- **shadcn/ui** - Headless UI components with Radix UI
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class name utilities

### Customization
- Modify Tailwind classes directly in components
- UI components located in `src/components/ui/`
- Global styles in `src/index.css`

## 📦 Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Styling:** TailwindCSS 4 with @tailwindcss/vite
- **Charts:** Recharts 3
- **HTTP Client:** Axios
- **UI Components:** Radix UI (via shadcn/ui)
- **Icons:** Lucide React
- **Dev Tools:** ESLint, TypeScript ESLint

## 🏗️ Build Configuration

### Vite Configuration
- React plugin enabled
- TailwindCSS Vite plugin
- Path alias: `@` → `./src`
- Fast HMR (Hot Module Replacement)

### TypeScript Configuration
- Strict mode enabled
- Multiple tsconfig files for app, node, and root
- Path resolution for `@/` imports

## 📱 Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 🔍 Development Tips

### Adding New Charts
1. Import required chart components from `recharts`
2. Fetch data from analytics API
3. Add chart in [ChartData.tsx](src/components/ChartData.tsx)
4. Configure responsive container

### Adding New Filters
1. Add filter state in [ChartData.tsx](src/components/ChartData.tsx) or [ExportForm.tsx](src/components/ExportForm.tsx)
2. Create filter UI elements
3. Pass filter params to API calls
4. Update API endpoint query parameters

### Adding New UI Components
```bash
# Using shadcn/ui CLI (if needed)
npx shadcn@latest add [component-name]
```
