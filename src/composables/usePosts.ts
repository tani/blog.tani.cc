import { computed } from "vue";
import { routes } from "vue-router/auto-routes";

export const usePosts = () => {
	const modules = import.meta.glob<any>("../pages/*.md", { eager: true });

	const posts = computed(() =>
		routes
			.filter((r) => r.path !== "/" && r.path !== "/index")
			.map((r) => {
				const m = modules[`../pages${r.path}.md`];
				const fm = (r.meta?.frontmatter ||
					m?.frontmatter ||
					m?.default?.frontmatter ||
					m ||
					r.meta) as any;
				return {
					path: r.path,
					title:
						(r.meta?.frontmatter as any)?.title ||
						fm?.title ||
						(r.name as string) ||
						r.path.slice(1),
					description: fm?.description,
					date: fm?.date,
				};
			})
			.sort((a, b) => {
				if (a.date && b.date)
					return (
						new Date(b.date).getTime() - new Date(a.date).getTime()
					);
				return a.date
					? -1
					: b.date
						? 1
						: a.title.localeCompare(b.title);
			}),
	);

	return { posts };
};
