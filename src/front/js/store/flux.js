const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: localStorage.getItem("token") || undefined,
		},
		actions: {
			savetoken: (token) => {
				setStore({ token })
				localStorage.setItem("token", token)
			},
			checkLogin: (redirect) => {
				const token = localStorage.getItem("token")
				const store = getStore()
				if (token == null || !store.token) {
					redirect("/login")
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore(prevStore => ({
					...prevStore,
					token: undefined,
				}));
			},
		},
	};
}

export default getState;
