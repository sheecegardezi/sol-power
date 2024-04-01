import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	if (locals.user && !locals.user.isEmailVerified) {
		redirect(302, '/email-verification');
	}

	return {};
}) satisfies PageServerLoad;
