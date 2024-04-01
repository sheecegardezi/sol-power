import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import bills from '$lib/MOCKING/bills.json';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	if (locals.user && !locals.user.isEmailVerified) {
		redirect(302, '/email-verification');
	}

	return {
		bills: JSON.parse(JSON.stringify(bills))
	};
}) satisfies PageServerLoad;
