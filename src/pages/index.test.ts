import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import Index from "./index.vue";

const { mockPosts } = vi.hoisted(() => ({
	mockPosts: [
		{ path: "/h", meta: { frontmatter: { title: "Hello World", date: "2025-01-01" } } },
		{ path: "/m", meta: { frontmatter: { title: "Math Notes", date: "2025-02-01" } } },
		{ path: "/l", meta: { frontmatter: { title: "MLG60 Report", date: "2025-12-19" } } },
	]
}));

vi.mock("vue-router/auto-routes", () => ({
	routes: [{ path: "/", meta: {} }, ...mockPosts],
}));

it("lists posts by date", async () => {
	const router = createRouter({
		history: createMemoryHistory(),
		routes: [{ path: "/", component: Index }, ...mockPosts.map(p => ({ ...p, component: { render: () => null } }))],
	});
	const wrapper = mount(Index, { global: { plugins: [router] } });
	await wrapper.vm.$nextTick();
	const text = wrapper.text();
	
	expect(text).toContain("Hello World");
	expect(text).toContain("2025-01-01");
	expect(text).toContain("Math Notes");
	expect(text).toContain("2025-02-01");
	expect(text).toContain("MLG60 Report");
	expect(text).toContain("2025-12-19");
});