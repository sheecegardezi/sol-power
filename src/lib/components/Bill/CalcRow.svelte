<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	export let label: string;
	export let description: string = '';
	export let result: number;
	export let highlight: boolean = false;
</script>

{#if !highlight}
	<div class="flex w-full flex-col gap-1.5 rounded-md bg-muted p-4">
		<h3 class="flex justify-between text-sm font-bold tracking-wide">
			<span class="uppercase">{label}</span>
			<span class="text-muted-foreground">{description}</span>
		</h3>

		<div class="flex w-full items-end justify-between gap-1 leading-none">
			<p class="w-fit text-nowrap">
				<slot />
			</p>
			<div class="mb-0.5 h-px w-full border-b border-dashed border-muted-foreground" />

			<p class="text-nowrap">${result.toFixed(2)}</p>
		</div>
	</div>
{:else}
	<div
		class="grid grid-cols-2 gap-2 rounded-md border border-red-500 bg-muted p-4"
		class:border-red-500={result > 100}
		class:border-green-500={result < 100}
	>
		<h3 class="flex justify-between text-sm font-bold tracking-wide">
			<span class="uppercase">{label}</span>
		</h3>
		<div class="flex w-full items-center justify-end gap-1 leading-none">
			<p
				class="text-nowrap text-3xl font-semibold"
				class:text-red-500={result > 100}
				class:text-green-500={result < 100}
			>
				${result.toFixed(2)}
			</p>
		</div>
		{#if result > 100}
			<div class="col-span-2 flex w-full gap-1.5 text-sm text-red-600 dark:text-red-500">
				<CircleAlert size="18" stroke="2" class="mt-0.5" />
				<p>Please pay a larger portion of your bill going forward to avoid disconnection!</p>
			</div>
		{/if}
	</div>
{/if}
