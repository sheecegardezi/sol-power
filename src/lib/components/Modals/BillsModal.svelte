<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { format, parse } from 'date-fns';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	interface Bill {
		date: string;
		amountDue: number;
		amountPaid: number;
		numDays: number;
		unitsUsed: number;
		paymentMethod: string;
	}

	export let bill: Bill;

	function formatDate(dateString: string) {
		// Parse the date string into a Date object
		const date = parse(dateString, 'MM/dd/yyyy', new Date());
		// Format the date object into the desired format
		const formattedDate = format(date, 'MMMM yyyy');
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
			<Dialog.Title>Bill Breakdown - {formatDate(bill.date)}</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
