<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { format, parse } from 'date-fns';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Clock from 'lucide-svelte/icons/clock';
	import { Badge } from '$lib/components/ui/badge/index.js';

	interface Outage {
		date: string;
		start: string;
		end: string | null;
		areas: string[];
		status: 'ongoing' | 'upcoming' | 'resolved';
		type: string;
	}

	export let outage: Outage;

	const myLocation = 'Prospect';

	function formatDate(dateString: string) {
		// Parse the date string into a Date object
		const date = parse(dateString, 'MM/dd/yyyy', new Date());
		// Format the date object into the desired format
		const formattedDate = format(date, 'MMM dd');
		return formattedDate;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
	>
		<Ellipsis size="18" />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{outage.type} Outage</Dialog.Title>
			<Dialog.Description>Your service will be restored as soon as possible!</Dialog.Description>
		</Dialog.Header>

		<div class="flex justify-between gap-6 text-sm text-muted-foreground">
			<div class="flex items-center gap-x-1">
				<Clock size="16" />
				<span>{outage.start} - {outage.end ?? 'TBA'}</span>
			</div>

			<div class="flex items-center gap-x-1">
				<Calendar size="16" />
				<span>{formatDate(outage.date)}</span>
			</div>
		</div>

		<!-- areas -->
		<div class="flex flex-wrap gap-1.5">
			{#each outage.areas as area}
				<Badge variant={area === myLocation ? 'default' : 'secondary'}>{area}</Badge>
			{/each}
		</div>

		<Dialog.Footer class="mt-2 border-t pt-4">
			<Dialog.Description class="flex w-full items-center justify-between">
				<Badge class="w-fit" variant={outage.status}>{outage.status}</Badge>
				<p>
					<span class="hidden sm:inline">Report emegencies at</span>
					<a class="text-accent-foreground underline underline-offset-2" href="tel:+1-784-000-0000"
						>(784)-000-0000
					</a>
				</p>
			</Dialog.Description>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
