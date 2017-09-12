import React, { Component } from 'react';
import { Form, Input, DatePicker, Select, Col, Radio, Icon, Button, notification } from 'antd';
import uuid from 'uuid/v4';
import moment from 'moment';
import './ContactForm.css';

const FormItem = Form.Item;
const Option = Select.Option;

class ContactForm extends Component {

  state = {
    isCreating: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ isCreating: true });

        const submit = Object.assign({}, values, {
          birthday: values.birthday ? values.birthday.format('M/D/YYYY') : undefined,
          age: values.birthday ? moment().diff(values.birthday, 'years') : undefined,
          middleinitial: values.middleinitial ? values.middleinitial.toUpperCase() : undefined,
          zipcode: values.zipcode ? parseInt(values.zipcode) : undefined,
          ccNumber: values.ccNumber ? parseInt(values.ccNumber) : undefined,
          ccv2: values.ccv2 ? parseInt(values.ccv2) : undefined,
          ccExpires: values.ccExpires ? values.ccExpires.format('M/YYYY') : undefined,
          state: values.state ? values.state.toUpperCase() : undefined,
          phoneCountryCode: values.phoneCountryCode ? parseInt(values.phoneCountryCode) : undefined,
          westernUnionMTCN: values.westernUnionMTCN ? parseInt(values.westernUnionMTCN) : undefined,
          moneyGramMTCN: values.moneyGramMTCN ? parseInt(values.moneyGramMTCN) : undefined,
          latitude: values.latitude ? parseFloat(values.latitude) : undefined,
          longitude: values.longitude ? parseFloat(values.longitude) : undefined,
          guid: uuid()
        });

        const req = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact: submit
          })
        };

        console.log('Received values of form: ', req);

        //https://sibi-db-tadscritch.herokuapp.com

        fetch('http://localhost:4000/contacts', req).then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            res.json().then((data)=> {
              this.openNotificationWithIcon('error', data.message);
            });
            throw new Error();
          }
        }).then((data) => {
          this.setState({ isCreating: false });
          this.props.form.resetFields();
        }).catch((err) => {
          this.setState({ isCreating: false });
        });
      }
    });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: 'Server Error',
      description: message,
    });
  };

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

    const stateSelect = getFieldDecorator('state')(
      <Select>
        <Option value="AL">AL </Option>
        <Option value="AK">AK </Option>
        <Option value="AS">AS </Option>
        <Option value="AZ">AZ </Option>
        <Option value="AR">AR </Option>
        <Option value="CA">CA </Option>
        <Option value="CO">CO </Option>
        <Option value="CT">CT </Option>
        <Option value="DE">DE </Option>
        <Option value="DC">DC </Option>
        <Option value="FM">FM </Option>
        <Option value="FL">FL </Option>
        <Option value="GA">GA </Option>
        <Option value="GU">GU </Option>
        <Option value="HI">HI </Option>
        <Option value="ID">ID </Option>
        <Option value="IL">IL </Option>
        <Option value="IN">IN </Option>
        <Option value="IA">IA </Option>
        <Option value="KS">KS </Option>
        <Option value="KY">KY </Option>
        <Option value="LA">LA </Option>
        <Option value="ME">ME </Option>
        <Option value="MH">MH </Option>
        <Option value="MD">MD </Option>
        <Option value="MA">MA </Option>
        <Option value="MI">MI </Option>
        <Option value="MN">MN </Option>
        <Option value="MS">MS </Option>
        <Option value="MO">MO </Option>
        <Option value="MT">MT </Option>
        <Option value="NE">NE </Option>
        <Option value="NV">NV </Option>
        <Option value="NH">NH </Option>
        <Option value="NJ">NJ </Option>
        <Option value="NM">NM </Option>
        <Option value="NY">NY </Option>
        <Option value="NC">NC </Option>
        <Option value="ND">ND </Option>
        <Option value="MP">MP </Option>
        <Option value="OH">OH </Option>
        <Option value="OK">OK </Option>
        <Option value="OR">OR </Option>
        <Option value="PW">PW </Option>
        <Option value="PA">PA </Option>
        <Option value="PR">PR </Option>
        <Option value="RI">RI </Option>
        <Option value="SC">SC </Option>
        <Option value="SD">SD </Option>
        <Option value="TN">TN </Option>
        <Option value="TX">TX </Option>
        <Option value="UT">UT </Option>
        <Option value="VT">VT </Option>
        <Option value="VI">VI </Option>
        <Option value="VA">VA </Option>
        <Option value="WA">WA </Option>
        <Option value="WV">WV </Option>
        <Option value="WI">WI </Option>
        <Option value="WY">WY </Option>
      </Select>
    );

    const prefixSelector = getFieldDecorator('phoneCountryCode')(
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
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Birthday:
              </span>
            </Col>
            <Col span={9}>
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

          <FormItem
            {...formItemLayout}
            label="Street Address"
          >
            <Col span={10}>
              <FormItem>
                { getFieldDecorator('streetAddress', {})(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                City:
              </span>
            </Col>
            <Col span={8}>
              <FormItem>
                {getFieldDecorator('city')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                State:
              </span>
            </Col>
            <Col span={2}>
              <FormItem>
                {stateSelect}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Zip Code"
          >
            <Col span={7}>
              <FormItem>
                { getFieldDecorator('zipcode', {
                  rules: [{
                    pattern: /(^\d{5}$)|(^\d{5}-\d{4}$)/, message: 'Please enter a valid zip code'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Country:
              </span>
            </Col>
            <Col span={14}>
              <FormItem>
                {getFieldDecorator('country')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem {...formItemLayout} label="Browser">
            { getFieldDecorator('browser', {})(
              <Select>
                <Option value="Safari">Safari</Option>
                <Option value="Chrome">Chrome</Option>
                <Option value="Firefox">Firefox</Option>
                <Option value="Edge">Edge</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Credit Card Type"
          >
            <Col span={4}>
              <FormItem>
                { getFieldDecorator('ccType', {})(
                  <Select>
                    <Option value="MasterCard">MasterCard</Option>
                    <Option value="Visa">Visa</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                CC Number:
              </span>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('ccNumber', {
                  rules: [{
                    pattern: /^[0-9]{16}$/, message: 'The input is not a valid credit card number',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                CVC:
              </span>
            </Col>
            <Col span={2}>
              <FormItem>
                { getFieldDecorator('ccv2', {
                  rules: [{
                    pattern: /^[0-9]{3}$/, message: 'The input is not a CVC',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Expiration:
              </span>
            </Col>
            <Col span={4}>
              <FormItem>
                { getFieldDecorator('ccExpires')(
                  <DatePicker.MonthPicker format="MM/YY" style={{ width: '100%' }}/>
                )}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Job Title"
          >
            <Col span={10}>
              <FormItem>
                { getFieldDecorator('occupation', {})(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Company:
              </span>
            </Col>
            <Col span={11}>
              <FormItem>
                {getFieldDecorator('company')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Western Union MTCN"
          >
            <Col span={9}>
              <FormItem>
                { getFieldDecorator('westernUnionMTCN', {
                  rules: [{
                    pattern: /^[0-9]{0,20}$/, message: 'MTCN must be a number'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                MoneyGram MTCN:
              </span>
            </Col>
            <Col span={11}>
              <FormItem>
                {getFieldDecorator('moneyGramMTCN', {
                  rules: [{
                    pattern: /^[0-9]{0,20}$/, message: 'MTCN must be a number'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="National ID"
          >
            <Col span={11}>
              <FormItem>
                { getFieldDecorator('nationalId')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={2}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                UPS:
              </span>
            </Col>
            <Col span={11}>
              <FormItem>
                { getFieldDecorator('ups')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </FormItem>

          <FormItem {...formItemLayout} label="Mother's Madien Name:">
            { getFieldDecorator('mothersMadien')(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Vehicle:">
            { getFieldDecorator('vehicle')(
              <Input />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Domain:">
            { getFieldDecorator('domain', {
              rules: [{
                pattern: /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/i, message: 'Please enter a valid domain'
              }]
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Latitude"
          >
            <Col span={10}>
              <FormItem>
                { getFieldDecorator('latitude', {
                  rules: [{
                    pattern: /^-?([1-8]?[1-9]|[1-9]0)(\.{1}\d{1,6})?/, message: 'Please enter a valid latitude'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                Longitude:
              </span>
            </Col>
            <Col span={11}>
              <FormItem>
                { getFieldDecorator('longitude', {
                  rules: [{
                    pattern: /^-?([1-8]?[1-9]|[1-9]0)(\.{1}\d{1,6})?/, message: 'Please enter a valid longitude'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </FormItem>




          {/* SUBMIT */}
          <FormItem {...tailFormItemLayout}>
            { this.state.isCreating ? (<Button type="primary" htmlType="submit" loading disabled>Create Contact</Button>) : <Button type="primary" htmlType="submit">Create Contact</Button>}

          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedContactForm = Form.create()(ContactForm);

export default WrappedContactForm;
