import CollectionPage from './CollectionPage.jsx'
import { getCollection } from '../api.js'

function Users() {
  return (
    <CollectionPage
      columns={[
        {
          label: 'Athlete',
          render: (item) => (
            <>
              <span className="table-primary-text">
                {item.fullName ?? item.username ?? '—'}
              </span>
              {item.fullName && item.username && (
                <span className="table-secondary-text">@{item.username}</span>
              )}
            </>
          ),
        },
        { label: 'Email', render: (item) => item.email ?? '—' },
        {
          label: 'Team',
          render: (item) =>
            typeof item.team === 'object'
              ? item.team?.name ?? '—'
              : item.team ?? '—',
        },
      ]}
      description="Meet the people making progress one day at a time."
      emptyMessage="Your athletes will appear here when they join."
      endpoint="/api/users/"
      fetch={getCollection}
      icon="bi-people"
      title="Athletes"
    />
  )
}

export default Users
