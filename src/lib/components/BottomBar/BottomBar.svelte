<script lang="ts">
	//components
	import UserRound from 'lucide-svelte/icons/user-round';
	import Wallet from 'lucide-svelte/icons/wallet';
	import MonitorSmartphone from 'lucide-svelte/icons/monitor-smartphone';
	import ZapOff from 'lucide-svelte/icons/zap-off';
	import LayoutDashboard from 'lucide-svelte/icons/layout-dashboard';
	import Link from './Link.svelte';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Avatar from '$lib/components/ui/avatar';
	import LogOut from 'lucide-svelte/icons/log-out';
	import ModeToggle from '../ModeToggle/ModeToggle.svelte';
	import { Button } from '$lib/components/ui/button';

	import { enhance } from '$app/forms';
	import { getInitials } from '$lib/utils/getInitials';
	//types
	import type { User } from 'lucia';
	import type { MenuItem } from '$lib/components/Sidebar/types';

	export let user: User;

	const menuItems: MenuItem[] = [
		{ name: 'Overview', route: '/', icon: LayoutDashboard },
		{ name: 'Bills', route: '/bills', icon: Wallet },
		{ name: 'Devices', route: '/devices', icon: MonitorSmartphone },
		{ name: 'Outages', route: '/outages', icon: ZapOff }
	];

	$: userInitials = getInitials(user.name);
</script>

<nav
	class="fixed bottom-0 z-50 grid h-20 w-full grid-cols-5 items-center gap-1 bg-zinc-100 px-4 dark:bg-zinc-900 sm:hidden"
>
	{#each menuItems as item}
		<Link isRoute={$page.route.id === item.route} {item} />
	{/each}

	<Drawer.Root>
		<Drawer.Trigger>
			<div class="flex flex-col items-center gap-0.5 rounded-md text-muted-foreground">
				<div class="relative flex items-center justify-center rounded-lg p-1 transition-all">
					<UserRound strokeWidth={1.4} size={24} />
				</div>
				<span class="text-sm font-semibold lg:block lg:text-base">Account</span>
			</div>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Account</Drawer.Title>
				<!-- <Drawer.Description>This action cannot be undone.</Drawer.Description> -->
			</Drawer.Header>

			<div class="relative flex flex-col items-center gap-2 p-4">
				<Avatar.Root class="h-16 w-16 border">
					<Avatar.Image src={user.avatarUrl} alt="profile" />
					<Avatar.Fallback>{userInitials}</Avatar.Fallback>
				</Avatar.Root>
				<div class="">
					<p class="text-2xl font-medium leading-tight">{user.name}</p>
					<p class="text-center text-muted-foreground">00001</p>
				</div>

				<div class="absolute right-10 top-4">
					<ModeToggle />
				</div>

				<form method="post" class="mt-2 w-full" action="/signout" use:enhance>
					<Button
						type="submit"
						variant="outline"
						class="flex w-full items-center  gap-x-2 border-red-500 text-base text-red-500"
					>
						<LogOut class="h-5 w-5" />
						Logout
					</Button>
				</form>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</nav>
