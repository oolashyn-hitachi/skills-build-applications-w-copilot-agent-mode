import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function CollectionPage({
  endpoint,
  fetch = getCollection,
  title,
  description,
  icon,
  columns,
  emptyMessage,
}) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const resource = endpoint.split('/').filter(Boolean).at(-1)

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setStatus('loading')
      setError('')

      try {
        const data = await fetch(endpoint, { signal: controller.signal })
        setItems(data)
        setStatus('success')
      } catch (requestError) {
        if (controller.signal.aborted) {
          return
        }

        setError(requestError instanceof Error ? requestError.message : 'Unexpected API error.')
        setStatus('error')
      }
    }

    void loadItems()
    return () => controller.abort()
  }, [attempt, endpoint, fetch])

  return (
    <section aria-labelledby={`${resource}-title`}>
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">OctoFit Tracker</p>
          <h1 className="page-title" id={`${resource}-title`}>
            {title}
          </h1>
          <p className="page-description">{description}</p>
        </div>
        {status === 'success' && (
          <span className="page-count">
            {items.length} {items.length === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      {status === 'error' && (
        <div className="alert alert-warning api-error" role="alert">
          <i className="bi bi-exclamation-circle me-2" aria-hidden="true" />
          Could not load {title.toLowerCase()}: {error}
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => setAttempt((current) => current + 1)}
            type="button"
          >
            Try again
          </button>
        </div>
      )}

      <div className="data-card">
        <div className="data-card-header">
          <div>
            <h2 className="data-card-title">{title} overview</h2>
            <p className="data-card-subtitle">Live data from your OctoFit API</p>
          </div>
          <i className={`bi ${icon} text-success fs-5`} aria-hidden="true" />
        </div>

        {status === 'loading' && (
          <div className="status-area" role="status">
            <span className="spinner-border" aria-hidden="true" />
            <span className="visually-hidden">Loading {title.toLowerCase()}…</span>
          </div>
        )}

        {status === 'success' && items.length === 0 && (
          <div className="status-area">
            <div className="empty-state-icon">
              <i className={`bi ${icon}`} aria-hidden="true" />
            </div>
            <p className="empty-state-title">Nothing to show yet</p>
            <p className="empty-state-description">{emptyMessage}</p>
          </div>
        )}

        {status === 'success' && items.length > 0 && (
          <div className="table-responsive">
            <table className="table data-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.label} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${resource}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.label}>{column.render(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="app-footer">Move a little. Celebrate a lot.</footer>
    </section>
  )
}

export default CollectionPage
