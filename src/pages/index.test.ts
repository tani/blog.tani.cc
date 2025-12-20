import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import IndexPage from "./index.vue";
import { createRouter, createWebHistory } from "vue-router";

// Mock vue-router/auto-routes
vi.mock("vue-router/auto-routes", () => ({
	routes: [
		{ path: "/", name: "index", meta: {} },
		{ 
			path: "/hello-world", 
			name: "hello-world", 
			meta: { frontmatter: { title: "Hello World", description: "A friendly introduction" } } 
		},
		{ 
			path: "/math-notes", 
			name: "math-notes", 
			meta: { frontmatter: { title: "Math Notes" } } 
		},
		{ 
			path: "/mlg2025", 
			name: "mlg2025", 
			meta: { frontmatter: { title: "【MLG60発表報告】ランベック計算に循環証明を導入する試み" } } 
		},
	],
}));

// We can't easily mock import.meta.glob, so we rely on meta.frontmatter in the test.

describe("IndexPage", () => {
	it("should display post titles instead of filenames", async () => {
		const router = createRouter({
			history: createWebHistory(),
			routes: [
				{ path: "/", component: { render: () => null } },
				{ path: "/hello-world", component: { render: () => null } },
				{ path: "/math-notes", component: { render: () => null } },
			],
		});

		const wrapper = mount(IndexPage, {
			global: {
				plugins: [router],
			},
		});

		// Wait for computed properties
		await wrapper.vm.$nextTick();

		const text = wrapper.text();
		expect(text).toContain("Hello World");
		expect(text).toContain("Math Notes");
		expect(text).toContain("【MLG60発表報告】ランベック計算に循環証明を導入する試み");
		
		// Ensure filenames are NOT displayed (though they might be part of titles, 
		// but we want to make sure the frontmatter title is used)
		// For example, mlg2025.md should show the long Japanese title.
		expect(text).not.toContain("mlg2025");
	});
});
