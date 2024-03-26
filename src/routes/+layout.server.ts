import type { LayoutServerLoad } from './$types';
// superforms
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, signupSchema } from '$lib/validation/authSchema';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	if (!event.locals.user) redirect(302, '/login');
	const user = event.locals.user;

	const loginForm = await superValidate(zod(loginSchema));
	const signupForm = await superValidate(zod(signupSchema));

	return { loginForm, signupForm, user };
}) satisfies LayoutServerLoad;
