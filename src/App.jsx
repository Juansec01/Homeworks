// App.jsx
import React, { useEffect, useRef, useState } from "react";
import Stack from "./Stack";
import "./App.css";

export default function App() {
  // Referencia a la instancia de Stack (permanece estable entre renders)
  const stackRef = useRef(null);

  // Estado: lista visible (obtenida desde stackRef.current.getItems())
  const [books, setBooks] = useState([]);

  // Formulario controlado
  const [form, setForm] = useState({
    name: "",
    isbn: "",
    author: "",
    editorial: "",
  });

  // Inicializar la pila una vez con muchos libros
  useEffect(() => {
    stackRef.current = new Stack();

    const initialBooks = [
      { name: "Cien años de soledad", isbn: "9788437604947", author: "Gabriel García Márquez", editorial: "Sudamericana" },
      { name: "Don Quijote de la Mancha", isbn: "9788491050343", author: "Miguel de Cervantes", editorial: "Francisco de Robles" },
      { name: "El Principito", isbn: "9780156013965", author: "Antoine de Saint-Exupéry", editorial: "Reynal & Hitchcock" },
      { name: "Rayuela", isbn: "9788466329847", author: "Julio Cortázar", editorial: "Buenos Aires" },
      { name: "La sombra del viento", isbn: "9780307743657", author: "Carlos Ruiz Zafón", editorial: "Planeta" },
      { name: "1984", isbn: "9780451524935", author: "George Orwell", editorial: "Secker & Warburg" },
      { name: "Crónica de una muerte anunciada", isbn: "9780307389732", author: "Gabriel García Márquez", editorial: "Editorial Oveja Negra" },
      { name: "Fahrenheit 451", isbn: "9781451673319", author: "Ray Bradbury", editorial: "Ballantine Books" },
      { name: "Orgullo y prejuicio", isbn: "9780141439518", author: "Jane Austen", editorial: "T. Egerton" },
      { name: "Ensayo sobre la ceguera", isbn: "9781841954249", author: "José Saramago", editorial: "Caminho" },
      { name: "Los juegos del hambre", isbn: "9780439023481", author: "Suzanne Collins", editorial: "Scholastic Press" },
      { name: "It", isbn: "9781501142970", author: "Stephen King", editorial: "Viking" },
      { name: "El nombre de la rosa", isbn: "9780140444308", author: "Umberto Eco", editorial: "Bompiani" },
      { name: "El amor en los tiempos del cólera", isbn: "9780307389733", author: "Gabriel García Márquez", editorial: "Editorial Oveja Negra" },
      { name: "Matar a un ruiseñor", isbn: "9780061120084", author: "Harper Lee", editorial: "J.B. Lippincott & Co." },
      { name: "La metamorfosis", isbn: "9788491050374", author: "Franz Kafka", editorial: "Reclam" },
      { name: "Sapiens: De animales a dioses", isbn: "9780062316097", author: "Yuval Noah Harari", editorial: "Harper" }
    ];

    initialBooks.forEach(b => stackRef.current.push(b));
    setBooks(stackRef.current.getItems());
  }, []);

  // Manejo inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Añadir libro (push)
  const handleAdd = (e) => {
    e.preventDefault();
    const { name, isbn, author, editorial } = form;
    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) {
      alert("Completa todos los campos del libro.");
      return;
    }
    stackRef.current.push({ name: name.trim(), isbn: isbn.trim(), author: author.trim(), editorial: editorial.trim() });
    setBooks(stackRef.current.getItems());
    setForm({ name: "", isbn: "", author: "", editorial: "" });
  };

  // Quitar top (pop)
  const handlePop = () => {
    const popped = stackRef.current.pop();
    if (!popped) {
      alert("La pila está vacía.");
    }
    setBooks(stackRef.current.getItems());
  };

  // Ver top (peek)
  const handlePeek = () => {
    const top = stackRef.current.peek();
    if (!top) {
      alert("La pila está vacía.");
      return;
    }
    alert(`Top:\n${top.name}\nAutor: ${top.author}\nISBN: ${top.isbn}\nEditorial: ${top.editorial}`);
  };

  // Vaciar pila
  const handleClear = () => {
    if (!window.confirm("¿Seguro que quieres vaciar toda la pila?")) return;
    stackRef.current.clear();
    setBooks(stackRef.current.getItems());
  };

  return (
    <div className="app">
      <h1> Pila de Libros (Stack)</h1>

      <form className="form" onSubmit={handleAdd}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre del libro" />
        <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Autor" />
        <input name="editorial" value={form.editorial} onChange={handleChange} placeholder="Editorial" />
        <div className="row">
          <button type="submit" className="btn add">➕ Añadir</button>
          <button type="button" onClick={handlePop} className="btn pop">⬆️ Quitar (pop)</button>
          <button type="button" onClick={handlePeek} className="btn peek">🔍 Ver último (peek)</button>
          <button type="button" onClick={handleClear} className="btn clear">🗑️ Vaciar</button>
        </div>
      </form>

      <div className="stack-area">
        <h2>Contenido de la pila ({books.length})</h2>

        {books.length === 0 ? (
          <p className="empty">La pila está vacía.</p>
        ) : (
          <div className="stack-visual">
            {/* books[0] es el tope */}
            {books.map((b, i) => (
              <div key={`${b.isbn}-${i}`} className={`card ${i === 0 ? "top" : ""}`}>
                <div className="card-left">
                  <div className="cover">{b.name.charAt(0)}</div>
                </div>
                <div className="card-right">
                  <div className="book-name">{b.name}</div>
                  <div className="meta">Autor: {b.author}</div>
                  <div className="meta">ISBN: {b.isbn}</div>
                  <div className="meta">Editorial: {b.editorial}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
