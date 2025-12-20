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

it("renders date from meta", async () => {
	const wrapper = await factory({ frontmatter: { date: "2025-12-19" } });
	expect(wrapper.text()).toContain("2025-12-19");
});

it("omits date when missing", async () => {
	const wrapper = await factory();
	expect(wrapper.text()).not.toContain("2025-");
});