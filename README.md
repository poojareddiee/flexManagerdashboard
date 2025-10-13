# Flex Living Reviews Dashboard — Colorful Edition

## One-command run (after installing dependencies)

1. Install root deps:
   ```bash
   npm install
   ```
2. Install frontend deps:
   ```bash
   cd frontend
   npm install
   cd ..
   ```
3. Run both servers:
   ```bash
   npm run dev
   ```
Visit: http://localhost:3000/dashboard

Notes:
- Backend serves mocked reviews at /api/reviews/hostaway
- Frontend uses Tailwind, Framer Motion and Recharts for visualization
