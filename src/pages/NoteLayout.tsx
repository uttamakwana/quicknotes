import { Navigate, Outlet, useParams } from "react-router-dom";
import { type NoteLayoutProps } from "../types/Note";

const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (note == null) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
};

export default NoteLayout;
