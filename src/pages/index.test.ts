import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import Index from "./index.vue";

const { mockPosts } = vi.hoisted(() => ({
	mockPosts: [
		{ path: "/h", name: "Hello World", meta: { frontmatter: { title: "Hello World", date: "2025-01-01" } } },
		{ path: "/m", name: "Math Notes", meta: { frontmatter: { title: "Math Notes", date: "2025-02-01" } } },
		{ path: "/l", name: "MLG60 Report", meta: { frontmatter: { title: "MLG60 Report", date: "2025-12-19" } } },
	]
}));

vi.mock("vue-router/auto-routes", () => ({
	routes: [{ path: "/", meta: {} }, ...mockPosts],
}));

it("lists posts by date", async () => {
	const router = createRouter({
		history: createMemoryHistory(),
		routes: [
			{ path: "/", component: { render: () => null } },
			...mockPosts.map(p => ({ 
				...p, 
				component: { render: () => null },
				meta: p.meta
			}))
		],
	});
	const wrapper = mount(Index, { global: { plugins: [router] } });
	await router.isReady();
	await wrapper.vm.$nextTick();
	console.log(wrapper.html());
	const text = wrapper.text();
	
	expect(text).toContain("Hello World");
	expect(text).toContain("2025-01-01");
	expect(text).toContain("Math Notes");
	expect(text).toContain("2025-02-01");
	expect(text).toContain("MLG60 Report");
	expect(text).toContain("2025-12-19");
});