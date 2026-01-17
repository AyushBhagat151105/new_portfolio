import { createFileRoute, Outlet, useNavigate, Link } from '@tanstack/react-router'
import { useSession, signOut } from '@/lib/auth-client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  Sparkles,
  User,
  FolderKanban,
  Wrench,
  Briefcase,
  Mail,
  LogOut,
  ChevronUp,
  ExternalLink,
} from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

const menuItems = [
  { title: 'Overview', icon: LayoutDashboard, url: '/admin' },
  { title: 'Hero Section', icon: Sparkles, url: '/admin/hero' },
  { title: 'About', icon: User, url: '/admin/about' },
  { title: 'Projects', icon: FolderKanban, url: '/admin/projects' },
  { title: 'Skills', icon: Wrench, url: '/admin/skills' },
  { title: 'Experience', icon: Briefcase, url: '/admin/experience' },
  { title: 'Contact', icon: Mail, url: '/admin/contact' },
]

function AdminLayout() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  // Show loading state
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }

  // Redirect if not authenticated
  if (!session?.user) {
    navigate({ to: '/login' })
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    navigate({ to: '/login' })
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-zinc-900 text-white">
        <Sidebar className="border-r border-zinc-800">
          <SidebarHeader className="border-b border-zinc-800 p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-sm">
                P
              </div>
              <span className="font-semibold text-lg">Portfolio Admin</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-zinc-500">Content Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className="flex items-center gap-3 text-zinc-300 hover:text-white">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-zinc-500">Quick Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/" target="_blank" className="flex items-center gap-3 text-zinc-300 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                        <span>View Portfolio</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-zinc-800">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-zinc-700 text-xs">
                            {session.user.name?.charAt(0).toUpperCase() || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-zinc-300">{session.user.name || session.user.email}</span>
                      </div>
                      <ChevronUp className="h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-56 bg-zinc-800 border-zinc-700">
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-400 focus:text-red-400 focus:bg-zinc-700 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-4">
            <SidebarTrigger className="text-zinc-400 hover:text-white" />
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
