import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../redux/actions/authAction';

const Register = () => {
    const { alert ,auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useNavigate();

    const initialState = { 
        fullname: '', email: '', mobile: '', password: ''
    };
    const [userData, setUserData] = useState(initialState);
    const { fullname, email, mobile, password } = userData;

    const [typePass, setTypePass] = useState(false);

   

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(register(userData));
    };
    useEffect(() => {
        if(auth.token) history("/")
    }, [auth.token, history])


    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Register</h3>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" name="fullname"
                    onChange={handleChangeInput} value={fullname}
                    style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    onChange={handleChangeInput} value={email}
                    style={{background: `${alert.email ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input type="text" className="form-control" id="mobile" name="mobile"
                    onChange={handleChangeInput} value={mobile}
                    style={{background: `${alert.mobile ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.mobile ? alert.mobile : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password"
                        style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>
                
                <button type="submit" className="btn btn-dark w-100">
                    Register
                </button>

                <p className="my-2">
                    Already have an account? <Link to="/login" style={{color: "crimson"}}>Login Now</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
