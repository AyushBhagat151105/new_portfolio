import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/hero')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/hero"!</div>
}
