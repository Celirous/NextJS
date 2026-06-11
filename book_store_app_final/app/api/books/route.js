import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// We import the JSON file as the initial seed data.
// In dev mode Next.js module cache keeps this array alive between requests,
// so adds/deletes persist until you restart the server — exactly as the book teaches.
import seedBooks from "./data.json";

// Mutable in-memory store (module-level singleton in dev)
let books = [...seedBooks];

// Expose the live array so other route files can share the same reference
export { books };

export async function GET(req) {
  return NextResponse.json(books);
}

export async function POST(req) {
  const { title, link, img } = await req.json();
  const newBook = {
    id: uuidv4(),
    title,
    link,
    img,
  };
  books.push(newBook);
  return NextResponse.json("Book added successfully");
}
