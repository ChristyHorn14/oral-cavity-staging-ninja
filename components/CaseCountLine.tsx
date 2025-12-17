"use client";

import { useEffect, useState } from "react";

export default function CaseCountLine() {
  const [count, setCount] = useState<number | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/case-count", { cache: "no-store" });
      const data = await res.json();
      setCount(typeof data.count === "number" ? data.count : 0);
    } catch {
      // ignore transient errors
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60000); // refresh every 60s
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ marginTop: 8 }}>
      Total cases submitted: {count === null ? "—" : count.toLocaleString()}
    </div>
  );
}
