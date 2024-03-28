<script lang="ts">
	import type { MenuItem } from './types';
	import { page } from '$app/stores';

	export let item: MenuItem;
	export let isRoute: boolean;
	export let showNotification: boolean = false;

	$: isRoute = $page.url.pathname === item.route;
</script>

<a
	href={item.route}
	class="flex h-10 w-full min-w-10 items-center justify-center gap-x-1.5 rounded-md transition-all lg:justify-normal lg:px-3 xl:gap-x-3 {isRoute
		? 'bg-primary text-primary-foreground'
		: 'hover:bg-muted'}"
	class:pointer-events-none={isRoute}
>
	<div class="relative">
		<svelte:component this={item.icon} strokeWidth={1.2} size={21} />
		{#if showNotification}
			<div class="absolute right-0 top-0 ml-1 h-2.5 w-2.5 rounded-full border bg-red-500" />
		{/if}
	</div>
	<span class="hidden text-sm lg:block lg:text-base">{item.name}</span>
</a>
