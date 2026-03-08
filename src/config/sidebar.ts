import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User
} from "lucide-react"

export const sidebarConfig = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: PieChart,
    },
    {
      title: "Bookmarks",
      url: "/dashboard/bookmarks",
      icon: SquareTerminal
    },
    {
        title: "Subscription",
        url: "/dashboard/subscription",
        icon: Command
    },
    {
      title: "Test",
      url: "/dashboard/test",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Sub Test 1",
          url: "/dashboard/test",
        },
        {
          title: "Sub Test 2",
          url: "/dashboard/test",
        },
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  adminlinks: [
    {
      title: "Users",
      name: "Users",
      url: "/dashboard/users",
      icon: User
    }
  ],
}
