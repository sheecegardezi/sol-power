<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Ellipsis } from 'lucide-svelte';

	interface Bill {
		date: string;
		amountDue: number;
		amountPaid: number;
		numDays: number;
		unitsUsed: number;
		paymentMethod: string;
	}

	export let bill: Bill;
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
	>
		<Ellipsis size="18" />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
