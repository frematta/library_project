import { useEffect, useState } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "../api/books";

export default function LibrarianDashboard() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState("");
  const jwt = localStorage.getItem("jwt");

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    total_copies: 1
  });

  const [editId, setEditId] = useState(null);

  async function load() {
    const data = await getBooks(jwt, q);
    setBooks(data);
    console.log(data);
  }

  useEffect(() => {
    load();
  }, [q]);

  function handleFormChange(e) {
    setForm({...form, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setForm({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      total_copies: 1
    });
    setEditId(null);
  }

  async function handleCreate(e) {
    e.preventDefault();
    await createBook(jwt, form);
    resetForm();
    load();
  }

  async function handleEdit(e) {
    e.preventDefault();
    await updateBook(jwt, editId, form);
    resetForm();
    load();
  }

  async function startEdit(book) {
    setEditId(book.id);
    setForm(book);
  }

  async function handleDelete(id) {
    if (confirm("Delete this book?")) {
      await deleteBook(jwt, id);
      load();
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Librarian Dashboard</h2>

      {/* Search */}
      <input
        placeholder="Search by title, author, genre..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* Form */}
      <h3>{editId ? "Edit Book" : "Add New Book"}</h3>

      <form onSubmit={editId ? handleEdit : handleCreate}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleFormChange}
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleFormChange}
        />

        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleFormChange}
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleFormChange}
        />

        <input
          name="total_copies"
          type="number"
          placeholder="Total Copies"
          value={form.total_copies}
          onChange={handleFormChange}
        />

        <button type="submit">
          {editId ? "Update Book" : "Add Book"}
        </button>

        {editId && (
          <button onClick={resetForm} type="button">
            Cancel
          </button>
        )}
      </form>

      {/* LIST */}
      <h3>Books</h3>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((b) => (
            <li key={b.id}>
              {b.title} — {b.author} ({b.genre})  
              <button onClick={() => startEdit(b)}>Edit</button>
              <button onClick={() => handleDelete(b.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}