import { NoteContext } from "@/context/note-context";
import { useContext } from "react";

export function useNote() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNote must be within a NoteProvider.");
  }

  return context;
}
