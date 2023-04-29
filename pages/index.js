import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSearch = async () => {
    if (!searchQuery) return;
    const response = await fetch(`/api/images?searchQuery=${searchQuery}`);
    const json = await response.json();
    setImageUrl(json.downloadUrl);
  };

  return (
    <div>
      <h1>
        Unsplash Image Downloader

      </h1>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt={searchQuery}
          />
          <br/>
            <a
            href={imageUrl}
            download={`${searchQuery}.jpg`}>
          <button>
            Download
          </button>
            </a>
        </div>
      )}
    </div>
  );
}