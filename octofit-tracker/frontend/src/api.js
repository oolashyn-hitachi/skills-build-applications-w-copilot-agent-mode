const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'data', 'docs']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  throw new Error('The API returned data in an unsupported format.')
}

export async function getCollection(endpoint, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`The API returned HTTP ${response.status}.`)
  }

  let payload
  try {
    payload = await response.json()
  } catch {
    throw new Error('The API response was not valid JSON.')
  }

  return extractItems(payload)
}
