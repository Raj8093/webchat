import { useState } from 'react';
import './index.css';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined,LockOutlined } from '@ant-design/icons';
import { Input,Button } from 'antd';
import { Link } from 'react-router-dom';
// colors
// 021526
// 03346E
// 6EACDA
// E2E2B6
const Login=()=>{
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')

    const onFieldChange=(type,event)=>{
        switch (type) {
            case "name":
                setUserName(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            default:
                break;
        }
    }
    return(
        <div className='wrapper'>
            <div className='brandName'>We Connect</div>
            <div className='loginContainer'>
                <div className='header'>Login</div>
                    <Input
                        className='inputBoxes'
                        placeholder="Enter your username"
                        value={userName} 
                        onChange={(e)=>onFieldChange('name',e)}
                        prefix={<UserOutlined  />}
                        />
                    <Input.Password
                        className='inputBoxes'
                        value={password} 
                        onChange={(e)=>onFieldChange('password',e)} 
                        placeholder='Password'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        prefix={<LockOutlined />}
                    />
                
                <Button className='LoginButton'>Login</Button>
                <div>Don't have an account?<Link to="/signup">Register</Link></div>
            </div>
        </div>
    )
}
export {Login}