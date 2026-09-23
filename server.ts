import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_BLOG_POSTS } from './src/data/mockData.js';
import { BlogPost } from './src/types.js';
import planTripHandler from './api/plan-trip.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure JSON parsing errors return JSON instead of default HTML
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ success: false, error: 'Invalid JSON payload provided' });
  }
  next(err);
});

// In-memory blog store initialized with rich posts
let blogPostsStore: BlogPost[] = [...INITIAL_BLOG_POSTS];

// API Routes FIRST

// 1. Plan Trip API Endpoint (Unified Vercel-compatible handler)
app.all('/api/plan-trip', async (req, res) => {
  return planTripHandler(req, res);
});

// 2. Fetch Blog Posts API Endpoint
app.get('/api/blogs', (_req, res) => {
  res.json({ success: true, blogs: blogPostsStore });
});

// 3. Publish New Blog Post API Endpoint
app.post('/api/blogs', (req, res) => {
  const { title, excerpt, content, coverImage, origin, destination, authorName, authorEmail, authorAvatar, tags } = req.body;

  const newPost: BlogPost = {
    id: `blog-${Date.now()}`,
    title: title || 'My Unforgettable Travel Story',
    authorName: authorName || 'Abhiram Boorla',
    authorEmail: authorEmail || 'boorlaabhiram2@gmail.com',
    authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    coverImage: coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    excerpt: excerpt || 'An exciting trip experience shared with the travel community.',
    content: content || 'It was a beautiful trip filled with amazing memories!',
    origin: origin || 'Start',
    destination: destination || 'Finish',
    likesCount: 1,
    commentsCount: 0,
    tags: tags && tags.length ? tags : ['Road Trip', 'Adventure'],
    featured: false,
  };

  blogPostsStore.unshift(newPost);
  res.json({ success: true, post: newPost });
});

// 4. Like / Comment on Blog Endpoint
app.post('/api/blogs/:id/like', (req, res) => {
  const { id } = req.params;
  const post = blogPostsStore.find((b) => b.id === id);
  if (post) {
    post.likesCount += 1;
    return res.json({ success: true, likesCount: post.likesCount });
  }
  res.status(404).json({ success: false, message: 'Post not found' });
});

// 5. Catch-all for unhandled /api/* routes to guarantee JSON response
app.all('/api/*', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// Serve Vite dev middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wanderlust Travel App server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
