import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export default createPinia().use(
	createPersistedState({ storage: window.localStorage })
);
