import { Button, Col, Form, Image, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import { type NoteListProps, type Tag } from "../types/Note";
import { EditTagsModal, NoteCard } from "../components";

const NoteList = ({
  availableTags,
  notesWithTags,
  updateTag,
  deleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(() => []);
  const [title, setTitle] = useState<string>(() => "");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(() => false);
  const navigate = useNavigate();

  const filteredNotes = useMemo(() => {
    return notesWithTags.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notesWithTags]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col className="main-header">
          <h1>Quick Notes</h1>
        </Col>
        <Col xs={"auto"}>
          <Stack gap={2} direction={"horizontal"}>
            <Link to={"/new"}>
              <Button variant={"primary"}>Create</Button>
            </Link>
            <Button
              variant={"outline-secondary"}
              onClick={() => setEditTagsModalIsOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      {notesWithTags.length !== 0 && (
        <Form>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder="Search your notes..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  isMulti
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      )}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      {notesWithTags.length === 0 && (
        <div className="d-flex flex-column ">
          <p
            className="text-center mb-1 fs-5 text-muted"
            style={{ fontWeight: "500" }}
          >
            Create your first note now!
          </p>

          <Button
            variant="outline-primary"
            className="align-self-center mb-4"
            onClick={() => navigate("/new")}
          >
            Create
          </Button>
        </div>
      )}
      <EditTagsModal
        show={editTagsModalIsOpen}
        availableTags={availableTags}
        handleClose={() => setEditTagsModalIsOpen(false)}
        onUpdateTag={updateTag}
        onDeleteTag={deleteTag}
      />
    </>
  );
};

export default NoteList;
