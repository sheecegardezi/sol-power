// src/hooks.server.ts
import { lucia } from '$lib/server/luciaAuth';
import { type Handle } from '@sveltejs/kit';

// const signupRoutes = new Set(['/login', '/signup']);
// const authorizedRoutes = new Set([
// 	'/',
// 	'/overview',
// 	'/outages',
// 	'/devices',
// 	'/bills',
// 	'/email-verification'
// ]);
export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	event.locals.user = user;
	event.locals.session = session;

	/** -- ROUTE GUARDING ------------------------------------ */
	// if (authorizedRoutes.has(event.url.pathname) && !event.locals.user) {
	// 	console.log(event.url.pathname);
	// 	return redirect(302, '/login');
	// }

	// if (signupRoutes.has(event.url.pathname) && event.locals.user) {
	// 	return redirect(302, '/');
	// }

	// Continue processing the request
	return resolve(event);
};
