<script lang="ts">
	//components
	import { MonitorSmartphone, CreditCard, ZapOff, LayoutDashboard } from 'lucide-svelte';
	import { page } from '$app/stores';
	import NavLink from './NavLink.svelte';
	import Logo from './Logo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import Exit from 'svelte-radix/Exit.svelte';
	import ModeToggle from '../ModeToggle/ModeToggle.svelte';
	import { Separator } from '$lib/components/ui/separator';
	//types
	import type { User } from 'lucia';
	import type { MenuItem } from './types';
	// other
	import { enhance } from '$app/forms';

	export let user: User;

	const menuItems: MenuItem[] = [
		{ name: 'Overview', route: '/', icon: LayoutDashboard },
		{ name: 'Bills', route: '/bills', icon: CreditCard },
		{ name: 'Devices', route: '/devices', icon: MonitorSmartphone },
		{ name: 'Outages', route: '/outages', icon: ZapOff }
	];
</script>

<aside
	class="fixed flex h-screen w-60 flex-col items-start justify-between border-r border-border p-4"
>
	<div class="w-full space-y-16">
		<a href="/overview">
			<Logo class="w-12" />
		</a>
		<!-- nav links section -->
		<nav class="flex w-full flex-col gap-y-1.5">
			{#each menuItems as item}
				<NavLink isRoute={$page.route.id === item.route} {item} />
			{/each}
		</nav>
	</div>

	<!-- user & signout section -->
	<div class="flex w-full flex-col gap-y-2">
		<ModeToggle />
		<Separator class="my-3" />

		<div class="flex items-center gap-x-2">
			<Avatar.Root class="border-2">
				<Avatar.Image src={user.avatarUrl} alt="profile" />
				<Avatar.Fallback>JD</Avatar.Fallback>
			</Avatar.Root>
			<div class="">
				<p class="mb-0 font-medium leading-tight">{user.name}</p>
				<p class="text-sm text-muted-foreground">Domestic Account</p>
			</div>
		</div>

		<form method="post" action="/signout" use:enhance>
			<button
				type="submit"
				class="flex w-full select-none items-center gap-x-2 rounded-md px-2 py-3 text-base text-destructive outline-none transition-colors hover:bg-muted data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
			>
				<Exit size={20} />
				<span>Logout</span>
			</button>
		</form>
	</div>
</aside>
