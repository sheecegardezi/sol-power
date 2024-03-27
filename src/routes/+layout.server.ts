import type { LayoutServerLoad } from './$types';
// superforms
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, signupSchema } from '$lib/validation/authSchema';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	const user = event.locals.user;

	// Redirect unauthenticated users only for specific routes
	if (!user && event.url.pathname !== '/login' && event.url.pathname !== '/signup') {
		return redirect(302, '/login'); // Or a more appropriate route based on context
	}

	// Remove this if adding a dedicated route for Overview
	if (user && event.url.pathname === '/overview') {
		return redirect(302, '/');
	}

	const loginForm = await superValidate(zod(loginSchema));
	const signupForm = await superValidate(zod(signupSchema));

	return { loginForm, signupForm, user };
}) satisfies LayoutServerLoad;
