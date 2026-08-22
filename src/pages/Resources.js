import React, { useState, useEffect } from 'react';

export default function Resources() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // New States for Sorting and Modal
  const [sortOption, setSortOption] = useState('relevance');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('sakecAtlas_saved')) || [];
    setSavedBooks(localData);
  }, []);

  const searchAPI = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setBooks([]);

    try {
      // Increased limit to 12 to make sorting more impactful
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`);
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

  const saveResource = (book) => {
    const title = book.title || 'Unknown Title';
    const author = book.author_name ? book.author_name[0] : 'Multiple Authors';
    const coverId = book.cover_i; 
    
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

  // Dynamic Sorting Logic
  const getSortedBooks = () => {
    const booksCopy = [...books];
    switch (sortOption) {
      case 'year-new':
        return booksCopy.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
      case 'year-old':
        return booksCopy.sort((a, b) => (a.first_publish_year || 9999) - (b.first_publish_year || 9999));
      case 'title-asc':
        return booksCopy.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      default:
        return booksCopy; // relevance
    }
  };

  return (
    <div className="py-4 position-relative">
      
      {/* Search & Sort Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-9">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-4">SAKEC Resource Hub</h2>
          <form className="d-flex flex-column flex-md-row gap-3" onSubmit={searchAPI}>
            <input 
              type="text" 
              className="form-control form-control-lg border border-2 border-dark rounded-0 shadow-sm" 
              placeholder="Search engineering textbooks (e.g., MATLAB, Physics)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select 
              className="form-select form-select-lg border border-2 border-dark rounded-0 shadow-sm" 
              style={{ maxWidth: '200px' }}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="year-new">Newest First</option>
              <option value="year-old">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
            </select>
            <button type="submit" className="btn btn-dark btn-lg px-4 rounded-0 fw-bold">Search</button>
          </form>
        </div>
      </div>

      {loading && <h4 className="text-center fw-bold mt-4">Querying Database...</h4>}
      {error && <h4 className="text-center text-danger fw-bold mt-4">{error}</h4>}

      {/* Results Grid */}
      <div className="row mb-5 g-4">
        {getSortedBooks().map((book, index) => {
          const coverUrl = book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : `https://placehold.co/200x300/e9ecef/212529?text=No+Cover`;
          const publishYear = book.first_publish_year || 'Unknown';

          return (
            <div className="col-md-4 col-lg-3" key={index}>
              <div className="card h-100 p-3 flex-column border-2 border-dark rounded-0 bg-white shadow-sm">
                <div className="text-center mb-3 border border-dark d-flex align-items-center justify-content-center bg-light" style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={coverUrl} alt={book.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <h6 className="fw-bold mb-2 text-truncate" title={book.title}>{book.title}</h6>
                <div className="mb-3 small">
                  <p className="mb-1 text-muted text-truncate"><strong>Author:</strong> {book.author_name ? book.author_name[0] : 'Unknown'}</p>
                  <p className="mb-0 text-muted"><strong>Published:</strong> {publishYear}</p>
                </div>
                <div className="mt-auto d-flex flex-column gap-2">
                  <button 
                    onClick={() => setSelectedBook(book)} 
                    className="btn btn-dark w-100 rounded-0 fw-bold small"
                  >
                    View Content
                  </button>
                  <button 
                    onClick={() => saveResource(book)} 
                    className="btn btn-outline-dark w-100 rounded-0 fw-bold small border-2"
                  >
                    Save Resource
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgraded Saved Resources Dashboard */}
      {savedBooks.length > 0 && (
        <div className="mt-5 pt-4 border-top border-dark border-3 border-dashed">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold m-0">Your Saved Resources</h3>
            <button onClick={clearMemory} className="btn btn-outline-danger rounded-0 fw-bold border-2">
              Clear Memory
            </button>
          </div>
          <div className="row g-3">
            {savedBooks.map((book, index) => {
               const savedCoverUrl = book.coverId 
               ? `https://covers.openlibrary.org/b/id/${book.coverId}-S.jpg`
               : `https://placehold.co/50x75/e9ecef/212529?text=X`;

              return (
              <div className="col-md-4 col-lg-3" key={index}>
                <div className="card h-100 p-2 bg-light d-flex flex-row align-items-center gap-3 border-2 border-dark rounded-0">
                  <img src={savedCoverUrl} alt={book.title} style={{ width: '45px', height: '65px', objectFit: 'cover' }} className="border border-dark" />
                  <div className="overflow-hidden">
                    <h6 className="fw-bold mb-1 small text-truncate">{book.title}</h6>
                    <p className="mb-0 text-muted text-truncate" style={{ fontSize: '0.75rem' }}>{book.author}</p>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      )}

      {/* Modal Portal for Book Content */}
      {selectedBook && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050, backdropFilter: 'blur(5px)' }}>
          <div className="card p-0 border-3 border-dark rounded-0 shadow-lg" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="card-header bg-dark text-white rounded-0 border-0 d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold text-truncate pe-3">{selectedBook.title}</h5>
              <button onClick={() => setSelectedBook(null)} className="btn-close btn-close-white" aria-label="Close"></button>
            </div>
            <div className="card-body p-4 bg-white">
              <div className="row">
                <div className="col-md-4 mb-3 mb-md-0 text-center">
                  <img 
                    src={selectedBook.cover_i ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg` : `https://placehold.co/200x300/e9ecef/212529?text=No+Cover`} 
                    alt={selectedBook.title} 
                    className="img-fluid border border-2 border-dark"
                  />
                </div>
                <div className="col-md-8">
                  <p className="mb-2"><strong>Author(s):</strong> {selectedBook.author_name ? selectedBook.author_name.join(', ') : 'Unknown'}</p>
                  <p className="mb-2"><strong>First Published:</strong> {selectedBook.first_publish_year || 'Unknown'}</p>
                  <p className="mb-2"><strong>Editions Available:</strong> {selectedBook.edition_count || 0}</p>
                  <div className="mb-4">
                    <strong>Topics/Subjects:</strong>
                    <div className="d-flex flex-wrap gap-1 mt-2">
                      {selectedBook.subject ? selectedBook.subject.slice(0, 6).map((sub, i) => (
                        <span key={i} className="badge bg-light text-dark border border-dark rounded-0">{sub}</span>
                      )) : <span className="text-muted small">No specific subjects listed.</span>}
                    </div>
                  </div>
                  
                  {/* Direct Link to Read the Book */}
                  <a 
                    href={`https://openlibrary.org${selectedBook.key}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-dark w-100 rounded-0 fw-bold border-2 py-2"
                  >
                    Read on Open Library ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}