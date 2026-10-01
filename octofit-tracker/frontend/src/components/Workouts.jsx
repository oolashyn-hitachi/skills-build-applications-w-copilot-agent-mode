import CollectionPage from './CollectionPage.jsx'
import { getCollection } from '../api.js'

function Workouts() {
  return (
    <CollectionPage
      columns={[
        {
          label: 'Workout',
          render: (item) => <span className="table-primary-text">{item.title ?? '—'}</span>,
        },
        { label: 'Description', render: (item) => item.description ?? '—' },
        { label: 'Level', render: (item) => item.difficulty ?? '—' },
        {
          label: 'Duration',
          render: (item) => `${item.durationMinutes ?? '—'} min`,
        },
        {
          label: 'Focus',
          render: (item) =>
            Array.isArray(item.targetAreas) ? item.targetAreas.join(', ') : '—',
        },
      ]}
      description="Find a workout that fits your day and your goals."
      emptyMessage="Recommended workouts will show up here."
      endpoint="/api/workouts/"
      fetch={getCollection}
      icon="bi-lightning-charge"
      title="Workouts"
    />
  )
}

export default Workouts
