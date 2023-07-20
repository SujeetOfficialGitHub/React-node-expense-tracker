import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import Helmet from '../../component/common/Helmet'
import classes from './CreateNewPassword.module.css'
import Message from '../../component/common/Message'
import Error from '../../component/common/Error'
import { useDispatch } from 'react-redux'
import { createNewPassword} from '../../store/features/authSlice'

const CreateNewPassword = () => {
    const {id} = useParams();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submithandler = async(e) => {
        e.preventDefault()
        if (password1 !== password2){
            setError("Password and confirm password not match")
        }else if(password1.trim().length < 5){
            setError("Password must be 5 character long")
        }else{
            try{
                const res = await dispatch(createNewPassword({id, password1})).unwrap()
                if (res && res.message){
                    setMessage(res.message);
                    setPassword1('')
                    setPassword2('')
                    navigate('/');
                }
            }catch(error){
                
                if (error && error.message){
                    setError(error.message);
                }
            }
        }
    } 
    if (error || message){
        setTimeout(() => {
            setMessage("")
            setError("")
        },10000)
    }
  return (
    <Helmet className={classes.forgotPassword} title="Forgot Password">
        <h3 className='heading-h3'>Create New Password</h3>
        <hr />
        {message && <Message className="message">{message}</Message>}
        {error && <Error className="error">{error}</Error> }
        <Form onSubmit={submithandler}>
            <Form.Group className="mb-3 font-title" controlId="exampleForm.Password1">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="Enter new password" 
                    className='font-title'
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3 font-title" controlId="exampleForm.Password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Enter new confirm password" 
                    className='font-title'
                    required
                />
            </Form.Group>
            <Button type='submit' className='mt-3 font-title'>Submit</Button>
        </Form>
    </Helmet>
  )
}

export default CreateNewPassword