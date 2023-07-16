import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Helmet from '../../component/common/Helmet'
import classes from './Login.module.css'
import Message from '../../component/common/Message'
import Error from '../../component/common/Error'
import { useDispatch } from 'react-redux'
import { login } from '../../store/features/authSlice'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();

    const submithandler = async(e) => {
        e.preventDefault()
            const enteredData = {email, password}
            try{
                const res = await dispatch(login({enteredData})).unwrap()
                if (res && res.message){
                    setMessage(res.message)
                }
                setEmail('')
            }catch(error){
                if (error && error.message){
                    setError(error.message)
                }
            }
        setPassword('')
    } 
    if (error || message){
        setTimeout(() => {
            setMessage("")
            setError("")
        },10000)
    }
  return (
    <Helmet className={classes.login} title="Login">
        <h3 className='heading-h3'>Login</h3>
        <hr />
        {message && <Message className="message">{message}</Message>}
        {error && <Error className="error">{error}</Error> }
        <Form onSubmit={submithandler}>
            <Form.Group className="mb-3 font-title" controlId="exampleForm.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className='font-title'/>
            </Form.Group>
            <Form.Group className="mb-3 font-title" controlId="exampleForm.Password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password" 
                    className='font-title'/>
            </Form.Group>
            <Button type='submit' className='mt-3 font-title'>Login</Button>
        </Form>

        <hr />
        <p className={`font-link ${classes['signup-link']}`}>
            <span>Don't have an account</span>
            <Link to="/signup"> Signup here</Link>
        </p>
    </Helmet>
  )
}

export default Login