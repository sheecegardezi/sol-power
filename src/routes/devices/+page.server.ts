import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}
	return {};
}) satisfies PageServerLoad;
