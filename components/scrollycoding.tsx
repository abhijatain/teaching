import { z } from "zod";
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection";
import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { Pre, RawCode, highlight } from "codehike/code";
import { wordWrap } from "@/components/annotations/word-wrap";
import { mark } from "@/components/annotations/mark";
import { focus } from "@/components/annotations/focus";
import { diff } from "@/components/annotations/diff";
import { lineNumbers } from "@/components/annotations/line-numbers";
import { CopyButton } from "@/components/annotations/copy-button";

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: CodeBlock })),
});

type ScrollycodingProps = z.infer<typeof Schema>;

const isDev = process.env.NODE_ENV === "development";

export function Scrollycoding(props: ScrollycodingProps) {
  const { steps } = parseProps(props, Schema);
  return (
    <SelectionProvider className="flex gap-8 items-start">
      {/* Left: explanation panels */}
      <div className="flex-1 mt-32 mb-[90vh] ml-2 prose prose-invert max-w-sm">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="border-l-4 border-zinc-700 data-[selected=true]:border-blue-400 px-5 py-3 mb-24 rounded-r bg-zinc-900/50 data-[selected=true]:bg-zinc-800/80 transition-all duration-300"
          >
            <h2 className="mt-4 text-xl font-semibold text-white">
              {step.title}
            </h2>
            <div className="text-zinc-300 leading-relaxed">{step.children}</div>
          </Selectable>
        ))}
      </div>
      {/* Right: sticky code panel */}
      <div className="w-[52%] sticky top-16 h-[calc(100vh-5rem)] overflow-hidden flex flex-col rounded-lg border border-zinc-700">
        <Selection
          from={steps.map((step, i) => (
            <Code key={i} codeblock={step.code} />
          ))}
        />
      </div>
    </SelectionProvider>
  );
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  // Dev mode: skip highlight to keep dev server fast
  if True {
    return (
      <pre className="h-full overflow-auto p-4 text-sm bg-zinc-950 m-0 rounded-lg text-zinc-300">
        <code>{codeblock.value}</code>
      </pre>
    );
  }

  const highlighted = await highlight(codeblock, "github-dark");
  return (
    <Pre
      code={highlighted}
      handlers={[mark, focus, diff, lineNumbers, CopyButton, wordWrap]}
      className="h-full overflow-auto p-4 text-sm bg-zinc-950 m-0 rounded-lg"
      style={{ minHeight: "100%" }}
    />
  );
}
