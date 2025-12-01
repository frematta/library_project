export async function fetchCurrentUser(jwt) {
  const res = await fetch("http://localhost:3000/me", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) throw new Error("Unable to load current user");
  return await res.json();
}