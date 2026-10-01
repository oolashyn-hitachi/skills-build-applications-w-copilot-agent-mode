import CollectionPage from './CollectionPage.jsx'
import { getCollection } from '../api.js'

function displayName(value) {
  if (value && typeof value === 'object') {
    return value.fullName ?? value.username ?? value.name ?? 'Unknown'
  }
  return value ?? 'Unknown'
}

function Activities() {
  return (
    <CollectionPage
      columns={[
        { label: 'Athlete', render: (item) => displayName(item.user) },
        { label: 'Activity', render: (item) => item.type ?? '—' },
        { label: 'Duration', render: (item) => `${item.durationMinutes ?? '—'} min` },
        {
          label: 'Distance',
          render: (item) => (item.distanceKm == null ? '—' : `${item.distanceKm} km`),
        },
        { label: 'Calories', render: (item) => item.calories ?? '—' },
        {
          label: 'Date',
          render: (item) =>
            item.date
              ? new Date(item.date).toLocaleDateString(undefined, { timeZone: 'UTC' })
              : '—',
        },
      ]}
      description="Celebrate the effort behind every active day."
      emptyMessage="Log an activity to see your progress here."
      endpoint="/api/activities/"
      fetch={getCollection}
      icon="bi-activity"
      title="Activities"
    />
  )
}

export default Activities
