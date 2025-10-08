import Counter from '../ui/counter'

export const metadata = {
  title: 'Counter',
}

export default function CounterPage() {
  return (
    <div>
      <h1>Counter Demo</h1>
      <p>Cette page montre un composant client isolé.</p>
      <Counter />
    </div>
  )
}
