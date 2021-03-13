import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom' //makes array from browsing history
import firebase from 'firebase'
import { UserContext } from '../App'
import { Form, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined } from '@ant-design/icons'


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login(){
    const {user, setUser} = useContext(UserContext)
    let history = useHistory()
    const onFinish = ({ email, password }) =>{ 
        console.log('User logged in')
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            setUser(res.user)
            history.push('/') //add this to the history stack and then navigate there
        }) 
        .catch(err => console.log(err.message))
    }

    const onFinishFailed = () => {
        console.log('Sign in Failed')
    }

    const loginWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            setUser(res.user)
            history.push('/')
        })
        .catch(err => console.log(err.message))
    }



    return (
        <>
        <h1>Login</h1>
        {!user &&
        <button onClick={()=>setUser('Heather')}>LOGIN</button>
        }<Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button ghost
             type="primary"
             icon={<GoogleOutlined />} //googleoutlined is a component
             onClick={() => loginWithGoogle()}>
                Login wtih Google
            </Button>
        </Form.Item>
      </Form>
        </>
    )
}

export default Login