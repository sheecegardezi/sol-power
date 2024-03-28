<script lang="ts">
	export let label: string;
	export let value: string | number;
</script>

<div class="flex items-center gap-x-1">
	<p class="text-nowrap uppercase text-muted-foreground">{label}</p>
	<div class="h-1 w-full border-b border-dashed border-muted-foreground bg-muted" />
	<p class="text-nowrap font-semibold capitalize">{value}</p>
</div>
