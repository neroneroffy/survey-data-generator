/**
 * Author: Zhou Ht
 * Date: 2019/2/27 0027
 * Time: 22:50
 *
 */
import React from 'react'
import { Form, Input, Radio, Button, Icon, Row, Col } from 'antd'
import './style/index.less'

const { TextArea } = Input;
const RadioGroup = Radio.Group
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
let selectionId = 0;


class AddQuestion extends React.Component{
  state = {
    qType: 1,
  }
  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(selectionId++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map(k => (
      <div className="selection-item">
        <Form.Item
          {...formItemLayoutWithOutLabel}
          required={false}
          key={k}
        >
          {getFieldDecorator(`selectKey[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入选项标识",
            }],
          })(
            <Input placeholder="标识" style={{ width: 100, marginRight: 8 }} />
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayoutWithOutLabel}
          required={false}
          key={k}
        >
          {getFieldDecorator(`selectValue[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入选项内容",
            }],
          })(
            <Input placeholder="选项内容" style={{ width: 300, marginRight: 8  }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>

      </div>
    ))
    return <>
      <Form>
        <div className="question-add">
          <h3>添加问题</h3>
          <RadioGroup onChange={this.onSelectQuestionType} value={this.state.qType}>
            <Radio value={1}>单选</Radio>
            <Radio value={2}>多选</Radio>
          </RadioGroup>
          <FormItem
            label="问题描述"
          >
            <TextArea/>
          </FormItem>
          <div className="add-selection">
            <h3>添加选项</h3>
            <Button type="dashed" onClick={this.add}>
              <Icon type="plus" /> 点击添加
            </Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
          <div className="selections">
            {formItems}
          </div>
        </div>
      </Form>
    </>
  }
}
export default Form.create()(AddQuestion)