import { NextResponse } from 'next/server';

export async function GET() {
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    // If not configured, you can fallback to null or throw an error
    return NextResponse.json(
      { error: 'Missing Last.fm API credentials in .env.local' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Next.js caching: revalidate every 30 seconds
        next: { revalidate: 30 }
      }
    );

    const data = await response.json();
    const tracks = data.recenttracks?.track;

    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = tracks[0];
    const isPlaying = track['@attr']?.nowplaying === 'true';
    
    // Find the largest available image
    const images = track.image || [];
    const coverUrl = images.find((img: any) => img.size === 'extralarge')?.['#text'] 
      || images[images.length - 1]?.['#text'] 
      || '';

    return NextResponse.json({
      title: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      isPlaying,
      coverUrl
    });

  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    return NextResponse.json({ error: 'Error fetching data from Last.fm' }, { status: 500 });
  }
}
