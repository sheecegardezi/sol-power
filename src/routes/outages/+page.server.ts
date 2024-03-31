import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import outages from '$lib/MOCKING/outages.json';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	return {
		outages: JSON.parse(JSON.stringify(outages))
	};
}) satisfies PageServerLoad;
