# Expense Tracker Frontend

Frontend application for the Expense Tracker app, built with **Next.js, TypeScript, and Tailwind CSS**.  
Modern, responsive UI for managing personal expenses with real-time analytics and charts.

---

## 🚀 Features
- **Modern UI** with Tailwind CSS and custom components
- **Authentication** with JWT token management
- **Dashboard** with expense analytics and charts
- **Expense Management** with CRUD operations
- **Monthly Breakdown** with detailed expense analysis
- **Responsive Design** for mobile and desktop
- **Real-time Updates** with optimistic UI

---

## 🛠 Tech Stack
- Next.js 14 + TypeScript  
- Tailwind CSS + Sass  
- Recharts for data visualization
- React Hook Form for forms
- Axios for API calls
- React Query for state management

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd expense_tracker_user_frontend
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` file:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📱 Pages & Features

- **Dashboard** - Overview with charts and recent expenses
- **Expenses** - Manage expenses with filters and search
- **Monthly Breakdown** - Detailed monthly analysis
- **Authentication** - Login/Signup with form validation

---

## 🔧 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
