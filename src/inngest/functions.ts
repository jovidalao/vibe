import { createAgent, grok } from '@inngest/agent-kit';

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {      
    const summarizer = createAgent({
      name: 'summarizer',
      system:
        "You are a summarizer. You are given a text and you need to summarize it.",
      model: grok({ model: "grok-4" }),
    });

    const { output } = await summarizer.run(
      'Summarize the following text: ' + event.data.value
    );
    console.log(output);
    return { output };
  },
);