import rss from '@astrojs/rss';
import feedEvents from '../data/feed-events.json';

const monthMap = {
  'jan': 0, 'fev': 1, 'mar': 2, 'abr': 3, 'mai': 4, 'jun': 5,
  'jul': 6, 'ago': 7, 'set': 8, 'out': 9, 'nov': 10, 'dez': 11,
};

function parseBrDate(str) {
  const parts = str.match(/(\w+), (\d+) (\w+) (\d+)/);
  if (!parts) return new Date();
  const [, , day, month, year] = parts;
  return new Date(parseInt(year), monthMap[month], parseInt(day));
}

export async function GET(context) {
  const rawPosts = import.meta.glob('./blog/*.md', { eager: true, query: '?raw', import: 'default' });

  const blogItems = Object.entries(rawPosts).flatMap(([path, raw]) => {
    const slug = path.replace('./blog/', '').replace('.md', '');
    if (typeof raw !== 'string') return [];

    const fm = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fm) return [];

    const frontmatter = fm[1];
    let body = fm[2];

    const title = (frontmatter.match(/title:\s*"(.+?)"/) || [])[1] || slug;

    const dateStr = (body.match(/<small>([^<]+?)&nbsp;/) || [])[1];
    const pubDate = dateStr ? parseBrDate(dateStr) : new Date(2017, 0, 1);

    body = body.replace(/<small>[\s\S]*?<\/small>/, '').trim().substring(0, 500);

    return [{
      title,
      link: `/blog/${slug}/`,
      pubDate,
      description: body,
    }];
  });

  const eventItems = feedEvents.flatMap(e => {
    const d = e.pubDate ? new Date(e.pubDate) : new Date(2017, 0, 1);
    if (isNaN(d.getTime())) return [];
    return [{
      title: e.title,
      link: e.link || `/feed/`,
      pubDate: d,
      description: (e.description || '').substring(0, 500),
    }];
  });

  const allItems = [...blogItems, ...eventItems]
    .sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: 'fefo',
    description: 'Personal website and artistic portfolio',
    site: context.site,
    customData: '<language>pt-br</language>',
    items: allItems,
  });
}
