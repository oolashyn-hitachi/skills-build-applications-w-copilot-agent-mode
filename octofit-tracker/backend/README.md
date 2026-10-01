# OctoFit API

The Express API listens on port `8000`. It uses
`mongodb://localhost:27017/octofit_db` by default; set `MONGODB_URI` to use a
different MongoDB connection string.

From the repository root, build and start the API with:

```powershell
npm run --prefix octofit-tracker/backend build
npm run --prefix octofit-tracker/backend dev
```

MongoDB must be running on port `27017` before starting the API. Once the API
is available, verify the resource endpoints with:

```powershell
curl.exe http://localhost:8000/api/users/
curl.exe http://localhost:8000/api/activities/
```

In GitHub Codespaces, the API base URL is
`https://${CODESPACE_NAME}-8000.app.github.dev`; outside Codespaces it is
`http://localhost:8000`. Keep MongoDB on the private data-tier port `27017`.
