<script lang="ts">
	import '../app.pcss';
	import '@fontsource-variable/mulish';
	import { dev } from '$app/environment';
	// components
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import BottomBar from '$lib/components/BottomBar/BottomBar.svelte';
	import ShowBreakpoint from '$lib/components/ShowBreakpoint.svelte';
	// types
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: showNavigation =
		$page.url.pathname !== '/email-verification' &&
		$page.url.pathname !== '/signup' &&
		$page.url.pathname !== '/login';
</script>

<ModeWatcher />
<Toaster richColors />
<div class="h-full w-full xl:container xl:mx-auto">
	{#if data.user && showNavigation}
		<Sidebar user={data.user} />
		<BottomBar user={data.user} />
	{/if}
	<div
		class="flex flex-col gap-y-6 xl:gap-y-10 {showNavigation &&
			'mb-20 p-4 sm:mb-0 sm:ml-[74px] md:ml-20 md:p-5 lg:ml-48 lg:p-6 xl:ml-60 xl:p-8'}"
	>
		<slot />
	</div>
</div>

{#if dev}
	<!-- Show tailwind breakpoints -->
	<ShowBreakpoint />
{/if}

<style lang="postcss">
	:global(body) {
		color: theme(colors.foreground);
		background: theme(colors.background);
	}
</style>
