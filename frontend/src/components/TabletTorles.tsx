import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

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

export default function TabletTorles() {
    const [tablets, settablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");

    const handleDeleteTablet = async (tabletid: number) => {
        const answer = confirm('Biztosan törölni akarod-e a készletből a tablett?!');
        if (answer) {
            try{
                const response = await fetch('http://localhost:3000/tablets/' + tabletid,{
                    method: 'DELETE'
                })
                if(!response.ok){
                    // ...
                }
                settablets(tablets.filter( (tablet)=> tablet.id !== tabletid )); 
            } catch (err) {
                alert("Hiba: " + err)
            }            
        }
    }

    useEffect(() => {
        fetch('http://localhost:3000/tablets')
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer('Resource not found (404)');
                }
                if (!response.ok) {
                    setErrorServer('Server responded with status' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                settablets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (errorServer) {
        return <p>Hiba történt a szerver oldalon, keresd a rendszergazdát!</p>
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="tablet-torles">
            <h2>Tabletek törlése</h2>
            <div className="links">
        <a href="/kezdolap" className="btn">Kezdőlap</a>
        <a href="/tabletek" className="btn">Készleten lévő tabletek</a>
        <a href="/tabletfelvetel" className="btn">Új tablet felvétele</a>
        <a href="/tabletkereses" className="btn">Tablet keresés</a>
        <a href="/tabletlapozas" className="btn">Tablet lapozás</a>
      </div>

            <ul className="tablet-list">
                {tablets.map((tablet) => (
                    <li key={tablet.id} className="tablet-item">
                        <p><strong>{tablet.name}</strong> - <em>{tablet.os}</em></p>
                        <p><strong>CPU Sebesség:</strong> {tablet.cpu_speed} GHz</p>
                        <p><strong>CPU Magok:</strong> {tablet.cores}</p>
                        <p><strong>Képernyő Méret:</strong> {tablet.display_size} inches</p>
                        <p><strong>Képernyő Felbontás:</strong> {tablet.resolution_x} x {tablet.resolution_y}</p>
                        <p><strong>RAM:</strong> {tablet.ram} GB</p>
                        <p><strong>Ár:</strong> {tablet.price} Ft</p>
                        <button className="delete-btn" onClick={() => handleDeleteTablet(tablet.id)}>Törlés</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
