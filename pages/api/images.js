export default async function handler(req, res) {
    const { searchQuery } = req.query;
  
    if (!searchQuery) {
      return res.status(400).json({ error: 'Missing search query' });
    }
  
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&orientation=portrait&per_page=1`, {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
      });
  
      const data = await response.json();
      const imageUrl = data.results[0].urls.regular;
  
      const response2 = await fetch(imageUrl);
      const buffer = await response2.arrayBuffer();
  
      const base64Image = Buffer.from(buffer).toString('base64');
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;
  
      return res.status(200).json({ downloadUrl: dataUrl });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch image' });
    }
  }
  