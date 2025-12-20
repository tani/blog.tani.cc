import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

// Mock vue-router/auto-routes
vi.mock("vue-router/auto-routes", () => ({
	routes: [],
}));

// We need to mock import.meta.glob for the test to work if it's used in App.vue
// Actually, it's better to just test if the component renders what's in route.meta if possible,
// but since we added glob to App.vue, we should mock it or use a different approach.

describe("App", () => {
	it("should render the date if present in route meta frontmatter", async () => {
		const router = createRouter({
			history: createWebHistory(),
			routes: [
				{ path: "/", component: { template: "<div>Home</div>" } },
				{
					path: "/test",
					component: { template: "<div>Test</div>" },
					meta: {
						frontmatter: {
							date: "2025-12-19",
						},
					},
				},
			],
		});

		router.push("/test");
		await router.isReady();

		const wrapper = mount(App, {
			global: {
				plugins: [router],
			},
		});

		await router.isReady();
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain("2025-12-19");
	});

	it("should not render the date if not present in route meta frontmatter", async () => {
		const router = createRouter({
			history: createWebHistory(),
			routes: [
				{ path: "/", component: { template: "<div>Home</div>" } },
				{
					path: "/test",
					component: { template: "<div>Test</div>" },
				},
			],
		});

		router.push("/test");
		await router.isReady();

		const wrapper = mount(App, {
			global: {
				plugins: [router],
			},
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).not.toContain("2025-");
	});
});
