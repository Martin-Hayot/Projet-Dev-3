import { defineStore } from "pinia";

export const useAuthStore = defineStore({
	id: "auth",
	state: () => ({ token: "", user: {} }),
	actions: {
		loadDataFromLocalStorage() {
			if (process.client) {
				const JWT = window.localStorage.getItem("token");
				const user = window.localStorage.getItem("user");
				if (JWT) {
					this.token = JWT;
				}
				if (user) {
					this.user = JSON.parse(user);
				}
			}
		},
		saveDataToLocalStorage() {
			if (process.client) {
				const JWT = JSON.stringify(this.token);
				const user = JSON.stringify(this.user);
				window.localStorage.setItem("token", JWT);
				window.localStorage.setItem("user", user);
			}
		},
	},
});
