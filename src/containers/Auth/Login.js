import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import userService from '../../services/userService'; 

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage:''
        }
    }

    
    handleOnChangeInputUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
        console.log(event.target.value);
    }

    handleOnChangeInputPassword = (event) => {
        this.setState({
            password: event.target.value,
        })
        console.log(event.target.value);
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })

    }

    handleLogin = async () => {
        this.setState({
            errMessage:''
        })
        try {
            let data = await userService.handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if (data && data.errCode == 0) {
                
                this.props.userLoginSuccess(data.user);
                console.log('login success');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                    errMessage: error.response.data.message
                    })
                }
            }
            // console.log(error);
            console.log('hoidanit',error.response);
        }
    }
    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User Name:</label>
                            <input type='text' className='form-control' placeholder="Enter your username"
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeInputUsername(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Pass word:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword? 'text' : 'password'} className='form-control' placeholder="Enter your password" value={this.state.password}onChange={(event) => this.handleOnChangeInputPassword(event)}></input>
                                
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                <i class= {this.state.isShowPassword? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                            
                        </div>

                        <div className='col-12' style={{color: 'red'}}> 
                            {this.state.errMessage}
                        </div>


                        <div className='col-12' >
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-center'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook-f       facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);