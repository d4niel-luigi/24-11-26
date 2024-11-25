import { useEffect, useState } from 'react';
import './Kezdolap.css';

interface Tablet {
  id: number;
  name: string;
  price: number;
}

export default function Kezdolap() {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        alert('Hiba történt az adatok betöltése során!');
      }
    };

    fetchTablets();
  }, []);

  if (loading) {
    return <div className="loading">Betöltés...</div>;
  }

  const sortedTablets = [...tablets].sort((a, b) => b.price - a.price);
  const top3Expensive = sortedTablets.slice(0, 3);

  const sortedTabletsCheap = [...tablets].sort((a, b) => a.price - b.price);
  const top3Cheap = sortedTabletsCheap.slice(0, 3);

  return (
    <div className="kezdolap">
      <h2>Üdvözöljük a Tablet Áruházban</h2>

      <div className="links">
      <a href="/tabletek" className="btn">Készleten lévő tabletek</a>
        <a href="/tabletfelvetel" className="btn">Új tablet felvétele</a>
        <a href="/tablettorles" className="btn">Tablet törlés</a>
        <a href="/tabletkereses" className="btn">Tablet keresés</a>
        <a href="/tabletlapozas" className="btn">Tablet lapozás</a>
      </div>

      <div className="tablet-container">
        <div className="top-tablets">
          <h3>Legdrágább 3 Tablet</h3>
          <ul>
            {top3Expensive.map((tablet) => (
              <li key={tablet.id}>
                <p>{tablet.name} - {tablet.price} Ft</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="top-tablets">
          <h3>Legolcsóbb 3 Tablet</h3>
          <ul>
            {top3Cheap.map((tablet) => (
              <li key={tablet.id}>
                <p>{tablet.name} - {tablet.price} Ft</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
