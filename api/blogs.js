// Vercel Serverless Function for Blogs API
const INITIAL_BLOG_POSTS = [
  {
    id: 'blog-1',
    title: '🌴 Mumbai to Goa Coastal Highway Expedition (NH-66)',
    authorName: 'Abhiram Boorla',
    authorEmail: 'boorlaabhiram2@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'July 25, 2026',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Driving through lush Konkan ghats, stopping at local Maharashtrian dhabas, petrol stations, and luxury beach resorts in North Goa!',
    content: `Cruising along the four-lane Mumbai to Goa NH-66 highway is a rite of passage for every Indian road-tripper. Leaving the bustle of Mumbai early at 5:00 AM, the sea breeze of the Konkan coastline greets you with pristine palm groves.

### The Route & Pit Stops
The total distance is roughly 580 km. Make sure to top up fuel at the IndianOil Swagat Highway Plaza near Chiplun. For mid-way snacks, stop at Hotel Vitthal Kamat for piping hot Misal Pav and filter coffee.

### Stays & Luxury Beachfront Resorts
In North Goa, we booked the Taj Fort Aguada Resort & Spa near Sinquerim Beach. Waking up to waves crashing against historic Portuguese fort walls was ethereal.

### Local Seafood & Shopping Malls
Don't miss butter garlic prawns at Brittos Baga Beach and shopping at Mall De Goa in Porvorim for local cashew nuts and handicrafts.`,
    origin: 'Mumbai, MH',
    destination: 'Goa (Panaji)',
    likesCount: 384,
    commentsCount: 42,
    tags: ['India', 'Road Trip', 'Beach', 'Goa', 'Konkan'],
    featured: true,
  },
  {
    id: 'blog-2',
    title: '⛰️ Delhi to Manali & Solang Valley Bike & SUV Drive',
    authorName: 'Vikramaditya Sharma',
    authorEmail: 'vikram.sharma@himalayas.in',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'July 22, 2026',
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Conquering the Himalayan foothills on a Royal Enfield Himalayan & Mahindra Thar 4x4. Complete fuel stop and dhaba guide!',
    content: `Taking the Chandigarh-Manali highway up into the snow-capped Himalayan ranges is an unmatched adrenaline rush.

### Fuel & Highway Dhabas
Refuel your bike or SUV at the HPCL Auto Care Centre near Bilaspur. Eat stuffed parathas with homemade white butter at the legendary Sukhdev Dhaba Murthal near Delhi.

### Shopping & Hotels
Stay at The Himalayan Resort & Spa in Old Manali and shop at Mall Road Manali for handmade Pashmina shawls and Kullu caps.`,
    origin: 'Delhi, NCR',
    destination: 'Manali, HP',
    likesCount: 512,
    commentsCount: 68,
    tags: ['Mountains', 'Royal Enfield', 'Himalayas', 'Adventure'],
    featured: true,
  },
];

let globalBlogs = [...INITIAL_BLOG_POSTS];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, blogs: globalBlogs });
  }

  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      const { title, excerpt, content, coverImage, origin, destination, authorName, authorEmail, authorAvatar, tags } = body || {};

      const newPost = {
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

      globalBlogs.unshift(newPost);
      return res.status(200).json({ success: true, post: newPost });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message || 'Failed to create blog post' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
