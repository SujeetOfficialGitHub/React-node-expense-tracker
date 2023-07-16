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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();

    const submithandler = async(e) => {
        e.preventDefault()
        if (password === cPassword){
            const enteredData = {name, email, password}
            try{
                const res = await dispatch(signup({enteredData})).unwrap()
                if (res && res.message){
                    setMessage(res.message)
                }
                setName('')
                setEmail('')
            }catch(error){
                if (error && error.message){
                    setError(error.message)
                }
            }
            
        }else{
            setError("Password and confirmed password doesn't match")
        }
        setPassword('')
        setCPassword('')
    } 
    if (error || message){
        setTimeout(() => {
            setMessage("")
            setError("")
        },10000)
    }
  return (
    <Helmet className={classes.signup} title="Signup">
        <h3 className='heading-h3'>Sign Up</h3>
        <hr />
        {message && <Message className="message">{message}</Message>}
        {error && <Error className="error">{error}</Error> }
        <Form onSubmit={submithandler}>
            <Form.Group className="mb-3 font-title" controlId="exampleForm.Name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    className='font-title'/>
            </Form.Group>
            <Form.Group className="mb-3 font-title" controlId="exampleForm.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text" 
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