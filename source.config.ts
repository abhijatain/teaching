import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";

const chConfig = {
  components: { code: "Code" },
};

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      remarkMdxMermaid, // ← must be FIRST
      [remarkCodeHike, chConfig], // ← runs after, won't touch mermaid blocks
    ],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  },
});
