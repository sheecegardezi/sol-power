<script lang="ts">
	export let label: string;
	export let result: number;
	export let highlight: boolean = false;
</script>

<div
	class="flex w-full gap-2 text-sm [&>*]:leading-none"
	class:bg-primary={highlight}
	class:text-primary-foreground={highlight}
	class:py-1={highlight}
>
	<h3 class="text-nowrap font-bold uppercase tracking-wide">{label}</h3>
	<div class="flex w-full items-end justify-between gap-1">
		<p class="w-fit text-nowrap">
			<slot />
		</p>
		<div class="mb-0.5 h-px w-full border-b border-dashed border-muted-foreground bg-muted" />

		<p class="text-nowrap">${result.toFixed(2)}</p>
	</div>
</div>
