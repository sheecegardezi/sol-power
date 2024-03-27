<script lang="ts">
	//components
	import { MonitorSmartphone, CreditCard, ZapOff, LayoutDashboard } from 'lucide-svelte';
	import { page } from '$app/stores';
	import NavLink from './NavLink.svelte';
	import Logo from './Logo.svelte';
	//types
	import type { User } from 'lucia';
	import type { MenuItem } from './types';
	// other
	import SignoutSection from './SignoutSection.svelte';

	export let user: User;

	const menuItems: MenuItem[] = [
		{ name: 'Overview', route: '/', icon: LayoutDashboard },
		{ name: 'Bills', route: '/bills', icon: CreditCard },
		{ name: 'Devices', route: '/devices', icon: MonitorSmartphone },
		{ name: 'Outages', route: '/outages', icon: ZapOff }
	];
</script>

<aside
	class="fixed hidden h-screen w-fit flex-col items-center justify-between border-r border-border bg-background p-4 sm:flex md:w-48 md:items-start lg:w-60"
>
	<div class="w-full space-y-16">
		<a href="/overview">
			<Logo class="mt-2 w-10 md:w-12" />
		</a>
		<!-- nav links section -->
		<nav class="flex w-full flex-col gap-y-1.5">
			{#each menuItems as item}
				<NavLink isRoute={$page.route.id === item.route} {item} />
			{/each}
		</nav>
	</div>

	<SignoutSection {user} />
</aside>
