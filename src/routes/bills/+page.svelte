<script lang="ts">
	import Header from '$lib/components/Typography/Header.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { mediaQuery } from 'svelte-legos';

	import type { PageData } from './$types';
	import BillsModal from '$lib/components/Modals/BillsModal.svelte';

	export let data: PageData;

	const isDesktop = mediaQuery('(min-width: 768px)');

	let count = data.bills.length;
	let currentPage = 1;
	$: perPage = $isDesktop ? 11 : 8;
	$: siblingCount = $isDesktop ? 1 : 0;

	$: totalPages = Math.ceil(count / perPage);

	$: startIndex = (currentPage - 1) * perPage;
	$: endIndex = Math.min(startIndex + perPage, count);

	$: paginatedBills = data.bills.slice(startIndex, endIndex);

	function gotoPage(page: number) {
		currentPage = page;
		startIndex = (currentPage - 1) * perPage;
		endIndex = Math.min(startIndex + perPage, count);
		paginatedBills = data.bills.slice(startIndex, endIndex);
	}
</script>

<Header title="Bills" />

<div class="flex flex-col gap-y-4 md:gap-y-6 xl:gap-y-8">
	<Table.Root>
		<!-- <Table.Caption>A list of your recent bills.</Table.Caption> -->
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px] bg-accent font-bold">Date</Table.Head>
				<Table.Head class="bg-accent text-right font-bold">Amount Due</Table.Head>
				<Table.Head class="bg-accent text-right font-bold">Amount Paid</Table.Head>
				<Table.Head class="bg-accent text-right font-bold">Units used (kWh)</Table.Head>
				<Table.Head class="bg-accent text-right font-bold">No. days</Table.Head>
				<Table.Head class="bg-accent text-right font-bold">Payment Method</Table.Head>
				<Table.Head class="bg-accent text-right font-bold"></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each paginatedBills as bill (bill.date)}
				<Table.Row>
					<Table.Cell class="font-semibold">{bill.date}</Table.Cell>
					<Table.Cell class="text-right">${bill.amountDue / 100}</Table.Cell>
					<Table.Cell class="text-right">${bill.amountPaid / 100}</Table.Cell>
					<Table.Cell class="text-right">{bill.unitsUsed}</Table.Cell>
					<Table.Cell class="text-right">{bill.numDays}</Table.Cell>
					<Table.Cell class="text-right">{bill.paymentMethod}</Table.Cell>
					<Table.Cell class="text-right">
						<BillsModal {bill} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<Pagination.Root {count} {perPage} {siblingCount} let:pages let:range>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton
					disabled={currentPage === 1}
					on:click={() => gotoPage(currentPage - 1)}
				>
					<ChevronLeft class="h-4 w-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link
							class="transition-all {currentPage == page.value
								? 'border-none bg-primary text-primary-foreground transition-colors hover:bg-primary'
								: ''}"
							{page}
							isActive={currentPage == page.value}
							on:click={() => gotoPage(page.value)}
						>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton
					disabled={currentPage === totalPages}
					on:click={() => gotoPage(currentPage + 1)}
				>
					<span class="hidden sm:block">Next</span>
					<ChevronRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>

		<p class="text-center text-[13px] text-muted-foreground">
			Showing bills <strong>{range.start || 1} - {range.end}</strong> of your recent bills
		</p>
	</Pagination.Root>
</div>
