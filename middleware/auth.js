export default function ({store, redirect, route}) {
	const userIsLoggedIn = !!store.state.user
	const urlRequiresAuth = /^\/account(\/|$)/.test(route.fullPath)
	const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)
	if (!userIsLoggedIn && urlRequiresAuth) {
		return redirect('/login')
	}
	if (userIsLoggedIn && urlRequiresNonAuth) {
		return redirect('/account')
	}
	return Promise.resolve()
}