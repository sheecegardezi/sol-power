<script lang="ts">
	import type { MenuItem } from '$lib/components/Sidebar/types';
	import { page } from '$app/stores';

	export let item: MenuItem;
	export let isRoute: boolean;
	export let showNotification: boolean = false;

	$: isRoute = $page.url.pathname === item.route;
</script>

<a
	href={item.route}
	class="flex flex-col items-center gap-0.5 rounded-md"
	class:pointer-events-none={isRoute}
	class:dark:text-primary={isRoute}
	class:text-primary-foreground={isRoute}
	class:text-zinc-500={!isRoute}
>
	<div class="relative flex items-center justify-center rounded-lg p-1 transition-all">
		<svelte:component this={item.icon} strokeWidth={1.4} size={24} />
		{#if showNotification}
			<div class="absolute right-0 top-0 ml-1 h-2.5 w-2.5 rounded-full border bg-red-500" />
		{/if}
	</div>
	<span class="text-sm font-semibold lg:block lg:text-base">
		{item.name}
	</span>
</a>
