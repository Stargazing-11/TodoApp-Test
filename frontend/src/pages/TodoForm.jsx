import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Upload, Card, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import API from "../services/api";

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [thumbList, setThumbList] = useState([]);

  const fetchTodo = async () => {
    const res = await API.get(`/todos/${id}`);
    form.setFieldsValue({
      title: res.data.title,
      description: res.data.description,
      tags: res.data.tags,
    });
  };

  useEffect(() => {
    if (id) fetchTodo();
  }, [id]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("tags", values.tags.join(","));
    if (fileList[0]) formData.append("attachment", fileList[0].originFileObj);
    if (thumbList[0]) formData.append("thumbnail", thumbList[0].originFileObj);

    try {
      if (id) {
        await API.put(`/todos/${id}`, formData);
        message.success("To-Do updated");
      } else {
        await API.post("/todos", formData);
        message.success("To-Do created");
      }
      navigate("/");
    } catch (err) {
      message.error("Operation failed");
    }
  };

  return (
    <Card
      title={id ? "Edit To-Do" : "Create To-Do"}
      style={{ maxWidth: 600, margin: "auto", marginTop: "5vh" }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Add tags" />
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Upload
            beforeUpload={() => false}
            onChange={({ fileList }) => setThumbList(fileList)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Attachment">
          <Upload
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {id ? "Update" : "Create"}
        </Button>
      </Form>
    </Card>
  );
};

export default TodoForm;
