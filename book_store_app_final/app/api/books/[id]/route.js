import { NextResponse } from "next/server";
import { books } from "../route";

export const DELETE = async (request, { params }) => {
  const { id } = await params;

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
  }

  return NextResponse.json({ "Book deleted": id });
};
