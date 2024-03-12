import React from "react";
import { useNote } from "../hooks/useNote";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import MDEditor from "@uiw/react-md-editor";

const Note = ({ onDelete }: { onDelete: (id: string) => void }) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
            >
              Delete
            </Button>
            <Link to={`..`}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      {/* <ReactMarkdown>{note.markdown}</ReactMarkdown> */}
      <MDEditor.Markdown
        source={note.markdown}
        style={{
          whiteSpace: "pre-wrap",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 2px 2px #0d1117",
        }}
      />
    </>
  );
};

export default Note;
