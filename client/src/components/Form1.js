import React, { useState } from "react";
import axios from 'axios';
import { Form, Input, Button, Select, Row, Col, Radio, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";


function Form1(props) {
    const { Option } = Select;
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [eyes1, setEyes1] = useState('');
    const [kindergarten1, setKindergarten1] = useState('');
    const [absorb1, setAbsorb1] = useState('');
    const [eat1, setEat1] = useState('');
    const [health1, setHealth1] = useState('');
    const [activity1, setActivity1] = useState('');

    const eyesight = [
        { label: 'Không biết', value: '' },
        { label: 'Bình thường', value: 'binh_thuong' },
        { label: 'Kém', value: 'kem' },
    ];

    const kindergarten = [
      { label: 'Không biết', value: '' },
        { label: 'Có', value: 'co' },
        { label: 'Không', value: 'khong' },
    ]; 

    const absorption = [
      { label: 'Không biết', value: '' },
        { label: 'Tốt', value: 'tot' },
        { label: 'Bình thường', value: 'binh_thuong' },
        { label: 'Kém', value: 'kem' },
    ];

    const eatingLevel = [
      { label: 'Không biết', value: '' },
        { label: 'Nhiều', value: 'nhieu' },
        { label: 'Bình thường', value: 'binh_thuong' },
        { label: 'Biếng Ăn', value: 'bieng_an' },
    ];

    const strength = [
      { label: 'Không biết', value: '' },
        { label: 'Cao', value: 'cao' },
        { label: 'Bình thường', value: 'binh_thuong' },
        { label: 'Thấp', value: 'thap' },
    ]; 

    const bodyMovement = [
      { label: 'Không biết', value: '' },
        { label: 'Cao', value: 'cao' },
        { label: 'Bình thường', value: 'binh_thuong' },
        { label: 'Thấp', value: 'thap' },
    ];


    const onChange1 = (e) => {
        console.log('radio1 checked', e.target.value);
        setEyes1(e.target.value)
    };
    const onChange2 = (e) => {
        console.log('radio1 checked', e.target.value);
        setKindergarten1(e.target.value)
    };
    const onChange3 = (e) => {
        console.log('radio1 checked', e.target.value);
        setAbsorb1(e.target.value)
    };
    const onChange4 = (e) => {
        console.log('radio1 checked', e.target.value);
        setEat1(e.target.value)
    };
    const onChange5 = (e) => {
        console.log('radio1 checked', e.target.value);
        setHealth1(e.target.value)
    };
    const onChange6 = (e) => {
        console.log('radio1 checked', e.target.value);
        setActivity1(e.target.value)
    };

    const onFinish = async (values) => {
      const res = await axios.post(`http://localhost:5000/rule-base`, {...values})
    }
    
  return (
      <Row>
          <Col span={12} offset={6}>
          {!show2&&<Form name="wrap" value={50} labelCol={{flex: "110px",} }
        labelAlign="left"
        labelWrap
        wrapperCol={{
        flex: 1,
      }}
      onFinish={onFinish}
      colon={false}
    >
      <Form.Item label="Chiều cao:" name="height" 
        rules={[
          {
            required: true, message: "Không được bỏ trống" 
          },
        ]}
      >
        <Input placeholder="cm"/>
      </Form.Item>

      <Form.Item
        label="Cân nặng:"
        name="weight"
        rules={[
          {
            required: true, message: "Không được bỏ trống"
          },
        ]}
      >
        <Input placeholder="kg"/>
      </Form.Item>

      <Form.Item
        label="Tuổi(tháng):"
        name="age"
        rules={[
          {
            required: true, message: "Không được bỏ trống"
          },
        ]}
      >
        <Input placeholder="tháng"/>
      </Form.Item>

      <Form.Item
        name="gender"
        label="Giới tính"
        rules={[
          {
            required: true, message: "Không được bỏ trống"
          },
        ]}
      >
        <Select
          placeholder="Chọn giới tính"
          allowClear
        >
          <Option value="trai">Nam</Option>
          <Option value="gai">Nữ</Option>
        </Select>
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>}

    {show2&&!show3&&<Form name="wrap" value={50} labelCol={{flex: "110px",} }
        labelAlign="left"
        labelWrap
        wrapperCol={{
        flex: 1,
      }}
      colon={false}
    >
    
    <Form.Item label="Thị lực:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {/* <Col className="gutter-row" span={6}><p>Thị lực:</p></Col> */}
        <Radio.Group options={eyesight} onChange={onChange1} value={eyes1} />
        </Row>
      </Form.Item>

      <Form.Item label="Đi nhà trẻ:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group options={kindergarten} onChange={onChange2} value={kindergarten1} />
        </Row>
      </Form.Item>

      <Form.Item label="Khả năng hấp thụ:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group options={absorption} onChange={onChange3} value={absorb1} />
        </Row>
      </Form.Item>

      <Form.Item label="Mức độ ăn:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group options={eatingLevel} onChange={onChange4} value={eat1} />
        </Row>
      </Form.Item>

      <Form.Item label="Sức đề kháng:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group options={strength} onChange={onChange5} value={health1} />
        </Row>
      </Form.Item>

      <Form.Item label="Độ vận động:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group options={bodyMovement} onChange={onChange6} value={activity1} />
        </Row>
      </Form.Item>

      <Form.List name="methods">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Không được trống' }]}
                >
                  <Input placeholder="Thuộc tính" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Không được trống' }]}
                >
                  <Input placeholder="Tình trạng" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Thêm tình trạng
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" onClick={() =>setShow3(true)}>
          Submit
        </Button>
      </Form.Item>

    </Form>}

    {show3&&<Form name="wrap" value={50} labelCol={{flex: "110px",} }
        labelAlign="left"
        labelWrap
        wrapperCol={{
        flex: 1,
      }}
      colon={false}
    >
    <p>Hello</p>    
    </Form>}
          </Col>
      </Row>
    
  );
}

export default Form1;
