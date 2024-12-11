package com.example.library.service;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public BookService(BookRepository bookRepository, ObjectMapper objectMapper) {
        this.bookRepository = bookRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * Process a book entity by mapping the provided JSON and storing the file content.
     *
     * @param bookJson the JSON string representing the book data.
     * @param file the MultipartFile containing the book content (e.g., PDF).
     * @return the saved Book entity.
     * @throws IOException if there's an error reading the file or parsing the JSON.
     */
    public Book processBook(String bookJson, MultipartFile file) throws IOException {
        Book book = objectMapper.readValue(bookJson, Book.class);
        book.setContent(file.getBytes()); // Save the file content as a byte array
        return bookRepository.save(book);
    }

    /**
     * Fetch a book by its ID.
     *
     * @param id the ID of the book.
     * @return an Optional containing the Book if found, or empty if not.
     */
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    /**
     * Count the total number of books in the repository.
     *
     * @return the count of books.
     */
    public long countBooks() {
        return bookRepository.count();
    }

    /**
     * Retrieve all books from the repository.
     *
     * @return a list of all books.
     */
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    /**
     * Retrieve books by genre.
     *
     * @param genre the genre to filter books by.
     * @return a list of books that match the genre.
     */
    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
    }

    /**
     * Save or update a book entity.
     *
     * @param book the Book entity to save or update.
     * @return the saved Book entity.
     */
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    /**
     * Delete a book by its ID.
     *
     * @param id the ID of the book to delete.
     */
    public void deleteBookById(Long id) {
        bookRepository.deleteById(id);
    }

	public List<Book> searchBooksByTitle(String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Book> getBooksByAuthor(String author) {
		// TODO Auto-generated method stub
		return null;
	}
}
