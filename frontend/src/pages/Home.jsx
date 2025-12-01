import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../api/me";
import LibrarianDashboard from "../components/LibrarianDashboard";
import MemberDashboard from "../components/MemberDashboard";

export default function Home() {
  const [user, setUser] = useState(null);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchCurrentUser(jwt);
        setUser(data);
      } catch (err) {
        localStorage.removeItem("jwt");
        window.location.reload();
        console.error(err);
      }
    }
    loadUser();
  }, [jwt]);  

  if (!user) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Welcome to the Library System!</h1>
      <p><strong>Your role:</strong> {user.role}</p>
      <button
        onClick={() => {
          localStorage.removeItem("jwt");
          window.location.reload();
        }}
      >
        Logout
      </button>

      {user.role === "librarian" ? (
        <LibrarianDashboard />
      ) : (
        <MemberDashboard />
      )}
    </div>
  );
}