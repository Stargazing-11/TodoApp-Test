import { Button, Form, Input, Typography, Card, Flex, Row } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const res = await API.post("/auth/login", values); // call backend
      login(res.data.token); // store token in context/localStorage
      navigate("/"); // redirect to /todos page
    } catch (err) {
      console.error("Login failed", err.response?.data?.msg || err.message);
    }
  };

  return (
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
    </Card>
  );
};

export default Login;
