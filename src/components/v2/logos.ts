import * as si from "simple-icons";

type Icon = { title: string; path: string };

/** Real brand marks from Simple Icons, never hand-drawn paths. */
const pick = (key: string, label?: string) => {
  const icon = (si as unknown as Record<string, Icon>)[key];
  return { name: label ?? icon.title, path: icon.path };
};

/** Logo-only strip under the hero. Breadth first, no labels. */
export const MARQUEE_LOGOS = [
  "siReact",
  "siNextdotjs",
  "siVuedotjs",
  "siAngular",
  "siSvelte",
  "siAstro",
  "siTypescript",
  "siNodedotjs",
  "siNestjs",
  "siGraphql",
  "siPostgresql",
  "siPrisma",
  "siDocker",
  "siTraefikproxy",
  "siTailwindcss",
  "siVite",
  "siCapacitor",
  "siAndroid",
  "siGo",
  "siPython",
].map((k) => pick(k));

/** Named grid in the stack section: the tools worked with day to day. */
export const CORE_LOGOS = [
  pick("siReact"),
  pick("siNextdotjs", "Next.js"),
  pick("siVuedotjs", "Vue 3"),
  pick("siQuasar"),
  pick("siAngular", "Angular 20"),
  pick("siSvelte"),
  pick("siAstro"),
  pick("siTypescript"),
  pick("siNodedotjs", "Node.js"),
  pick("siNestjs", "NestJS"),
  pick("siExpress"),
  pick("siGraphql"),
  pick("siPostgresql"),
  pick("siPrisma"),
  pick("siMongodb"),
  pick("siRedux", "Redux Toolkit"),
  pick("siPinia"),
  pick("siTailwindcss", "Tailwind CSS"),
  pick("siCapacitor"),
  pick("siAndroid"),
  pick("siDocker"),
  pick("siGo"),
  pick("siPython"),
  pick("siVite"),
];
