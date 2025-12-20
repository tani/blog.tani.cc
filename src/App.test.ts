import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "./App.vue";

vi.mock("vue-router/auto-routes", () => ({ routes: [] }));

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

it("renders date from route frontmatter", async () => {
	const wrapper = await factory({
		frontmatter: { date: "2025-12-19" },
	});
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
