import CollectionPage from './CollectionPage.jsx'
import { getCollection } from '../api.js'

function displayName(value) {
  if (value && typeof value === 'object') {
    return value.fullName ?? value.username ?? value.name ?? 'Unknown'
  }
  return value ?? 'Unknown'
}

function Leaderboard() {
  return (
    <CollectionPage
      columns={[
        { label: 'Rank', render: (item) => `#${item.rank ?? '—'}` },
        { label: 'Athlete', render: (item) => displayName(item.user) },
        { label: 'Team', render: (item) => displayName(item.team) },
        { label: 'Points', render: (item) => item.points ?? 0 },
        { label: 'Period', render: (item) => item.period ?? '—' },
      ]}
      description="A little friendly competition goes a long way."
      emptyMessage="Points will appear here as your team logs activities."
      endpoint="/api/leaderboard/"
      fetch={getCollection}
      icon="bi-trophy"
      title="Leaderboard"
    />
  )
}

export default Leaderboard
