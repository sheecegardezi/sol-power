<script lang="ts">
	import Wallet from 'lucide-svelte/icons/wallet';
	import CircleGauge from 'lucide-svelte/icons/circle-gauge';
	import Zap from 'lucide-svelte/icons/zap';

	export let title: 'Balance Due' | 'Energy Usage' | 'Meter Information';
</script>

<div
	class="flex h-52 w-full flex-col rounded-3xl p-7 sm:p-6 md:p-4 xl:p-5 {title ===
	'Meter Information'
		? 'gap-y-8'
		: 'gap-y-10 md:gap-y-14 lg:gap-y-12 xl:gap-y-10'} {$$props.class}"
	class:bg-accent={title !== 'Balance Due'}
	class:text-accent-foreground={title === 'Meter Information'}
	class:border={title !== 'Meter Information'}
	class:bg-background={title === 'Balance Due'}
	class:sm:bg-background={title === 'Energy Usage'}
	class:sm:col-span-2={title === 'Balance Due'}
	class:md:col-span-1={title === 'Balance Due'}
>
	<div
		class="flex items-center justify-between"
		class:opacity-0={title === 'Energy Usage'}
		class:sm:opacity-100={title === 'Energy Usage'}
	>
		{#if title === 'Balance Due'}
			<Wallet size="22" strokeWidth="1.4" />
		{:else if title === 'Energy Usage'}
			<Zap size="22" strokeWidth="1.4" />
		{:else if title === 'Meter Information'}
			<CircleGauge size="22" strokeWidth="1.4" />
		{/if}
		<h3>{title}</h3>
	</div>

	<div class="flex h-full flex-col justify-between">
		<slot />
	</div>
</div>
