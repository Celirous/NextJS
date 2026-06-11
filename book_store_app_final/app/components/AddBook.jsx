"use client";
import { useState } from "react";

const AddBook = ({ refreshBooks }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookLink, setNewBookLink] = useState("");
  const [newBookImage, setNewBookImage] = useState("");

  const handleSubmitNewBook = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/books/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: newBookTitle,
        link: newBookLink || "https://www.amazon.com",
        img:
          newBookImage || "https://via.placeholder.com/200x150?text=Book+Cover",
      }),
    });

    if (res.ok) {
      setNewBookTitle("");
      setNewBookLink("");
      setNewBookImage("");
      setModalOpen(false);
      refreshBooks();
    }
  };

  return (
    <div className="mb-6">
      <button className="btn btn-success" onClick={() => setModalOpen(true)}>
        + Add Book
      </button>

      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmitNewBook}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg mb-4">Add New Book</h3>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              placeholder="Book Title *"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              value={newBookLink}
              onChange={(e) => setNewBookLink(e.target.value)}
              placeholder="Amazon Link (optional)"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={newBookImage}
              onChange={(e) => setNewBookImage(e.target.value)}
              placeholder="Image URL (optional)"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary mt-2">
              Add Book
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddBook;
