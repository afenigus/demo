import {Button, Form, Input, message} from 'antd'
import api from '../../utils/api'
const supplier = ({ setSupplierAddView, storeSupplier, setStoreSupplier, searchData }) => {
    const handleFinish = (values) => {
    console.log(values, "values");
    api.post("supplier", values).then((response) => {
      if (response.status === 201) {
        message.success("Supplier added successfully!");
        setStoreSupplier([...storeSupplier, values]);
        setSupplierAddView(false);
        searchData();
      } else {
        message.error("An error occurred");
      }
      console.log(response, "response from supplier view");
    });
  };
  return (
      <div className=" w-full flex items-center justify-center">
        <Form
          onFinish={handleFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}>
          <Form.Item
            name="firstName"
            label="Supplier Name"
            rules={[
              {
                required: true,
                message: "please enter supplier name",
              },
            ]}>
            <Input type="text" placeholder="name" />
            </Form.Item>
                  
            <Form.Item
            name="lastName"
            label=" Last Name"
           >
            <Input type="text" placeholder="last name" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "please enter phone number",
              },
              {
                 
            pattern: /^[ +,\d 0-9, \s\- ]+$/,  // Regular expression to allow only numeric characters
            message: 'Enter a valid phone number start like +251- or 09!',
          },
            ]}>
            <Input  placeholder="phone number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            >
            <Input type="email" placeholder="email" />
          </Form.Item>
          <Form.Item className="flex">
            <Button htmlType="submit" className="mr-4">
              Save
            </Button>
            <Button onClick={() => setSupplierAddView(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
  )
}
export default supplier
