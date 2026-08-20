import React, { useState, useEffect } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load saved books from LocalStorage when the page first loads
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('sakecAtlas_saved')) || [];
    setSavedBooks(localData);
  }, []);

  // API Fetching Logic
  const searchAPI = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setBooks([]);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`);
      if (!response.ok) throw new Error('Network error');
      
      const data = await response.json();
      if (data.docs.length === 0) {
        setError('No resources found. Try another query.');
      } else {
        setBooks(data.docs);
      }
    } catch (err) {
      setError('Failed to fetch data from the academic database.');
    } finally {
      setLoading(false);
    }
  };

  // LocalStorage Save Logic (Now includes the Cover ID)
  const saveResource = (book) => {
    const title = book.title || 'Unknown Title';
    const author = book.author_name ? book.author_name[0] : 'Multiple Authors';
    const coverId = book.cover_i; // Grab the image ID
    
    // Prevent duplicates
    if (!savedBooks.some(b => b.title === title)) {
      const newSaved = [...savedBooks, { title, author, coverId }];
      setSavedBooks(newSaved);
      localStorage.setItem('sakecAtlas_saved', JSON.stringify(newSaved));
    } else {
      alert('This resource is already saved in your Atlas.');
    }
  };

  const clearMemory = () => {
    localStorage.removeItem('sakecAtlas_saved');
    setSavedBooks([]);
  };

  return (
    <div className="py-4">
      {/* Search Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-4">SAKEC Resource Hub</h2>
          <form className="d-flex gap-3" onSubmit={searchAPI}>
            <input 
              type="text" 
              className="form-control form-control-lg border border-3 border-dark rounded-0 shadow-sm" 
              placeholder="Search engineering textbooks (e.g., MATLAB, Physics)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-custom btn-lg px-4">Search</button>
          </form>
        </div>
      </div>

      {loading && <h4 className="text-center fw-bold mt-4">Fetching from database...</h4>}
      {error && <h4 className="text-center text-danger fw-bold mt-4">{error}</h4>}

      {/* Upgraded API Results Grid */}
      <div className="row mb-5">
        {books.map((book, index) => {
          // Dynamic Image Fetching Logic
          const coverUrl = book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : `https://placehold.co/200x300/e9ecef/212529?text=No+Cover`;
            
          const publishYear = book.first_publish_year || 'Unknown';

          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 p-3 flex-column">
                <span className="badge bg-dark w-50 mb-3 rounded-0 py-2">Textbook</span>
                
                {/* New Book Cover UI */}
                <div className="text-center mb-3 border border-2 border-dark d-flex align-items-center justify-content-center bg-light" style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={coverUrl} alt={book.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>

                <h5 className="fw-bold mb-2">{book.title}</h5>
                
                {/* Expanded Details */}
                <div className="mb-4 small">
                  <p className="mb-1 text-muted"><strong>Author:</strong> {book.author_name ? book.author_name[0] : 'Unknown'}</p>
                  <p className="mb-0 text-muted"><strong>First Published:</strong> {publishYear}</p>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => saveResource(book)} 
                    className="btn btn-outline-dark w-100 rounded-0 fw-bold border-2"
                  >
                    Save Resource
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgraded Saved Resources Dashboard (With Thumbnails) */}
      {savedBooks.length > 0 && (
        <div className="mt-5 pt-4 border-top border-dark border-3 border-dashed">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold m-0">Your Saved Resources</h3>
            <button onClick={clearMemory} className="btn btn-outline-danger rounded-0 fw-bold border-2">
              Clear Memory
            </button>
          </div>
          <div className="row">
            {savedBooks.map((book, index) => {
               // Load thumbnail for saved books
               const savedCoverUrl = book.coverId 
               ? `https://covers.openlibrary.org/b/id/${book.coverId}-S.jpg`
               : `https://placehold.co/50x75/e9ecef/212529?text=X`;

              return (
              <div className="col-md-4 col-lg-3 mb-3" key={index}>
                <div className="card h-100 p-2 bg-light d-flex flex-row align-items-center gap-3 border-2 border-dark">
                  <img src={savedCoverUrl} alt={book.title} style={{ width: '45px', height: '65px', objectFit: 'cover' }} className="border border-dark shadow-sm" />
                  <div>
                    <h6 className="fw-bold mb-1 small text-truncate" style={{ maxWidth: '150px' }}>{book.title}</h6>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>{book.author}</p>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      )}
    </div>
  );
}