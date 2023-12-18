import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './style.css';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Form = () => {
    const [value, setValue] = useState({
        name: '',
        gender: '',
        age: '',
        fees: '',
        slot: ''
    });

    console.log(value);

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!value.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!value.gender.trim()) {
            errors.gender = 'Gender is required';
        }

        const age = parseInt(value.age, 10);
        if (isNaN(age) || age < 18 || age > 65) {
            errors.age = 'Age must be between 18 and 65';
        }

        const fees = parseFloat(value.fees);
        if (isNaN(fees) || fees !== 500) {
            errors.fees = 'Fees must be equal to 500';
        }

        if (value.slot === '' || value.slot === 'Pick a slot') {
            errors.slot = 'Please choose a valid slot';
        }

        return errors;
    };

    const CompletePayment = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const register = await axios.post('https://mernback-s0ce.onrender.com/register', value);
            console.log(register.data);
            toast.success('Payment Successfull !!', {
                position: toast.POSITION.TOP_CENTER,

            });
            window.location.reload();
        }
        else {
            Object.keys(errors).forEach(field => {
                toast.error(errors[field], {
                    position: toast.POSITION.TOP_CENTER,
                });
            });
        }



    }
    return (
        <>
            <ToastContainer
                style={{ width: "500px" }} />
            <div className='container'>

                <form onSubmit={CompletePayment}>
                    <h1>Welcome to Yoga classes</h1>
                    <div className='sub'>
                        <label className='field'>Name</label><br /><input placeholder='Enter your Name' value={value.name} onChange={handleChange} name='name'></input><br />
                        <label className='field'>Gender</label><br /><input placeholder='Enter your Gender' value={value.gender} onChange={handleChange} name='gender'></input><br />
                        <label className='field'>Age</label><br /><input placeholder='Enter your Age' value={value.age} onChange={handleChange} name='age'></input><br />
                        <label className='field'>Fees</label><br /><input placeholder='Enter Fees' value={value.fees} onChange={handleChange} name='fees'></input><br />

                        <label className='field'>Choose your slot</label><br />
                        <select name="slot" value={value.slot} onChange={handleChange}>
                            <option className="option1">Pick a slot</option>
                            <option>6-7 AM</option>
                            <option>7-8 AM</option>
                            <option>8-9 AM</option>
                            <option>5-6 PM</option>
                        </select>
                    </div>

                    <button type='submit'>Submit</button>

                </form>

            </div>
        </>
    )
}

export default Form