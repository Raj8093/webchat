import { useState } from 'react';
import './index.css';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined,LockOutlined,MailOutlined } from '@ant-design/icons';
import { Input,Button } from 'antd';
import { Link } from 'react-router-dom';

const Signup=()=>{
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [cnfpassword,setCnfPassword]=useState('')
    const [email,setEmail]=useState('')

    const onFieldChange=(type,event)=>{
        switch (type) {
            case "name":
                setUserName(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            case "email":
                setEmail(event.target.value)
                break;
            case "cnf-password":
                setCnfPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className='wrapper'>
            <div className='brandName'>We Connect</div>
            <div className='loginContainer'>
                <div className='header'>Register</div>
                    <Input
                        className='inputBoxes'
                        placeholder="Enter your username"
                        value={userName} 
                        onChange={(e)=>onFieldChange('name',e)}
                        prefix={<UserOutlined  />}
                        />
                    <Input
                        className='inputBoxes'
                        placeholder="Enter your Email"
                        value={email} 
                        onChange={(e)=>onFieldChange('email',e)}
                        prefix={<MailOutlined />}
                        />
                    <Input.Password
                        className='inputBoxes'
                        value={password} 
                        onChange={(e)=>onFieldChange('password',e)} 
                        placeholder='Password'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        prefix={<LockOutlined />}
                    />

                    <Input.Password
                        className='inputBoxes'
                        value={cnfpassword} 
                        onChange={(e)=>onFieldChange('cnf-password',e)} 
                        placeholder='Confirm Password'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        prefix={<LockOutlined />}
                    />
                
                <Button className='LoginButton'>SignUp</Button>
                <div>Already have an Account ?<Link to="/" >LogIn</Link></div>
            </div>
        </div>
    )
}

export {Signup};