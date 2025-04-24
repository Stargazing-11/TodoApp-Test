import { Button, Form, Input, Card, App } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      await API.post("/auth/register", {
        email: values.email,
        password: values.password,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      message.success("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      message.error(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <Card
      title="Register"
      style={{ maxWidth: 500, margin: "auto", marginTop: "10vh" }}
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
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Typography.Text>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography.Text>
      </div>
    </Card>
  );
};

export default Register;
