# Full-Stack Developer Portfolio

A modern personal portfolio for a young aspiring full-stack developer from Rwanda. The project includes:

- A responsive frontend built with HTML, CSS, and vanilla JavaScript
- A Node.js + Express backend
- A MySQL schema for projects, messages, and optional users
- Dynamic project loading and contact form submission

## Project Structure

```text
frontend/
  index.html
  styles.css
  script.js
backend/
  config/
    db.js
  controllers/
    messageController.js
    projectController.js
  middleware/
    errorHandler.js
    validate.js
  models/
    messageModel.js
    projectModel.js
  routes/
    messageRoutes.js
    projectRoutes.js
  sql/
    schema.sql
  .env.example
  package.json
  server.js
```

## Quick Start

1. Create the database in MySQL and run the SQL schema:

```sql
SOURCE backend/sql/schema.sql;
```

2. Configure environment variables:

```bash
cd backend
cp .env.example .env
```

3. Update `.env` with your MySQL credentials and optional `ADMIN_API_KEY`.

4. Install backend dependencies:

```bash
cd backend
npm install
```

5. Start the server:

```bash
npm run dev
```

6. Open the app:

- Frontend served by Express: `http://localhost:5000`
- API base: `http://localhost:5000/api`

## Admin Route

To read stored messages, send:

- `GET /api/messages`
- Header: `x-admin-key: your_admin_key`

## Notes

- The frontend automatically fetches projects from the backend.
- If the backend is unavailable, the UI shows a helpful error state.
- Prepared statements are used through `mysql2`.
- Input validation and central error handling are included.
