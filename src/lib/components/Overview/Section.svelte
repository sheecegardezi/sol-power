<script lang="ts">
	import SubHeader from '../Typography/SubHeader.svelte';

	export let title: string | undefined = undefined;
	export let grid: boolean = false;
</script>

<div class="relative flex w-full flex-col gap-y-4">
	{#if title}
		<SubHeader {title} />
	{/if}
	{#if grid}
		<div class="grid -space-y-12 sm:grid-cols-2 sm:gap-4 sm:space-y-0 md:grid-cols-3">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</div>
