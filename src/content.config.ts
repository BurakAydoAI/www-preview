import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const generalDataSchema = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md, mdx}",
    base: "./src/content/data",
  }),
  schema: z
    .object({
      title: z.string(),
      layout: z.literal("Generaldata"),
      common: z.record(z.string(), z.any()),
      product: z.record(z.string(), z.string()),
      contact: z.record(z.string(), z.any()),
      main: z.record(z.string(), z.any()).optional(),
      support: z.record(z.string(), z.any()).optional(),
      faq: z.record(z.string(), z.any()),
      about: z.record(z.string(), z.any()).optional(),
      distributors: z.record(z.string(), z.string()),
      error: z.string(),
    })
    .passthrough(),
});

const distributorSchema = z.object({
  Unvan: z.string(),
  Adres: z.string(),
  Defrost: z.string().optional(),
  Telefon: z.string(),
  Mail: z.string(),
  Faks: z.string().optional(),
  Web: z.string().url().optional(),
});

export type Distributor = z.infer<typeof distributorSchema>;

const distributionSchema = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.yml",
    base: "./src/content/data",
  }),
  schema: z.object({
    title: z.literal("distributors"),
    layout: z.literal("Distribution"),
    country: z.record(z.string(), z.array(distributorSchema)),
  }),
});

const downloadSchema = z.object({
  title: z.string(),
  layout: z.literal("layouts/Layout.astro"),
});

const faqSchema = z.object({
  title: z.string(),
  layout: z.literal("layouts/FaqLayout.astro"),
});

const obsoluteManualsSchema = z.object({
  title: z.string(),
  layout: z.literal("layouts/ObsoleteManualsLayout.astro"),
  manuals: z.array(z.object({ title: z.string(), url: z.string() })),
});

export type ObsoluteManual = z.infer<typeof obsoluteManualsSchema>;

const blogSchema = z.object({
  title: z.string(),
  layout: z.literal("layouts/BlogLayout.astro"),
  date: z.string().optional(),
  short: z.string().optional(),
});

export type Blog = z.infer<typeof blogSchema>;

const cateogrySchema = z.object({
  title: z.string(),
  layout: z.literal("layouts/CategoryLayout.astro"),
  weight: z.number().default(0),
});

export type Category = z.infer<typeof cateogrySchema>;

const cateogryIndexSchema = z.object({
  title: z.string(),
  layout: z.literal("layouts/CategoryIndexLayout.astro"),
  weight: z.number().optional(),
});

// Products

const manualSchema = z.object({
  title: z.string(),
  url: z.string(),
});

const productSchema = z.object({
  title: z.string(),
  layout: z.undefined(),
  desc: z.array(z.string()).nullable().or(z.string()),
  description: z.string().optional(),
  spec: z
    .array(
      z.union([
        z.string(),
        z.record(z.string(), z.union([z.string(), z.number()])),
      ])
    )
    .optional(),
  short: z.string().optional(),
  weight: z.number().default(0),
  new: z.boolean().optional(),
  manuals: z.array(manualSchema).optional(),
  downloads: z
    .array(
      z.object({
        url: z.string(),
        title: z.string(),
      })
    )
    .optional(),
});

export type Product = z.infer<typeof productSchema>;

// All combined
const SchemeLayout = z.discriminatedUnion("layout", [
  downloadSchema,
  cateogrySchema,
  productSchema,
  blogSchema,
  faqSchema,
  cateogryIndexSchema,
  obsoluteManualsSchema,
]);

const categoryCollectionEN = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md, mdx}",
    base: "./src/content/en",
  }),
  schema: SchemeLayout,
});

const categoryCollectionTR = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md, mdx}",
    base: "./src/content/tr",
  }),
  schema: SchemeLayout,
});

export const collections = {
  data: generalDataSchema,
  distributors: distributionSchema,
  en: categoryCollectionEN,
  tr: categoryCollectionTR,
};
