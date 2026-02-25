import defaultMdxComponents from "fumadocs-ui/mdx";
import { highlight } from "codehike/code";
import { Pre, RawCode } from "codehike/code";
import type { MDXComponents } from "mdx/types";
import { mark } from "@/components/annotations/mark";
import { focus } from "@/components/annotations/focus";
import { diff } from "@/components/annotations/diff";
import { lineNumbers } from "@/components/annotations/line-numbers";
import { CopyButton } from "@/components/annotations/copy-button";
import { wordWrap } from "@/components/annotations/word-wrap";

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark");
  return (
    <Pre
      code={highlighted}
      handlers={[mark, focus, diff, lineNumbers, CopyButton, wordWrap]}
    />
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Code,
    ...components,
  };
}
