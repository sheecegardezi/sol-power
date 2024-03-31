<script lang="ts">
	export let areas: string[];
	export let userArea: string = 'Prospect';

	$: isAffected = areas.includes(userArea);
</script>

<div class="flex items-center gap-x-1.5">
	<div
		class="h-2 w-2 rounded-full bg-green-500"
		class:bg-green-500={isAffected}
		class:bg-red-500={!isAffected}
	/>
	<span>{isAffected ? 'Affected' : 'Not Affected'}</span>
</div>
