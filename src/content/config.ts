import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    series: z.enum(['nirin', 'tori', 'raku', 'roku', 'bara', 'sono', 'some', 'akae']),
    images: z.array(z.string()),
    price: z.number(),
    size: z.string(),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
  }),
});

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  products: productsCollection,
  news: newsCollection,
};
