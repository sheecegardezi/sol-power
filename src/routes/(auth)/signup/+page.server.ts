// lucia auth
import { lucia } from '$lib/server/luciaAuth';
import { generateArgon2idHash } from '$lib/server/noblehash';
// superforms
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
// sveltekit
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
// database
import { signupSchema } from '$lib/validation/authSchema';
import { checkIfUserExists, createUser } from '$lib/server/dbUtils';
import { generateVerificationCode, sendVerificationCode } from '$lib/server/luciaAuthUtils';
import { generateId } from 'lucia';
// import { eq } from 'drizzle-orm';
// import { db } from '$lib/server/db';
// import { userTable } from '$lib/server/schema';

// If signed in user visits Signup page, redirect them to home
export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (user && !user.isEmailVerified) {
		redirect(302, '/email-verification');
	}

	if (user && user.isEmailVerified) {
		redirect(302, '/');
	}

	return {
		form: await superValidate(zod(signupSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(signupSchema));
		if (!form.valid) {
			return message(form, {
				status: 'error',
				text: 'Please check your entries, the form contains invalid data'
			});
		}

		try {
			const userEmail = form.data.email;
			const existingUser = await checkIfUserExists(userEmail);
			if (existingUser) {
				return message(form, {
					status: 'error',
					text: 'This email is already associated with an account. Please review your sign-in options or try a different method.'
				});
			}

			const userId = generateId(15);

			const hashedPassword = await generateArgon2idHash(form.data.password);

			await createUser({
				id: userId,
				name: form.data.name,
				email: userEmail,
				isEmailVerified: false,
				password: hashedPassword,
				authMethods: ['email']
			});
			// } else {
			// 	await db
			// 		.update(userTable)
			// 		.set({
			// 			password: hashedPassword
			// 		})
			// 		.where(eq(userTable.email, userEmail));
			// }

			const emailVerificationCode = await generateVerificationCode(userId, userEmail);
			const sendVerificationCodeResult = await sendVerificationCode(
				userEmail,
				emailVerificationCode
			);
			if (!sendVerificationCodeResult.result) {
				return message(form, {
					status: 'error',
					text: sendVerificationCodeResult.message
				});
			}

			// Create Lucia session and set session cookie
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			redirect(302, '/email-verification');
			// this redirect should run before the load functions'
		} catch (error) {
			// Return error message if an error occurs during processing
			return message(form, {
				status: 'error',
				text: 'An error occurred while processing your request. Please try again.'
			});
		}
	}
};
