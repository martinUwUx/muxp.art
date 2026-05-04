'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Camera, Clapperboard, Palette, Heart, Music2, Disc3 } from 'lucide-react';
import Balatro from '../components/Balatro';
import appleMusicLogo from '../assets/Logos/Apple music.svg';
import encuadreLogo from '../assets/Logos/ENCUADRELOGO.svg';
import muxpLogo from '../assets/Logos/MUXP.svg';
import muxpDesignLogo from '../assets/Logos/Muxp design.svg';
import instagramLogo from '../assets/Logos/instagram logo.svg';
import spotifyLogo from '../assets/Logos/spotify logo.svg';
import encuadreCover from '../assets/encuadre-assets/Rectangle 4.svg';
import muxpPhoto from '../assets/encuadre-assets/IMG_0987.png';
import './page.css';

interface Recommendation {
  album: string;
  artist: string;
  description: string;
  coverUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
}

interface NowPlaying {
  title?: string;
  album?: string;
  artist?: string;
  isPlaying: boolean;
  coverUrl?: string;
}

const AppleEmoji = ({ code }: { code: string }) => (
  <img
    src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${code}.png`}
    alt="emoji"
    style={{ display: 'inline-block', width: '1.2em', height: '1.2em', verticalAlign: '-0.2em' }}
  />
);

function App() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  useEffect(() => {
    // Fetch JSONs
    fetch('/data/recommendation.json')
      .then((res) => res.json())
      .then((data) => setRecommendation(data))
      .catch((err) => console.error("Error fetching recommendation:", err));

    fetch('/api/now-playing')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setNowPlaying(data);
        } else {
          // Fallback if API fails (e.g. missing credentials)
          console.warn("Last.fm API issue, falling back to static JSON:", data.error);
          fetch('/data/now_playing.json')
            .then((res) => res.json())
            .then((fallbackData) => setNowPlaying(fallbackData))
            .catch((err) => console.error("Error fetching fallback:", err));
        }
      })
      .catch((err) => console.error("Error fetching now playing:", err));
  }, []);

  return (
    <>
      {/* Background Balatro Animation */}
      <Balatro
        isRotate={true}
        mouseInteraction={true}
        pixelFilter={700}
        color1="#DE443B" // You can adjust these colors to match Liquid Glass better
        color2="#006BB4"
        color3="#162325"
      />

      <div className="app-container">
        <main className="content-grid">
          {/* LEFT COLUMN */}
          <div className="left-col">
            <div className="glass-panel header-pill">
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                Por <img src={muxpLogo.src} alt="MUXP" height="14" style={{ filter: 'brightness(0) invert(1)' }} />
              </span>
            </div>

            <div className="glass-panel bio-card">
              <h1 className="greeting"><AppleEmoji code="1f44b" /> OLAA (tú nombre)</h1>
              <p className="intro">¡Soy Muxp, un gustooo!</p>

              <ul className="bio-list">
                <li>Tonto de profesión</li>
                <li>Intento de persona creativa</li>
                <li>Y parte de Grupo Encuadre Chile, tu nuevo grupo de cine independiente favorito.</li>
              </ul>

              <a href="https://encuadre.framer.media/projects/estasahi" target="_blank" rel="noopener noreferrer" className="short-promo">
                <div className="promo-text">
                  <h4>Pronto en Encuadre</h4>
                  <h3>¿Estás Ahí?</h3>
                  <p>Un corto sobre la duda sin respuesta.</p>
                </div>
                <img src={encuadreCover.src} alt="¿Estás Ahí?" className="promo-image" />
              </a>

              <p className="bio-paragraph">
                Hago <strong>diseño grafico</strong> <AppleEmoji code="1f3a8" /> (moriré de hambre),
                intento hacer <strong>cine</strong> <AppleEmoji code="1f3ac" /> (moriré de hambre),
                me gusta <strong>la fotografía</strong> <AppleEmoji code="1f4f7" /> (moriré de hambre),
                y me gusta <strong>mi novio</strong> <AppleEmoji code="1f497" /> (lo amo, si sabían? es el mejor novio q existe :3)
              </p>

              <div className="links-group">
                <a href="#" className="link-button">
                  <div className="left" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={muxpDesignLogo.src} alt="MUXP Design" height="18" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <ArrowRight size={20} color="var(--text-secondary)" />
                </a>

                <a href="https://encuadre.framer.media/" target="_blank" rel="noopener noreferrer" className="link-button">
                  <div className="left" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={encuadreLogo.src} alt="ENCUADRE" height="18" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <ArrowRight size={20} color="var(--text-secondary)" />
                </a>

                <a href="https://instagram.com/aviladalenconmartin" target="_blank" rel="noopener noreferrer" className="link-button">
                  <div className="left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={instagramLogo.src} alt="Instagram" height="20" style={{ filter: 'brightness(0) invert(1)' }} />
                    <span style={{ fontWeight: 500 }}>@aviladalenconmartin</span>
                  </div>
                  <ArrowRight size={20} color="var(--text-secondary)" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">
            <img
              src={muxpPhoto.src}
              alt="Muxp"
              className="profile-photo"
            />

            <div className="widgets-container">
              {nowPlaying && (
                <div className="glass-panel widget">
                  <div className="widget-info">
                    <span className="widget-label" style={{ display: 'flex', alignItems: 'center' }}>
                      {nowPlaying.isPlaying ? 'AHORA ESCUCHANDO' : 'OFFLINE AHORA'}
                      {nowPlaying.isPlaying && (
                        <div className="equalizer">
                          <div className="bar"></div>
                          <div className="bar"></div>
                          <div className="bar"></div>
                          <div className="bar"></div>
                        </div>
                      )}
                    </span>
                    <span className="widget-title">
                      {nowPlaying.isPlaying ? (nowPlaying.title || nowPlaying.album) : 'No estoy escuchando nada'}
                    </span>
                    <span className="widget-subtitle">
                      {nowPlaying.isPlaying ? nowPlaying.artist : 'Spotify / Apple Music'}
                    </span>
                  </div>
                  <img
                    src={nowPlaying.isPlaying ? nowPlaying.coverUrl : "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop"}
                    alt="Album Cover"
                    className="widget-cover"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop" }}
                  />
                </div>
              )}

              {recommendation && (
                <div className="glass-panel widget">
                  <div className="widget-info">
                    <span className="widget-label">RECOMENDACIÓN DEL MES</span>
                    <span className="widget-title">{recommendation.album} - {recommendation.artist}</span>
                  </div>
                  {recommendation.coverUrl.endsWith('.mp4') ? (
                    <video src={recommendation.coverUrl} className="widget-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={recommendation.coverUrl} alt="Recommendation Cover" className="widget-cover" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1493225457124-a1a2a5f5cb46?q=80&w=100&auto=format&fit=crop" }} />
                  )}
                </div>
              )}

              <div className="social-icons">
                {/* Spotify */}
                <a href={recommendation?.spotifyUrl || "#"} target="_blank" rel="noopener noreferrer">
                  <img src={spotifyLogo.src} alt="Spotify" height="24" style={{ filter: 'brightness(0) invert(1)' }} />
                </a>
                {/* Apple Music */}
                <a href={recommendation?.appleMusicUrl || "#"} target="_blank" rel="noopener noreferrer">
                  <img src={appleMusicLogo.src} alt="Apple Music" height="24" style={{ filter: 'brightness(0) invert(1)' }} />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
