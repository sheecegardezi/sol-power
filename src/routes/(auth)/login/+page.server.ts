// sveltekit
import type { Actions, PageServerLoad } from './$types';
// lucia auth
import { lucia } from '$lib/server/luciaAuth';
import { redirect } from '@sveltejs/kit';
// database
import { loginSchema } from '$lib/validation/authSchema';
// superforms
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { checkIfUserExists } from '$lib/server/dbUtils';
import { generateArgon2idHash } from '$lib/server/noblehash';

// If signed in user visits Login page, redirect them to home
export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (user && user.isEmailVerified) {
		redirect(302, '/');
	}

	if (user && !user.isEmailVerified) {
		redirect(302, '/email-verification');
	}

	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return message(form, {
				status: 'error',
				text: 'There was a problem with your submission.'
			});
		}

		const existingUser = await checkIfUserExists(form.data.email);
		if (!existingUser) {
			return setError(
				form,
				'email',
				'Invalid email or password. Please double-check your credentials and try again.'
			);
		}

		let isPasswordValid = false;

		if (existingUser.authMethods.includes('email') && existingUser.password) {
			const hashedPassword = await generateArgon2idHash(form.data.password);
			isPasswordValid = hashedPassword === existingUser.password;
		} else {
			return message(
				form,
				{
					status: 'error',
					text: 'Invalid email or password. Please double-check your credentials and try again.'
				},
				{ status: 403 }
			);
		}

		// If password is not valid, return error message
		if (!isPasswordValid) {
			return setError(
				form,
				'password',
				'Invalid email or password. Please double-check your credentials and try again.'
			);
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
