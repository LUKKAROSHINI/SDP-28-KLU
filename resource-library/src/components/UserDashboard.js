import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);  // State for storing books
  const downloadLinks = useRef([]); // Ref to store download links for setting attributes

  // Function to fetch all books from the backend
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/books`);  // Change to get all books
      setBooks(res.data);  // Store the books in state
    } catch (err) {
      console.error(err);
    }
  };

  // Effect hook to set the download attribute for each link dynamically
  useEffect(() => {
    downloadLinks.current.forEach((link, index) => {
      const book = books[index];
      if (link && book) {
        // Set the download attribute to the book's title
        link.setAttribute("download", `${book.title}.pdf`);
      }
    });
  }, [books]); // Runs when books data changes

  // Function to handle the download process
  const handleDownload = async (bookId, bookTitle) => {
    try {
      // Sending a request to the backend to download the book PDF
      const response = await axios.get(`/api/books/download/${bookId}`, {
        responseType: 'blob', // Receive the file as a Blob
      });

      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      const blob = new Blob([response.data], { type: 'application/pdf' });
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${bookTitle}.pdf`);

      // Programmatically click the link to trigger the download
      link.click();
    } catch (err) {
      console.error('Error downloading the book:', err);
    }
  };

  return (
    <div className="dashboard-container user-dashboard">
      <h2>User Dashboard</h2>
      <div>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="resource-list">
        {/* Loop through the books and display each */}
        {books.map((book) => (
          <div key={book.id} className="resource-card">
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            {/* Add a link to download the book PDF */}
            <button onClick={() => handleDownload(book.id, book.title)}>
              Download PDF
            </button>
            <a href={`/feedback/${book.id}`}>Leave Feedback</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
