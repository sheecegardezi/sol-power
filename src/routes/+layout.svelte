<script lang="ts">
	import '../app.pcss';
	import '@fontsource-variable/mulish';
	// components
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	// types
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: showSidebar =
		$page.url.pathname !== '/email-verification' &&
		$page.url.pathname !== '/signup' &&
		$page.url.pathname !== '/login';
</script>

<ModeWatcher />
<Toaster richColors />
<div class="w-full xl:container xl:mx-auto">
	{#if data.user && showSidebar}
		<Sidebar user={data.user} />
	{/if}
	<div
		class="flex flex-col gap-y-6 lg:gap-y-10 {showSidebar &&
			'p-4 sm:ml-[72px] md:ml-48 lg:ml-60 lg:p-8 xl:p-10'}"
	>
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(body) {
		color: theme(colors.foreground);
		background: theme(colors.background);
	}
</style>
