import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Flex,
  Row,
  Col,
  App,
} from "antd";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const { message } = App.useApp(); // ✅ correct context-based message
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const res = await API.post("/auth/login", values); // call backend
      login(res.data.token); // store token in context/localStorage
      message.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      navigate("/"); // redirect to /todos page
    } catch (err) {
      console.error("Login failed", err.response?.data?.msg || err.message);
      message.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "10vh" }}>
      <Col xs={22} sm={20} md={16} lg={14} xl={12}>
        <Card
          title="Login"
          style={{
            margin: "2vh auto",
            textAlign: "center", // 👈 Fixes left-alignment
          }}
        >
          <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form>
          <Typography.Text>
            Don’t have an account? <Link to="/register">Register here</Link>
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
