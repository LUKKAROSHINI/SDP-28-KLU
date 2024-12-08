import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadedBooks = () => {
  const [books, setBooks] = useState([]);

  // Fetch uploaded books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDownload = async (bookId, title) => {
    try {
      // Sending a request to the backend to download the book PDF by its ID
      const response = await axios.get(`/api/books/download/${bookId}`, { responseType: "blob" });

      // Create a URL for the Blob data and create an anchor tag to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`); // Set the filename for the downloaded book
      document.body.appendChild(link);
      link.click(); // Trigger the download
      link.remove(); // Clean up by removing the link
    } catch (error) {
      console.error("Error downloading book:", error);
      alert("Error downloading book");
    }
  };

  // Function to handle successful upload
  const handleUploadSuccess = (bookDetails, bookId) => {
    // After a successful upload, add the book to the list of uploaded books
    setBooks([...books, { ...bookDetails, id: bookId }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Uploaded Books</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Author</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Genre</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No books uploaded yet.
              </td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{book.title}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{book.author}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{book.genre}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{book.description}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => handleDownload(book.id, book.title)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UploadedBooks;
