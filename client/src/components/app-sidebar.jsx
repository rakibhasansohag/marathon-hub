import { Home, List, PlusCircle, Settings } from 'lucide-react';
import { LuClipboardList } from 'react-icons/lu';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router';

// Menu items.
const items = [
	{
		title: 'Home',
		url: '/dashboard',
		icon: Home,
	},
	{
		title: 'Add Marathon',
		url: '/dashboard/add-marathon',
		icon: PlusCircle,
	},
	{
		title: 'My Marathon List',
		url: '/dashboard/my-marathons',
		icon: List,
	},
	{
		title: 'My Apply List',
		url: '/dashboard/my-apply-list',
		icon: LuClipboardList,
	},
	{
		title: 'Profile',
		url: '/dashboard/profile',
		icon: Settings,
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent className={'pt-20'}>
				<SidebarGroup>
					<SidebarGroupLabel className={'text-primary text-2xl font-bold mb-2'}>
						Marathon Hub
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink to={item.url} end={item.url === '/dashboard'}>
											<item.icon />
											<span>{item.title}</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
