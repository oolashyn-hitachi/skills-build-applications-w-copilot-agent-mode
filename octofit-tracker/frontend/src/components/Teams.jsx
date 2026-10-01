import CollectionPage from './CollectionPage.jsx'
import { getCollection } from '../api.js'

function Teams() {
  return (
    <CollectionPage
      columns={[
        {
          label: 'Team',
          render: (item) => <span className="table-primary-text">{item.name ?? '—'}</span>,
        },
        { label: 'About', render: (item) => item.description ?? '—' },
        {
          label: 'Members',
          render: (item) =>
            Array.isArray(item.members) ? item.members.length : '—',
        },
        {
          label: 'Created by',
          render: (item) =>
            typeof item.createdBy === 'object'
              ? item.createdBy?.fullName ?? item.createdBy?.username ?? '—'
              : item.createdBy ?? '—',
        },
      ]}
      description="Find your people and make every goal a team effort."
      emptyMessage="Create a team to start moving together."
      endpoint="/api/teams/"
      fetch={getCollection}
      icon="bi-people-fill"
      title="Teams"
    />
  )
}

export default Teams
