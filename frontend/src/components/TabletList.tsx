import { useEffect, useState } from 'react';
import './TabletList.css';

interface Tablet {
  id: number;
  name: string;
  os: string;
  cpu_speed: number;
  cores: number;
  display_size: number;
  resolution_x: number;
  resolution_y: number;
  ram: number;
  price: number;
}

export default function TabletList() {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const response = await fetch('http://localhost:3000/tablets');
        if (!response.ok) {
          throw new Error('Hiba történt az adatok betöltése során!');
        }
        const data = await response.json();
        setTablets(data);
        setLoading(false);
      } catch (error) {
        setError('Hiba történt az adatok betöltése során!');
        setLoading(false);
      }
    };

    fetchTablets();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="tablet-list">
      <h2>Tabletek Listázása</h2>

      <div className="links">
        <a href="/kezdolap" className="btn">Kezdőlap</a>
        <a href="/tabletfelvetel" className="btn">Új tablet felvétele</a>
        <a href="/tablettorles" className="btn">Tabletek törlése</a>
        <a href="/tabletkereses" className="btn">Tablet keresés</a>
        <a href="/tabletlapozas" className="btn">Tablet lapozás</a>
      </div>

      <ul>
        {tablets.map((tablet) => (
          <li key={tablet.id}>
            <div className="tablet-info">
              <h3>{tablet.name}</h3>
              <p><strong>Operációs rendszer:</strong> {tablet.os}</p>
              <p><strong>CPU Sebesség:</strong> {tablet.cpu_speed} GHz</p>
              <p><strong>RAM:</strong> {tablet.ram} GB</p>
              <p><strong>Ár:</strong> {tablet.price} Ft</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
