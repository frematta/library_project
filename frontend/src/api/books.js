const BASE = "http://localhost:3000/api/books";

export async function getBooks(jwt, q = "") {
  const res = await fetch(`${BASE}?q=${q}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.json();
}

export async function createBook(jwt, data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ book: data }),
  });

  if (!res.ok) throw new Error("Not allowed");
  return res.json();
}

export async function updateBook(jwt, id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ book: data }),
  });
  return res.json();
}

export async function deleteBook(jwt, id) {
  await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  });
}
