import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	if (locals.user && !locals.user.isEmailVerified) {
		redirect(302, '/email-verification');
	}

	return {};
}) satisfies PageServerLoad;
