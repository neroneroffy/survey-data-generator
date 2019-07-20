/**
 * Author: Zhou Ht
 * Date: 2019/2/26 0026
 * Time: 22:10
 *
 */
import React from 'react'
import { Form, Input, Radio, Button, Row, Col } from 'antd'
import AddQuestion from '../components/AddQuestion'
import './index.less'

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
class Main extends React.Component {

  state = {
    qType: 1,
  }

  onSelectQuestionType = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      qType: e.target.value,
    });
  }

  render() {
    return <div className="main">
      <h2>问卷调查数据生成器</h2>
      <AddQuestion/>
    </div>
  }
}

export default Main