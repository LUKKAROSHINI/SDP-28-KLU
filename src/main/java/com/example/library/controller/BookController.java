package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    /**
     * Upload a book along with its content.
     *
     * @param file     the book content (PDF).
     * @param bookJson the JSON string containing book details.
     * @return a response indicating the success or failure of the upload.
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadBook(@RequestParam("file") MultipartFile file, @RequestParam("book") String bookJson) {
        try {
            Book book = bookService.processBook(bookJson, file);
            return ResponseEntity.ok("Book uploaded successfully! ID: " + book.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading book: " + e.getMessage());
        }
    }

    /**
     * Retrieve a book by its ID.
     *
     * @param id the ID of the book.
     * @return the book details or a 404 status if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null));
    }

    /**
     * Download a book's content by ID.
     *
     * @param id the ID of the book.
     * @return the book content as a PDF file.
     */
    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> downloadBook(@PathVariable Long id) {
        try {
            Book book = bookService.getBookById(id)
                    .orElseThrow(() -> new RuntimeException("Book not found"));

            ByteArrayResource resource = new ByteArrayResource(book.getContent());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + book.getTitle() + ".pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(book.getContent().length)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    /**
     * Retrieve all books in the library.
     *
     * @return a list of all books.
     */
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    /**
     * Retrieve books by genre.
     *
     * @param genre the genre to filter books by.
     * @return a list of books in the specified genre.
     */
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Book>> getBooksByGenre(@PathVariable String genre) {
        List<Book> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }

    /**
     * Retrieve books by author.
     *
     * @param author the author to filter books by.
     * @return a list of books by the specified author.
     */
    @GetMapping("/author/{author}")
    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable String author) {
        List<Book> books = bookService.getBooksByAuthor(author);
        return ResponseEntity.ok(books);
    }

    /**
     * Search books by a keyword in the title.
     *
     * @param keyword the keyword to search for in book titles.
     * @return a list of books containing the keyword in their title.
     */
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooksByTitle(@RequestParam String keyword) {
        List<Book> books = bookService.searchBooksByTitle(keyword);
        return ResponseEntity.ok(books);
    }

    /**
     * Delete a book by its ID.
     *
     * @param id the ID of the book to delete.
     * @return a response indicating the success or failure of the operation.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteBookById(id);
            return ResponseEntity.ok("Book deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error deleting book: " + e.getMessage());
        }
    }
}
