import { useState, useEffect } from 'react';
import './TabletSort.css';
 
interface Tablet {
    id: number;
    name: string;
    price: number;
    os: string;
}
 
const TabletKereses = () => {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [filteredTablets, setFilteredTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Tablet; direction: 'asc' | 'desc' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
 
    useEffect(() => {
        fetch('http://localhost:3000/tablets')
            .then((response) => {
                if (response.status === 404) {
                    throw new Error('Resource not found (404)');
                }
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data);
                setFilteredTablets(data); // Default: show all data
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
 
    const sortTablets = (key: keyof Tablet, direction: 'asc' | 'desc') => {
        const sortedTablets = [...filteredTablets].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredTablets(sortedTablets);
        setSortConfig({ key, direction });
    };
 
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = tablets.filter(
            (tablet) =>
                tablet.name.toLowerCase().includes(term) ||
                tablet.price.toString().includes(term) ||
                tablet.os.toLowerCase().includes(term)
        );
        setFilteredTablets(filtered);
    };
 
    if (loading) {
        return <p>Loading...</p>;
    }
 
    if (error) {
        return <p>Error: {error}</p>;
    }
 
    return (
        <div>
            <h1>Tabletek</h1>
           
      <div className="links">
      <a href="/tabletek" className="btn">Készleten lévő tabletek</a>
        <a href="/tabletfelvetel" className="btn">Új tablet felvétele</a>
        <a href="/tablettorles" className="btn">Tablet törlés</a>
        <a href="/tabletkereses" className="btn">Tablet keresés</a>
      </div>
            <form>
                <label>
                    Keresés:
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Név, ár vagy operációs rendszer alapján..."
                    />
                </label>
            </form>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>
                            Név
                            <button
                                onClick={() => sortTablets('name', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('name', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button>
                        </th>
                        <th>
                            Operációs rendszer
                            <button
                                onClick={() => sortTablets('os', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('os', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button>
                        </th>
                        <th>
                            Ár
                            <button
                                onClick={() => sortTablets('price', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTablets('price', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTablets.map((tablet) => (
                        <tr key={tablet.id}>
                            <td>{tablet.name}</td>
                            <td>{tablet.os}</td>
                            <td>{tablet.price} Ft</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Név</th>
                        <th>Operációs rendszer</th>
                        <th>Ár</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
 
export default TabletKereses;