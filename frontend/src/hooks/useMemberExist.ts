import { useEffect, useState } from "react";
import type { Person } from "@/type/person";

export default function useMemberExist() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = () => {
      fetch("http://localhost:3001/members")
        .then((res) => res.json())
        .then((data) => setPeople(data))
        .catch((err) => console.error("fetch error:", err));
    };

    fetchPeople();

    const interval = setInterval(fetchPeople, 2000);
    return () => clearInterval(interval);
  }, []);

  return people.length > 0;
}
