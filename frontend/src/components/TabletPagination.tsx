import { useState, useEffect } from 'react';
 
interface Tablet {
    id: number;
    brand: string;
    price: number;
}
 
const Tabletlapozas = () => {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
 
    const fetchTablets = (page: number) => {
        setLoading(true);
        setError(null);
 
        fetch(`http://localhost:3000/tablets?page=${page}&limit=5`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };
 
    useEffect(() => {
        fetchTablets(currentPage);
    }, [currentPage]);
 
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
 
    if (loading) {
        return <p>Loading...</p>;
    }
 
    if (error) {
        return <p>Error: {error}</p>;
    }
 
    return (
        <div className="tabletpagi">
            <h1>Tabletek</h1>
            <div className="links">
                <a href="/kezdolap" className="btn">Kezdőlap</a>
                <a href="/tabletek" className="btn">Készleten lévő tabletek</a>
                <a href="/tablettorles" className="btn">Tabletek törlése</a>
                <a href="/tabletkereses" className="btn">Tablet keresése</a>
            </div>
            <ul>
                {tablets.map((tablet) => (
                    <li key={tablet.id}>
                        {tablet.brand} - {tablet.price} Ft
                    </li>
                ))}
            </ul>
 
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Előző
                </button>
                <span>
                    Oldal {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Következő
                </button>
            </div>
        </div>
    );
};
 
export default Tabletlapozas;