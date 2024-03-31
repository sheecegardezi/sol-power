<script lang="ts">
	export let label: string;
	export let value: string | number;
</script>

<div class="flex items-end gap-x-1">
	<p class="text-nowrap uppercase leading-none text-muted-foreground">{label}</p>
	<div class="mb-0.5 h-px w-full border-b border-dashed border-muted-foreground bg-muted" />
	<p class="text-nowrap font-semibold capitalize leading-none">{value}</p>
</div>
