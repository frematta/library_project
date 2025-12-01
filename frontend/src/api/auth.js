export async function login(email, password) {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!res.ok) throw new Error("Invalid credentials");

  // Devise-JWT sends the token in the Authorization header
  const jwt = res.headers.get("Authorization")?.split(" ")[1];
  return jwt;
}
