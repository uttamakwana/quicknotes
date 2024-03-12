import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import type { EditTagsModalProps } from "../types/Note";
import { useNavigate } from "react-router-dom";

const EditTagsModal = ({
  availableTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      {availableTags.length === 0 ? (
        <div className="d-flex flex-column py-2">
          <p
            className="text-center mb-1 fs-5 text-info"
            style={{ fontWeight: "500" }}
          >
            No tags to show. Create your first note now!
          </p>

          <Button
            variant="outline-info"
            className="align-self-center"
            onClick={() => navigate("/new")}
          >
            Create
          </Button>
        </div>
      ) : (
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {availableTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs={"auto"}>
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteTag(tag.id)}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default EditTagsModal;
