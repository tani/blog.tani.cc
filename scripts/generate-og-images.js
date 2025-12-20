import {
	readFileSync,
	readdirSync,
	writeFileSync,
	mkdirSync,
	existsSync,
} from "fs";
import { resolve, dirname, join } from "path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const BASE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(BASE, "public/og");

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const fontPath = fileURLToPath(
	import.meta
		.resolve("@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff"),
);
const font = readFileSync(fontPath);

for (const file of readdirSync(join(BASE, "src/pages")).filter((f) =>
	f.endsWith(".md"),
)) {
	const { data } = matter(
		readFileSync(join(BASE, "src/pages", file), "utf-8"),
	);
	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					display: "flex",
					flexDirection: "column",
					height: "100%",
					width: "100%",
					padding: "40px 80px",
					backgroundColor: "#fff",
					justifyContent: "center",
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								fontSize: 60,
								fontWeight: 700,
								marginBottom: 20,
							},
							children: data.title || "Untitled",
						},
					},
					{
						type: "div",
						props: {
							style: { fontSize: 30, color: "#666" },
							children: data.date
								? new Date(data.date).toISOString().slice(0, 10)
								: "",
						},
					},
					{
						type: "div",
						props: {
							style: {
								position: "absolute",
								bottom: 40,
								right: 80,
								fontSize: 24,
								color: "#999",
							},
							children: "My Blog",
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [{ name: "Noto", data: font, weight: 700, style: "normal" }],
		},
	);
	writeFileSync(
		join(OUT, file.replace(".md", ".png")),
		new Resvg(svg).render().asPng(),
	);
	console.log(`Generated: ${file.replace(".md", ".png")}`);
}
