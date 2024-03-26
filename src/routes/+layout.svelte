<script lang="ts">
	import '../app.pcss';
	// components
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	// types
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ModeWatcher />
<Toaster richColors />
{#if data.user}
	<Sidebar user={data.user} />
{/if}
<slot />

<style lang="postcss">
	:global(body) {
		color: theme(colors.foreground);
		background: theme(colors.background);
	}
</style>
