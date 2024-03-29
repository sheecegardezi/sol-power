import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import bills from '$lib/MOCKING/bills.json';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	return {
		bills: JSON.parse(JSON.stringify(bills))
	};
}) satisfies PageServerLoad;
