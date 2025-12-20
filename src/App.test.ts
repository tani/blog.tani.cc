import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "./App.vue";

vi.mock("vue-router/auto-routes", () => ({ routes: [] }));

import { computed } from "vue";

vi.mock("./composables/usePosts", () => ({
	usePosts: () => ({
		posts: computed(() => [
			{ path: "/t", title: "Test Post", date: "2025-12-19" },
		]),
	}),
}));

const factory = async (meta = {}) => {
	const router = createRouter({
		history: createMemoryHistory(),
		routes: [
			{ path: "/", component: { render: () => null } },
			{ path: "/t", component: { render: () => null }, meta },
		],
	});
	router.push("/t");
	await router.isReady();
	return mount(App, { global: { plugins: [router] } });
};

it("renders date from posts composable", async () => {
	// The meta is not used directly anymore in App.vue for date, it uses usePosts.
	// But we mock usePosts above to return a post for /t.
	const wrapper = await factory();
	expect(wrapper.text()).toContain("2025-12-19");
});

it("omits date when missing", async () => {
	// Override the mock for this test or use a different path
	// Let's use a different path /m that is not in the mocked posts
	const router = createRouter({
		history: createMemoryHistory(),
		routes: [
			{ path: "/", component: { render: () => null } },
			{ path: "/m", component: { render: () => null } },
		],
	});
	router.push("/m");
	await router.isReady();
	const wrapper = mount(App, { global: { plugins: [router] } });
	expect(wrapper.text()).not.toContain("2025-");
});
