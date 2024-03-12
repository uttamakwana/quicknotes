import { useOutletContext } from "react-router-dom";
import type { Note } from "../types/Note";

export function useNote() {
  return useOutletContext<Note>();
}
