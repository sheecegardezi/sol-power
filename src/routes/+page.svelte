<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Typography/Header.svelte';
	import Section from '$lib/components/Overview/Section.svelte';
	import HighlightCard from '$lib/components/Overview/HighlightCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { MoveRight } from 'lucide-svelte';
	import Triangle from '$lib/components/Overview/Triangle.svelte';
	import MeterInfoRow from '$lib/components/Overview/MeterInfoRow.svelte';
	import LineChart from '$lib/components/Chart/LineChart.svelte';

	export let data: PageData;
	const { user } = data;
</script>

{#if user}
	<Header title="Overview" />
	<Section grid>
		<!-- ---------------->
		<HighlightCard title="Balance Due">
			<p class="text-5xl font-semibold sm:text-6xl md:text-[32px] lg:text-[44px] xl:text-5xl">
				$342.00
			</p>
			<div class="flex items-end justify-between">
				<p>View details</p>
				<Button class="class flex gap-x-1 rounded-full bg-primary text-primary-foreground">
					<span>Pay</span>
					<MoveRight strokeWidth={1.5} />
				</Button>
			</div>
		</HighlightCard>
		<!-- ---------------->
		<HighlightCard title="Energy Usage" class="-z-10 sm:z-0">
			<div class="relative flex gap-x-1">
				<p class="text-5xl font-semibold md:text-[32px] lg:text-[44px] xl:text-5xl">
					214<span class="ml-1.5 text-2xl text-muted-foreground md:text-xl lg:text-2xl">kWh</span>
				</p>
				<div class="flex h-fit items-center text-green-400">
					<Triangle class="h-3" />
					<span class="text-2xl font-medium leading-none md:text-xl lg:text-2xl">17</span>
				</div>
			</div>
			<div class="flex items-end justify-between">
				<p class="font-semibold">31 days</p>
				<p class="uppercase text-muted-foreground">OCT21-NOV20</p>
			</div>
		</HighlightCard>
		<!-- ---------------->
		<HighlightCard title="Meter Information" class="!mt-3.5 sm:!mt-0">
			<MeterInfoRow label="name" value={user.name} />
			<MeterInfoRow label="id" value="00001" />
			<MeterInfoRow label="account" value="0000-0000" />
			<MeterInfoRow label="category" value="Domestic" />
		</HighlightCard>
	</Section>

	<Section title="Usage graph">
		<LineChart />
	</Section>
{/if}
