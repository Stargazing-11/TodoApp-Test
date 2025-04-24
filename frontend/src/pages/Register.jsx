import { Button, Form, Input, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      await API.post("/auth/register", {
        email: values.email,
        password: values.password,
      });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <Card
      title="Register"
      style={{ maxWidth: 400, margin: "auto", marginTop: "10vh" }}
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
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form>
    </Card>
  );
};

export default Register;
