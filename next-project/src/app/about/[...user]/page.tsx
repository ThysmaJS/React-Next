export default async function About({
  params,
}: {
  params: Promise<{ user: string}>
}) {
  const { user } = await params
  return <div>My Post: {user}</div>
}