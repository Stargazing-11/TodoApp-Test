import { useEffect, useState } from "react";
import { Button, Card, List, Typography, Tag, Space, message } from "antd";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Todos = () => {
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
      message.success("To-Do deleted");
      fetchTodos();
    } catch (err) {
      message.error("Failed to delete");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Card
      title="Your To-Dos"
      extra={
        <Space>
          <Button onClick={() => navigate("/create")}>+ New</Button>
          <Button danger onClick={logout}>
            Logout
          </Button>
        </Space>
      }
      style={{ maxWidth: 800, margin: "auto", marginTop: "5vh" }}
    >
      <List
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => navigate(`/edit/${todo._id}`)}>
                Edit
              </Button>,
              <Button danger type="link" onClick={() => handleDelete(todo._id)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={todo.title}
              description={
                <>
                  <Typography.Text>{todo.description}</Typography.Text>
                  <br />
                  {todo.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {todo.thumbnail && (
                    <div>
                      <img
                        src={`http://localhost:5000/${todo.thumbnail}`}
                        alt="thumbnail"
                        style={{ maxWidth: 100, marginTop: 8 }}
                      />
                    </div>
                  )}
                  {todo.attachment && (
                    <div>
                      <a
                        href={`http://localhost:5000/${todo.attachment}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download Attachment
                      </a>
                    </div>
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Todos;
