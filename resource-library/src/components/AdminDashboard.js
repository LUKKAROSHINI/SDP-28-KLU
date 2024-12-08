import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a valid PDF file.");
      return;
    }

    const bookDetails = {
      title,
      author,
      genre,
      description,
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("book", JSON.stringify(bookDetails));

    try {
      const response = await axios.post("/api/books/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data || "Book uploaded successfully!");
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading book:", error);
      alert("Failed to upload the book. Please try again.");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Styles
  const inputStyle = {
    width: "92%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#232f3e",
    color: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 3,
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
  };

  const searchBarStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    marginRight: "20px",
  };

  const searchInputStyle = {
    width: "90%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const navItemsStyle = {
    display: "flex",
    alignItems: "center",
  };

  const navItemStyle = {
    color: "#ffffff",
    textDecoration: "none",
    padding: "0 10px",
  };

  const offCanvasMenuStyle = {
    position: "fixed",
    top: 0,
    left: isMenuOpen ? 0 : "-250px",
    width: "250px",
    height: "100%",
    backgroundColor: "#232F3E",
    color: "#fff",
    transition: "left 0.3s ease",
    padding: "10px",
    zIndex: 2,
  };

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: isMenuOpen ? "block" : "none",
    zIndex: 1,
  };

  const dashboardStyle = {
    marginTop: "80px", // To offset the fixed header
    padding: "20px",
  };

  return (
    <>
      {/* Sidebar and Backdrop */}
      <div style={backdropStyle} onClick={toggleMenu}></div>
      <div style={offCanvasMenuStyle}>
        <Link to="/" style={navItemStyle}>
          Home
        </Link>
        <Link to="/" style={navItemStyle}>
          Upload
        </Link>
        <Link to="/" style={navItemStyle}>
          Settings
        </Link>
      </div>

      {/* Header Section */}
      <header style={headerStyle}>
        <div style={logoStyle}>
          <button
            onClick={toggleMenu}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              marginRight: "10px",
            }}
          >
            &#9776; {/* Hamburger icon */}
          </button>
          <h2 style={{ margin: 0 }}>Library Admin</h2>
        </div>

        <div style={searchBarStyle}>
          <input type="text" placeholder="Search" style={searchInputStyle} />
          <nav style={navItemsStyle}>
            <Link to="/" style={navItemStyle}>
              Competitive
            </Link>
            <Link to="/" style={navItemStyle}>
              Higher Studies
            </Link>
            <Link to="/" style={navItemStyle}>
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Dashboard Form Section */}
      <div className="dashboard-container admin-dashboard" style={{ marginTop: '100px' }}>
        
      <div style={dashboardStyle}>
        <h2>Upload a New Book</h2>
        <form onSubmit={handleFileUpload}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={inputStyle}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ ...inputStyle, height: "100px", resize: "vertical" }}
          ></textarea>
          <input type="file" onChange={handleFileChange} style={inputStyle} />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Book
          </button>
        </form>
        </div>
        <Link
          to="/uploaded-books"
          style={{ marginTop: "20px", display: "block", color: "#007bff" }}
        >
          View Uploaded Books
        </Link>
      </div>

    </>
  );
};

export default AdminDashboard;
