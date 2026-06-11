"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingPage from "../loading";
import AddBook from "./AddBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Fetch all books — reused as the "refresh" function
  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  // Load books on first render
  useEffect(() => {
    fetchBooks();
  }, []);

  // Search form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/books/search?query=${query}`);
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  // Delete a book by id
  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });
    fetchBooks();
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Books</h1>

      {/* Search */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search Books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        {query && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setQuery("");
              fetchBooks();
            }}
          >
            Clear
          </button>
        )}
      </form>

      {/* Add Book */}
      <AddBook refreshBooks={fetchBooks} />

      {/* Book Cards */}
      <div className="flex flex-wrap gap-6">
        {books.length === 0 && (
          <p className="text-base-content opacity-60">No books found.</p>
        )}
        {books.map((book) => (
          <div key={book.id}>
            <div className="card w-64 bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <img
                  src={book.img}
                  alt={book.title}
                  width="200"
                  height="150"
                  className="rounded-xl object-cover h-40 w-full"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200x150?text=No+Image";
                  }}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-sm">{book.title}</h2>
                <div className="card-actions justify-end mt-2">
                  <Link
                    href={book.link}
                    target="_blank"
                    className="btn btn-primary btn-sm"
                  >
                    See in Amazon
                  </Link>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
