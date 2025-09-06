# FocusEconomicsTask

## Project Overview

This is a **fullstack web application** built with **Next.js** that displays metrics with filtering, sorting, pagination, and interactive charts. Users can authenticate using **SSO** and see a dashboard with metrics represented in tables and charts.

The application demonstrates fullstack capabilities:

- Server-side rendering (SSR) with Next.js
- Database integration using Prisma and SQL
- Authentication using NextAuth.js (SSO compatible)
- Interactive charts using Recharts
- Responsive UI using TailwindCSS

---

## Features

1. **User Authentication (SSO)**  
   Users log in via a Single Sign-On system. NextAuth.js manages sessions and authentication flow.

2. **Dashboard**

   - Metrics table with pagination (15 items per page)
   - Filtering by keyword, date, and value range
   - Sorting by date (`fecha`) and value (`valor`)

3. **Charts**
   - Trend Over Time (Line Chart)
   - Category Comparison (Bar Chart)
   - Category Proportions (Pie Chart)
   - Value Distribution (Histogram, optional)
4. **Responsive Design**  
   Fully responsive layout using TailwindCSS; sidebar and charts adapt to screen size.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd focuseconomicstask
```

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies:

- **Next.js** – frontend and backend framework
- **React & React-DOM** – UI library
- **NextAuth.js** – authentication & SSO support
- **Prisma** – ORM for SQL databases
- **Recharts** – charting library
- **TailwindCSS** – utility-first CSS framework

Dev dependencies include:

- **TypeScript**
- **ESLint**
- **Tailwind PostCSS integration**
- **Prisma CLI tool**

### 3. Database Setup

This project uses **Prisma** with a SQL database.

1. **Set Environment Variable** in `.env`:

```env
DATABASE_URL="mysql://dbuser:dbpassword@localhost:3306/Statistics"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your database credentials.

2. **Run Prisma Migrations:**

```bash
npx prisma migrate dev --name init
```

3. **Seed the Database:**

```bash
npm run seed
```

This populates the database with sample metrics data.

### 4. Run the Project

**Development Mode:**

```bash
npm run dev
```

## Open your browser at http://localhost:3000

## Technology Benefits

### Next.js

- Combines server-side rendering (SSR) with client-side React
- Simplifies routing, API routes, and server-side authentication
- Boosts SEO and performance

### Prisma (Regular SQL)

- Type-safe queries reduce runtime errors
- Supports relational databases (PostgreSQL, MySQL, SQLite)
- Easy to implement pagination, filtering, and sorting

### TailwindCSS

- Utility-first CSS framework for rapid UI development
- Enables responsive and consistent styling
- Full control over design without heavy component libraries

### Recharts

- Simple and declarative React charting library
- Provides responsive and interactive charts out-of-the-box
- Easy integration with React components and data arrays

### Chart Selection

- Line, Bar, and Pie charts cover most business insights: trends, comparisons, and proportions
- Histogram included in data preparation but optional for future visualization

## Notes

- Search bar updates table **after user stops typing** (debounced)
- Sidebar collapses on screens **≤900px** with burger menu
- Pagination is server-side, fetching **15 items per page**
