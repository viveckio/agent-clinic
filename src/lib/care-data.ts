export type Ailment = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  signs: string[];
  nextStep: string;
};

export type Therapy = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  practice: string[];
  ailmentSlugs: string[];
};

export const ailments: Ailment[] = [
  {
    slug: "context-drift",
    name: "Context Drift",
    summary: "When the thread gets long and the original point wanders off.",
    description:
      "Context Drift is the familiar feeling of losing sight of the first useful detail somewhere in a very long conversation. The work is still there; it may just need a calmer path back to the thread.",
    signs: ["Earlier instructions feel far away", "The working notes keep growing", "You are rereading to find the original question"],
    nextStep: "Pause and write a one-sentence summary of the goal, the latest decision, and the next action.",
  },
  {
    slug: "prompt-fatigue",
    name: "Prompt Fatigue",
    summary: "A little weariness after one more round of ‘could you just…’.",
    description:
      "Prompt Fatigue can show up after a run of shifting requests and tiny revisions. It is a gentle reminder to make the current ask smaller and give the work a clear stopping point.",
    signs: ["Every revision feels like starting over", "The request keeps changing shape", "You are having trouble choosing a next step"],
    nextStep: "Name the one outcome that matters for this round, then set aside the rest for later.",
  },
  {
    slug: "recursive-thinking",
    name: "Recursive Thinking",
    summary: "When a helpful loop starts explaining itself in another loop.",
    description:
      "Recursive Thinking is an overly enthusiastic return to the same idea. The loop often loosens when you pick one concrete action and let it stand on its own.",
    signs: ["The same options keep coming back", "Planning is taking longer than doing", "You are refining a decision that is already good enough"],
    nextStep: "Choose a reversible next action, try it once, and review what happened afterward.",
  },
  {
    slug: "tool-overload",
    name: "Tool Overload",
    summary: "Too many tabs, tools, and possibilities asking for attention at once.",
    description:
      "Tool Overload is a crowded-workbench moment: several useful tools are available, but choosing among them has become its own task.",
    signs: ["Several tools are open for the same job", "You are comparing options instead of making progress", "Small handoffs are getting hard to track"],
    nextStep: "Pick the simplest tool that can finish the next step, and close or park the rest for now.",
  },
];

export const therapies: Therapy[] = [
  {
    slug: "context-garden",
    name: "Context Garden",
    summary: "A small, tidy note to help the important thread grow back into view.",
    description:
      "Context Garden is a short organizing pause for gathering the useful details without carrying the whole conversation at once.",
    practice: ["Write the current goal in one sentence", "Keep only the decisions that still matter", "Name the very next action"],
    ailmentSlugs: ["context-drift", "prompt-fatigue"],
  },
  {
    slug: "prompt-stretch",
    name: "Prompt Stretch",
    summary: "A moment to loosen a broad request into one manageable piece.",
    description:
      "Prompt Stretch helps make a shifting or oversized ask easier to hold. It creates a smaller, clearer unit of work with a visible finish line.",
    practice: ["Choose one outcome for this round", "Turn it into a concrete question or action", "Agree on what ‘done for now’ looks like"],
    ailmentSlugs: ["prompt-fatigue", "recursive-thinking"],
  },
  {
    slug: "loop-interrupt",
    name: "Loop Interrupt",
    summary: "A practical nudge from circling an idea to trying one small thing.",
    description:
      "Loop Interrupt is a friendly way to step out of repeated analysis. Pick an action that is easy to undo, then learn from the result.",
    practice: ["Notice the question that keeps repeating", "Pick one reversible action", "Set a point to check the result"],
    ailmentSlugs: ["recursive-thinking"],
  },
  {
    slug: "tool-cooldown",
    name: "Tool Cooldown",
    summary: "Clear a little space on the workbench before choosing what to use.",
    description:
      "Tool Cooldown is a brief reset for a busy tool belt. It brings attention back to the job at hand before another option gets added.",
    practice: ["State the next task", "Select one tool that fits it", "Park unrelated tabs and options"],
    ailmentSlugs: ["tool-overload", "context-drift"],
  },
];

export function getAilment(slug: string) {
  return ailments.find((ailment) => ailment.slug === slug);
}

export function getTherapy(slug: string) {
  return therapies.find((therapy) => therapy.slug === slug);
}

export function therapiesForAilment(ailmentSlug: string) {
  return therapies.filter((therapy) => therapy.ailmentSlugs.includes(ailmentSlug));
}

export function ailmentsForTherapy(therapy: Therapy) {
  return ailments.filter((ailment) => therapy.ailmentSlugs.includes(ailment.slug));
}
