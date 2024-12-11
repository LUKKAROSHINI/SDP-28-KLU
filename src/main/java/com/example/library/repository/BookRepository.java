package com.example.library.repository;

import com.example.library.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    /**
     * Find all books by genre.
     *
     * @param genre the genre of the books.
     * @return a list of books in the specified genre.
     */
    List<Book> findByGenre(String genre);

    /**
     * Find all books by a specific author.
     *
     * @param author the name of the author.
     * @return a list of books written by the specified author.
     */
    List<Book> findByAuthor(String author);

    /**
     * Find all books with titles containing a specific keyword (case-insensitive).
     *
     * @param keyword the keyword to search in the title.
     * @return a list of books with titles containing the keyword.
     */
    List<Book> findByTitleContainingIgnoreCase(String keyword);

    /**
     * Find books by genre and author.
     *
     * @param genre the genre of the books.
     * @param author the author of the books.
     * @return a list of books matching the specified genre and author.
     */
    List<Book> findByGenreAndAuthor(String genre, String author);
}
