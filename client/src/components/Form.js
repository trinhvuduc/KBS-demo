import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, Input, Button, Select, Row, Col, Radio, Space, Tooltip } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";


function Form1(props) {
    const { Option } = Select;
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [status, setStatus] = useState({});
    const [data, setData] = useState();

    const onFinish = async (values) => {
      const res = await axios.post(`http://localhost:5000/rule-base`, {...values})
      setShow1(false);
      setShow2(true)
      console.log(res);
      setStatus({heightCondition: res.data.heightCondition,
        weightCondition: res.data.weightCondition,
        age: res.data.case.age})
    }

    const onFinish1 = async (values) => {
      values.heightCondition = status.heightCondition.value;
      values.weightCondition = status.weightCondition.value;
      values.age = status.age;
      const res1 = await axios.post(`http://localhost:5000/case-base`, {...values})
      setData(res1.data.data)
      setShow2(false)
      setShow3(true)
      console.log(values);
    }
    console.log('data',data);
    
  return (
      <Row>
          <Col span={12} offset={6}>
          <p style={{fontSize:'30px', textAlign: 'center'}}>Hệ thống tư vấn dinh dưỡng trẻ em</p>
          {show1&&<Form name="wrap" value={50} labelCol={{flex: "110px",}} style={{marginTop:'100px'}}
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

    {show2&&<Form name="wrap" value={50} labelCol={{flex: "110px",} } style={{marginTop:'100px'}}
        initialValues={{kindergarten: "khong"}}
        labelAlign="left"
        labelWrap
        wrapperCol={{
        flex: 1,
      }}
      onFinish={onFinish1}
      colon={false}
    >
    
      
        <p>Trạng thái chiều cao so với độ tuổi:<span style={{marginLeft: '20px'}}>{status&&status.heightCondition&&status.heightCondition.name}</span></p>
        <p>Trạng thái cân nặng so với độ tuổi:<span style={{marginLeft: '20px'}}>{status&&status.weightCondition&&status.weightCondition.name}</span></p>
     
      
      <Form.Item name="eyesight" label="Thị lực:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group defaultValue="">
          <Radio value="">Không</Radio>
          <Tooltip placement="topLeft" title="các hoạt động diễn ra bình thường, mắt nhìn xa tốt">
            <Radio value="binh_thuong">Bình thường</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="Khó khăn khi nhìn, phải nheo hoặc dụi mắt, chảy nước mắt">
          <Radio value="kem">Kém</Radio>
          </Tooltip> 
        </Radio.Group>
        </Row>
      </Form.Item>

      <Form.Item name="kindergarten" label="Đi nhà trẻ:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group defaultValue="khong">
        <Radio value="khong">Không</Radio>
          <Radio value="co">Có</Radio>
        </Radio.Group>
        </Row>
      </Form.Item>

      <Form.Item name="absorption" label="Khả năng hấp thụ:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group defaultValue="">
          <Radio value="">Không</Radio>
          <Tooltip placement="topLeft" title="Trẻ ăn mức độ vừa phải nhưng thừa cân hoặc vượt giới hạn trên về chiều cao">
          <Radio value="tot">Tốt</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="không đau dạ dày, tiêu chảy, ăn đủ lượng và phát triển bình thường">
          <Radio value="binh_thuong">Bình thường</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="biểu hiện đau bụng, nôn mửa, tăng cân chậm, tiêu chảy,...">
          <Radio value="kem">Kém</Radio>
          </Tooltip>
        </Radio.Group>
        </Row>
      </Form.Item>

      <Form.Item name="eatingLevel" label="Mức độ ăn:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group defaultValue="">
          <Radio value="">Không</Radio>
          <Tooltip placement="topLeft" title="vượt quá lượng thức ăn mỗi bữa theo tiêu chuẩn">
          <Radio value="nhieu">Nhiều</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="tương đương lượng ăn tiêu chuẩn">
          <Radio value="binh_thuong">Bình thường</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title=" trẻ ăn chậm, trì hoãn bữa ăn, ngậm hoặc nhè thức ăn">
          <Radio value="bieng_an">Biếng ăn</Radio>
          </Tooltip>
        </Radio.Group>
        </Row>
      </Form.Item>

      <Form.Item name="strength" label="Sức đề kháng:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group defaultValue="">
          <Radio value="">Không</Radio>
          <Tooltip placement="topLeft" title="trẻ không mắc bệnh trong quá trình phát triển">
          <Radio value="cao">Cao</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="Trẻ không ốm và cảm vặt, hoặc xảy ra rất ít sau tháng thứ 6">
          <Radio value="binh_thuong">Bình thường</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="Trẻ hay ốm vặt, thèm đường, có vết thương lâu lành, biếng ăn,...">
          <Radio value="thap">Thấp</Radio>
          </Tooltip>
        </Radio.Group>
        </Row>
      </Form.Item>

      <Form.Item name="bodyMovement" label="Độ vận động:">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Radio.Group defaultValue="">
          <Radio value="">Không</Radio>
          <Tooltip placement="topLeft" title="Thường xuyên chạy nhảy, hoạt động nhiều, không thể ngồi yên hay im lặng trong một khoảng thời gian dài">
          <Radio value="cao">Cao</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="Các hoạt động diễn ra bình thường">
          <Radio value="binh_thuong">Bình thường</Radio>
          </Tooltip>
          <Tooltip placement="topLeft" title="Ít vận động, thường xuyên nằm hoặc ngồi 1 chỗ">
          <Radio value="thap">Thấp</Radio>
          </Tooltip>
        </Radio.Group>
        </Row>
      </Form.Item>

      <Form.List name="methods">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'key']}
                  rules={[{ required: true, message: 'Không được trống' }]}
                >
                  <Input placeholder="Thuộc tính" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
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
        <Button type="primary" htmlType="submit">
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
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{marginTop:'20px'}}>
      
      <Col span={12}>
      <img src="1.png" style={{width:'400px'}}></img>
      </Col>

      <Col span={12}>
      <p style={{fontSize:'20px'}}>Đây là chế độ dinh dưỡng một ngày mà hệ thống tư vấn cho con của bạn: <br/>
      <span style={{fontSize:'20px',fontWeight: 'bold', textAlign: 'center'}}>{data}</span></p>
      <p style={{fontSize:'20px'}}>Bạn có thể tham khảo ảnh bên đây để lựa chọn thực đơn phù hợp.</p>
      </Col>
    </Row>    
    </Form>}
          </Col>
      </Row>
    
  );
}

export default Form1;
