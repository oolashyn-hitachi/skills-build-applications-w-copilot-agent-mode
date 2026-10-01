# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, React Router, Bootstrap, and the
Bootstrap Icons set. Start it from the repository root with:

```powershell
npm run dev --prefix octofit-tracker/frontend
```

The API base URL defaults to `http://localhost:8000`. In GitHub Codespaces,
create `octofit-tracker/frontend/.env.local` with the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite loads this value when the development server starts. The frontend then
uses `https://your-codespace-name-8000.app.github.dev`; restart Vite after
changing `.env.local`. Do not include the `https://` prefix or the port in the
value.

The app expects the API routes `/api/users/`, `/api/teams/`,
`/api/activities/`, `/api/leaderboard/`, and `/api/workouts/`. Collection
responses may be arrays or paginated objects with `results`, `items`, `data`,
or `docs` arrays. The Express API enables CORS so the frontend can request it
across the presentation and logic tiers.
