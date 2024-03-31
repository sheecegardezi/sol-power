<script lang="ts">
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import CircleGauge from 'lucide-svelte/icons/circle-gauge';
	import Zap from 'lucide-svelte/icons/zap';

	import { mediaQuery } from 'svelte-legos';

	export let title: 'Balance Due' | 'Energy Usage' | 'Meter Information';

	const isMobile = mediaQuery('(max-width: 640px)'); // $isLargeScreen => true | false
</script>

<div
	class="flex h-48 w-full flex-col rounded-3xl border bg-background p-6 sm:h-52 md:p-4 xl:p-5 {title ===
	'Meter Information'
		? 'gap-y-8'
		: 'gap-y-6 sm:gap-y-10 md:gap-y-14 lg:gap-y-12 xl:gap-y-10'} {$$props.class}"
	class:text-accent-foreground={title === 'Meter Information'}
	class:sm:bg-background={title === 'Energy Usage' && !$isMobile}
	class:bg-muted={title === 'Energy Usage' && $isMobile}
	class:sm:col-span-2={title === 'Balance Due'}
	class:md:col-span-1={title === 'Balance Due'}
>
	<div
		class="flex items-center justify-between"
		class:opacity-0={title === 'Energy Usage'}
		class:sm:opacity-100={title === 'Energy Usage'}
	>
		{#if title === 'Balance Due'}
			<CreditCard size="22" strokeWidth="1.4" />
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
