"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/api/getData")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const sortByParam = (param: string) => {
    fetch("/api/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sortBy: param }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center mx-auto font-mono text-sm lg:flex">
        <p className="text-2xl">Sorting data with filters</p>
      </div>
      <div className="flex align-baseline gap-1">
        <p>Sort by</p>
        <button
          className="rounded-md p-1 text-blue-400"
          onClick={() => sortByParam("name")}
        >
          Name
        </button>
        <button
          className="rounded-md p-1 text-blue-400"
          onClick={() => sortByParam("date")}
        >
          Date
        </button>
      </div>
      {data?.map((item: { id: string; file_name: string; date: Date }) => {
        return (
          <div
            key={item.id}
            className="flex items-center justify-between font-mono text-md gap-2 max-w-2xl w-full"
          >
            <p className="text-2xl">{item.file_name}</p>
            <p className="text-2xl">
              {new Date(item.date).toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </main>
  );
}
