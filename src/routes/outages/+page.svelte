<script lang="ts">
	import AffectedStatus from '../../lib/components/Outage/AffectedStatus.svelte';

	import type { PageData } from './$types';
	import Header from '$lib/components/Typography/Header.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Table from '$lib/components/ui/table';
	import OutagesModal from '$lib/components/Modals/OutagesModal.svelte';

	export let data: PageData;

	$: outages = data.outages;
</script>

<Header title="Outages" />

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-40">Type</Table.Head>
			<Table.Head class="w-28">Date</Table.Head>
			<Table.Head class="w-28">Start</Table.Head>
			<Table.Head class="w-28">End</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Your Area</Table.Head>
			<Table.Head></Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each outages as outage}
			<Table.Row>
				<Table.Cell class="font-bold tracking-wide">{outage.type}</Table.Cell>
				<Table.Cell>{outage.date}</Table.Cell>
				<Table.Cell>{outage.start}</Table.Cell>
				<Table.Cell>
					{#if outage.end}
						{outage.end}
					{:else}
						<span>TBA</span>
					{/if}
				</Table.Cell>
				<Table.Cell><Badge variant={outage.status}>{outage.status}</Badge></Table.Cell>

				<Table.Cell>
					<AffectedStatus areas={outage.areas} />
				</Table.Cell>
				<Table.Cell>
					<OutagesModal {outage} />
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

<!-- areas -->
<!-- <div class="flex flex-wrap gap-1.5 text-sm">
	{#each outage.areas as area}
		<Badge variant="yellow" class="tracking">
			{area}
		</Badge>
	{/each}
</div> -->
