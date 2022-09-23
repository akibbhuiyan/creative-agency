import React from 'react';
import './Footer.css';
import { useForm } from "react-hook-form";
const Footer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className="footerbg pt-5" id='contact'>
            <div className='container pt-5 pb-3'>
                <div className="row">
                    <div className="col-md-6">
                        <h1 className='mb-3'>Let us handle your project, professionally.</h1>
                        <p>With well written codes, we build amazing apps for all platforms, mobile and web apps in general.</p>
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(onSubmit)} className='contact-form'>
                            <input {...register("email", { required: true })} placeholder='Your email Address' />
                            {errors.email && <span>This field is required</span>}
                            <input {...register("nameOrCompanyName")} placeholder="Your Name/Company's Name" />
                            <textarea {...register("message", { required: true })} placeholder='Your Message' rows='10' />
                            {errors.message && <span>This field is required</span>}

                            <button type="submit" className='btn btn-dark px-5'>Send</button>
                        </form>
                    </div>
                </div>
                <p className='text-center mt-5'>copyright@akib ||All right Reserved 2022</p>
            </div>
        </div>
    );
};

export default Footer;