import React, { Component } from 'react';
import { Form, Input, DatePicker, Select, Col, Radio, Icon, Button } from 'antd';
import './ContactForm.css';

const FormItem = Form.Item;
const Option = Select.Option;

class ContactForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // call fetch
        // format fields: birthday, middleinitial.toUpperCase()
        console.log('Received values of form: ', values);
      }
    });
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    const prefixSelector = getFieldDecorator('phoneCountryCode', {
      initialValue: '1',
    })(
      <Select style={{ width: 60 }}>
        <Option value="1">+1</Option>
        <Option value="44">+44</Option>
        <Option value="81">+81</Option>
      </Select>
    );

    return (
      <div className="ContactForm">
        <h1>Create Contact</h1>

        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label="First Name"
          >
            <Col span={6}>
              <FormItem hasFeedback>
                { getFieldDecorator('firstname', {
                  rules: [{
                    required: true, message: 'You must enter a first name.',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Middle Initial:
              </span>
            </Col>
            <Col span={2}>
              <FormItem hasFeedback>
                { getFieldDecorator('middleinitial', {
                  rules: [{
                    len: 1, message: 'Middle initial must only be one character',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Last Name:
              </span>
            </Col>
            <Col span={6}>
              <FormItem>
                { getFieldDecorator('lastname', {})(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Title:
              </span>
            </Col>
            <Col span={2}>
              <FormItem>
                { getFieldDecorator('title', {})(
                  <Select>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Mrs.">Mrs.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Dr.">Dr.</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Gender"
          >
            <Col span={5}>
              <FormItem>
                { getFieldDecorator('gender', {})(
                  <Radio.Group>
                    <Radio.Button value="male">Male</Radio.Button>
                    <Radio.Button value="female">Female</Radio.Button>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Birthday:
              </span>
            </Col>
            <Col span={8}>
              <FormItem>
                {getFieldDecorator('birthday')(
                  <DatePicker format="MMMM Do, YYYY" style={{ width: '100%' }}/>
                )}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Color:
              </span>
            </Col>
            <Col span={6}>
              <FormItem>
                { getFieldDecorator('color', {})(
                  <Select>
                    <Option value="Blue">Blue</Option>
                    <Option value="Purple">Purple</Option>
                    <Option value="Green">Green</Option>
                    <Option value="Red">Red</Option>
                    <Option value="Orange">Orange</Option>
                    <Option value="Yellow">Yellow</Option>
                    <Option value="Brown">Brown</Option>
                    <Option value="Black">Black</Option>
                    <Option value="Silver">Silver</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </FormItem>


          <FormItem {...formItemLayout} label="Email" hasFeedback>
            { getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid email!',
              }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Username" hasFeedback>
            { getFieldDecorator('username', {})(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Password" hasFeedback>
            { getFieldDecorator('password', {})(
              <Input type="password" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Phone Number">
            { getFieldDecorator('phone', {
              rules: [{
                pattern: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/, message: 'The input is not valid phone number!',
              }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>

          {/* SUBMIT */}
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Create Contact</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedContactForm = Form.create()(ContactForm);

export default WrappedContactForm;
