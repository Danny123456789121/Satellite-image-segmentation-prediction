import React, { useEffect } from 'react';
import { Button, Form, Input, InputNumber, Slider } from 'antd';
import { Store } from 'antd/lib/form/interface';

interface InputFormProps {
  onCustomFinish: (values: Store) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onCustomFinish }) => {
  const [form] = Form.useForm();

  // Fetch API key from local storage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('googleApiKey');
    if (storedApiKey) {
      form.setFieldsValue({ key: storedApiKey });
    }
  }, [form]);

  async function onFinish() {
    try {
      const values = await form.validateFields();
      // Save API key to local storage
      localStorage.setItem('googleApiKey', values.key);
      onCustomFinish(values);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  return (
    <>
      <Form
        form={form}
        name="img-input-form"
        labelCol={{ flex: '150px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 500 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Google Static API key"
          name="key"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Latitude"
          name="Latitude"
          rules={[{ required: true }]}
        >
          <InputNumber controls={false} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Longitude"
          name="Longitude"
          rules={[{ required: true }]}
        >
          <InputNumber controls={false} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Zoom" name="Zoom" rules={[{ required: true }]}>
          <Slider
            min={1}
            max={20}
            marks={{ 1: '1', 10: '10', 20: '20' } as Record<number, string>}
          />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputForm;
