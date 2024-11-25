import React, { useState } from 'react';
import './TabletFelvetel.css';

export default function TabletFelvetel() {
  const [name, setName] = useState<string>('');
  const [os, setOs] = useState<string>('');
  const [cpuSpeed, setCpuSpeed] = useState<number>(0);
  const [cores, setCores] = useState<number>(0);
  const [displaySize, setDisplaySize] = useState<number>(0);
  const [resolutionX, setResolutionX] = useState<number>(0);
  const [resolutionY, setResolutionY] = useState<number>(0);
  const [ram, setRam] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newTablet = {
      name,
      os,
      cpu_speed: cpuSpeed,
      cores,
      display_size: displaySize,
      resolution_x: resolutionX,
      resolution_y: resolutionY,
      ram,
      price
    };

    try {
      const response = await fetch('http://localhost:3000/tablets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTablet)
      });

      if (!response.ok) {
        setError('Hiba történt a tablet hozzáadásakor!');
        return;
      }

      setName('');
      setOs('');
      setCpuSpeed(0);
      setCores(0);
      setDisplaySize(0);
      setResolutionX(0);
      setResolutionY(0);
      setRam(0);
      setPrice(0);
    } catch (err: any) {
      setError('Hiba történt a tabletek felvételekor.');
    }
  };

  return (
    <div className="tablet-felvetel">
      <h2>Új Tablet Felvétele</h2>
      <div className="links">
        <a href="/kezdolap" className="btn">Kezdőlap</a>
        <a href="/tabletek" className="btn">Készleten lévő tabletek</a>
        <a href="/tablettorles" className="btn">Tabletek törlése</a>
        <a href="/tabletkereses" className="btn">Tablet keresés</a>
        <a href="/tabletlapozas" className="btn">Tablet lapozás</a>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label>Tablet Név</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Operációs Rendszer</label>
          <input type="text" value={os} onChange={(e) => setOs(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>CPU Sebesség (GHz)</label>
          <input type="number" value={cpuSpeed} onChange={(e) => setCpuSpeed(parseFloat(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>CPU Magok</label>
          <input type="number" value={cores} onChange={(e) => setCores(parseInt(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>Képernyő Méret (inch)</label>
          <input type="number" value={displaySize} onChange={(e) => setDisplaySize(parseFloat(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>Képfelbontás X</label>
          <input type="number" value={resolutionX} onChange={(e) => setResolutionX(parseInt(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>Képfelbontás Y</label>
          <input type="number" value={resolutionY} onChange={(e) => setResolutionY(parseInt(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>RAM (GB)</label>
          <input type="number" value={ram} onChange={(e) => setRam(parseInt(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>Ár</label>
          <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} required />
        </div>

        <button type="submit" className="submit-btn">Tablet Hozzáadása</button>
      </form>
    </div>
  );
}
