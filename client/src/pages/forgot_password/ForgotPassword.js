import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import Helmet from '../../component/common/Helmet'
import classes from './ForgotPassword.module.css'
import Message from '../../component/common/Message'
import Error from '../../component/common/Error'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../store/features/authSlice'


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();

    const submithandler = async(e) => {
        e.preventDefault()
            try{
                const res = await dispatch(forgotPassword({email})).unwrap()
                if (res && res.message){
                    setMessage(res.message);
                }
                setEmail('');
            }catch(error){
                
                if (error && error.message){
                    setError(error.message);
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
        <h3 className='heading-h3'>Forgot Password</h3>
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
                    placeholder="Enter your registered email" 
                    className='font-title'/>
            </Form.Group>
            <Button type='submit' className='mt-3 font-title'>Send Mail</Button>
        </Form>
    </Helmet>
  )
}

export default ForgotPassword