import type { MetadataRoute } from 'next';
import { gameCollections } from './lib/gameData';
import { posts } from './lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jigmerge.com';
  const appUpdatedAt = new Date('2026-03-12T00:00:00.000Z');

  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const, lastModified: appUpdatedAt },
    { path: '/play', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: appUpdatedAt },
    { path: '/categories', priority: 0.8, changeFrequency: 'weekly' as const, lastModified: appUpdatedAt },
    { path: '/how-to-play', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: appUpdatedAt },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const, lastModified: appUpdatedAt },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const, lastModified: appUpdatedAt },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const, lastModified: appUpdatedAt },
    { path: '/contact', priority: 0.2, changeFrequency: 'yearly' as const, lastModified: appUpdatedAt },
    { path: '/parents', priority: 0.4, changeFrequency: 'monthly' as const, lastModified: appUpdatedAt },
    { path: '/privacy-policy', priority: 0.1, changeFrequency: 'yearly' as const, lastModified: appUpdatedAt },
    { path: '/terms', priority: 0.1, changeFrequency: 'yearly' as const, lastModified: appUpdatedAt },
    { path: '/cookie-policy', priority: 0.1, changeFrequency: 'yearly' as const, lastModified: appUpdatedAt },
    { path: '/disclaimer', priority: 0.1, changeFrequency: 'yearly' as const, lastModified: appUpdatedAt },
    { path: '/accessibility', priority: 0.1, changeFrequency: 'yearly' as const, lastModified: appUpdatedAt },
  ];

  const blogPosts = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(post.date),
  }));

  const collectionPages = gameCollections.map((collection) => ({
    path: `/categories/${collection.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
    lastModified: appUpdatedAt,
  }));

  const allPages = [...staticPages, ...blogPosts, ...collectionPages];

  return allPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
