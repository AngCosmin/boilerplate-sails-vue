const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
	return {
		auth: null,
		name: null,
		email: null
	}
}

export const mutations = {
	setAuth(state, { auth, name, email }) {
		state.auth = auth
		state.name = name
		state.email = email
	},
	logout(state) {
		state.auth = null
		state.name = null
		state.email = null
	},
}

export const actions = {
	nuxtServerInit({ commit }, { req }) {
		let auth = null, name = null, email = null

		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie)

			try {
				auth = JSON.parse(parsed.auth)
				name = parsed.name
				email = parsed.email
			} catch (err) {
				console.log(err)
				// No valid cookie found
			}
		}

		commit('setAuth', { auth, name, email })
	}
}
