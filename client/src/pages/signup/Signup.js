import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Helmet from '../../component/common/Helmet'
import classes from './Signup.module.css'
import Message from '../../component/common/Message'
import Error from '../../component/common/Error'
import { useDispatch } from 'react-redux'
import { signup } from '../../store/features/authSlice'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();

    const submithandler = async(e) => {
        e.preventDefault()
        if (password === cPassword){
            const enteredData = {email, password}
            await dispatch(signup({enteredData}))
            console.log(email, password)
            
        }else{
            setError("Password and confirmed password doesn't match")
        }
    } 
  return (
    <Helmet className={classes.signup} title="Signup">
        <h3 className='heading-h3'>Sign Up</h3>
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
            <Form.Group className="mb-3 font-title" controlId="exampleForm.CPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    placeholder="Enter confirm password" 
                    className='font-title'/>
            </Form.Group>
            <Button type='submit' className='mt-3 font-title'>Signup</Button>
        </Form>

        <hr />
        <p className={`font-link ${classes['login-link']}`}>
            <span>Already have an account</span>
            <Link to="#login"> Login here</Link>
        </p>
    </Helmet>
  )
}

export default Signup