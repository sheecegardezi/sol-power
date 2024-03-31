<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { format, parse } from 'date-fns';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CalcRow from '../Bill/CalcRow.svelte';

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

	const rate = 0.5;
	const fRate = 0.59;
	const vatRate = 0.16;

	const amountDue = bill.amountDue / 100;
	const amountPaid = bill.amountPaid / 100;
	const days = bill.numDays;
	const unitsUsed = bill.unitsUsed;
	const date = formatDate(bill.date);

	$: vatAmt = bill.unitsUsed - 150 ? bill.unitsUsed - 150 : 0;
	$: vatRes = vatAmt ? vatAmt * vatRate * rate : 0;

	$: energyFees = unitsUsed * rate;
	$: fuelSurcharge = unitsUsed * fRate;
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
	>
		<Ellipsis size="18" />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Bill Breakdown - {date}</Dialog.Title>
			<Dialog.Description>See how your charges were calculated!</Dialog.Description>
		</Dialog.Header>

		<div class="flex w-full flex-col gap-2">
			<h2 class="font-semibold text-muted-foreground">Current fees</h2>
			<CalcRow label="Energy usage" result={energyFees}
				>{unitsUsed.toFixed(1)} kWh x ${rate}</CalcRow
			>
			<CalcRow label="VAT" result={vatRes}>{vatAmt.toFixed(1)} kWh x {vatRate}</CalcRow>
			<CalcRow label="Fuel Surcharge" result={fuelSurcharge}>
				{unitsUsed.toFixed(1)} kWh x ${fRate}
			</CalcRow>
			<CalcRow label="Total Energy Cost" result={vatRes + energyFees + fuelSurcharge} highlight />
			<CalcRow
				label="Balance Brought Forward"
				result={amountDue - (vatRes + energyFees + fuelSurcharge)}
				highlight
			/>
		</div>

		<Dialog.Footer class="mt-2 border-t pt-4">
			<span>Amount due: </span><strong>${amountDue.toFixed(2)}</strong>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
