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

// 酒器コレクション（徳利・猪口）
const sakewareCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sakeware' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['tokuri', 'choko']),
    code: z.string(),
    images: z.array(z.string()),
    capacity: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    inStock: z.boolean().default(true),
  }),
});

// ギャラリーコレクション（ジョッキ・塩釉）
const galleryCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['jokki', 'shioyuu']),
    code: z.string(),
    image: z.string(),
    description: z.string().optional(),
    artist: z.string().optional(),
  }),
});

export const collections = {
  products: productsCollection,
  news: newsCollection,
  sakeware: sakewareCollection,
  gallery: galleryCollection,
};
