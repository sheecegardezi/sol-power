<script lang="ts">
	import type { MenuItem } from './types';
	import { page } from '$app/stores';

	export let item: MenuItem;
	export let isRoute: boolean;

	$: isRoute = $page.url.pathname === item.route;
</script>

<a
	href={item.route}
	class="flex h-10 w-full items-center gap-x-3 rounded-md px-3 transition-all {isRoute
		? 'bg-primary text-primary-foreground'
		: 'hover:bg-muted'}"
	class:pointer-events-none={isRoute}
>
	<svelte:component this={item.icon} strokeWidth={1.4} size={20} />
	<span class="hidden text-sm md:block lg:text-base">{item.name}</span>
</a>
