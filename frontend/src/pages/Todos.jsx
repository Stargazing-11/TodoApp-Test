import { useEffect, useState } from "react";
import {
  Button,
  Card,
  List,
  Typography,
  Tag,
  Space,
  Image,
  Row,
  Col,
  App,
} from "antd";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Todos = () => {
  const { message } = App.useApp();
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
      message.success("To-Do deleted");
    } catch (err) {
      console.error("Delete failed");
      message.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Row justify="center" style={{ marginTop: "5vh" }}>
      <Col xs={22} sm={20} md={16} lg={14} xl={12}>
        <Card
          title="Your To-Dos"
          extra={
            <Space>
              <Button type="primary" onClick={() => navigate("/create")}>
                + New
              </Button>
              <Button
                danger
                onClick={() => {
                  logout();
                  message.info("Logged out");
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                  navigate("/login"); // 👈 add this
                }}
              >
                Logout
              </Button>
            </Space>
          }
          style={{ borderRadius: "10px" }}
        >
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={todos}
            renderItem={(todo) => (
              <List.Item>
                <Card
                  // hoverable
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                  cover={
                    todo.thumbnail && (
                      <Image
                        src={`http://localhost:5000/${todo.thumbnail}`}
                        alt="thumbnail"
                        height={200}
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px 8px 0 0",
                        }}
                        preview={{
                          src: `http://localhost:5000/${todo.thumbnail}`, // ✅ Enable full preview
                        }}
                      />
                    )
                  }
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => navigate(`/edit/${todo._id}`)}
                    >
                      Edit
                    </Button>,
                    <Button danger onClick={() => handleDelete(todo._id)}>
                      Delete
                    </Button>,
                  ]}
                >
                  <div style={{ margin: "12px 0" }}>
                    <hr
                      style={{ border: "none", borderTop: "1px solid #eee" }}
                    />
                  </div>
                  <div style={{ paddingBottom: 8 }}>
                    <Typography.Title level={4} style={{ marginBottom: 0 }}>
                      {todo.title}
                    </Typography.Title>
                    <Typography.Paragraph
                      type="secondary"
                      style={{ marginBottom: 0 }}
                    >
                      {todo.description}
                    </Typography.Paragraph>
                  </div>

                  <div style={{ margin: "12px 0" }}>
                    <hr
                      style={{ border: "none", borderTop: "1px solid #eee" }}
                    />
                  </div>

                  {todo.attachment && (
                    <div style={{ marginBottom: 8 }}>
                      <Typography.Link
                        href={`http://localhost:5000/${todo.attachment}`}
                        target="_blank"
                        style={{ display: "block" }}
                      >
                        📎 Download Attachment
                      </Typography.Link>
                    </div>
                  )}

                  <div style={{ margin: "12px 0" }}>
                    <hr
                      style={{ border: "none", borderTop: "1px solid #eee" }}
                    />
                  </div>

                  <Space wrap>
                    {todo.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Todos;
