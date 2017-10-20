import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { login } from '../../redux/reducer';
import classNames from 'classnames';
import validator from 'validator';
import Popup from 'react-popup';

class RegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: {value: '', isValid: true, message: ''},
      password: {value: '', isValid: true, message: ''},
      confirmPassword: {value: '', isValid: true, message: ''},
      fullName: '',
      companyName: '',
      valid: true,
      dataReset:true
    };
  }

  validateEmail (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  setInitialState(){
    this.setState({
      email: {value: '', isValid: true, message: ''},
      password: {value: '', isValid: true, message: ''},
      confirmPassword: {value: '', isValid: true, message: ''},
      fullName: '',
      companyName: '',
      valid: true,
      dataReset:false,
      loginError:true
    })
  }

  handleEmailChange(e) {
      const email = e.target.value
      const emailValid = this.validateEmail(email) 

      this.setState({
        email: e.target.value,
        valid: emailValid
      })
  }
  
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  onChange = (e) => {
      var state = this.state;
      if(e.target.name === "fullName" || e.target.name === "companyName") {
        state[e.target.name] = e.target.value;
      } else {
      state[e.target.name].value = e.target.value;
      }
      if(e.target.name === "password" && e.target.value.length < 5) {
        state.password.message = 'Password is too short';
      } else {
        state.password.message = "";
      }
      if(e.target.name === "confirmPassword") {
        if(e.target.form[3].value != state[e.target.name].value) {
        state.confirmPassword.message = 'Passwords does not match';
        } else if(e.target.form[3].value === state[e.target.name].value && e.target.form[3].value.length < 5) {
          state.confirmPassword.message = '';
          state.password.message = 'Password is too short';
        } else {
          state.confirmPassword.message = "";
        }
      }
      this.setState(state);
  }   

    onSubmit = (e) => {
        e.preventDefault();
        let { email, password, companyName } = this.state;
        this.resetValidationStates(); //reset states before the validation procedure is run.
        if (this.formIsValid()) { //run the validation, and if it's good move on.
        this.props.login(email, password, companyName);
        this.setState({
          dataReset:true,
          loginError:true
        });
        }
      }

      formIsValid = () => {
        var state = this.state;
        if (!validator.isEmail(state.email.value)) {
          state.email.isValid = false;
          state.email.message = 'Not a valid email address';
          this.setState(state);
          return false;
        }
        if(state.password.value !== state.confirmPassword.value) {
          state.password.isValid = false;
          state.confirmPassword.message = 'passwords does not match';
          this.setState(state);
          return false;
        }
        return true;
      }

      resetValidationStates = () => {
        var state = this.state;

        Object.keys(state).map(key => {
          if (state[key].hasOwnProperty('isValid')) {
            state[key].isValid = true;
            state[key].message = '';
          }
        });
        this.setState(state);
      }

  render() {
    let { email, password, confirmPassword} = this.state;
    let emailGroupClass = classNames('form-group', {'has-error': !email.isValid});
    let passwordGroupClass = classNames('form-group', {'has-error': !password.isValid});
    let confirmGroupClass = classNames('form-group', {'has-error': !confirmPassword.isValid});

    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    let fieldContainerClass = 'field-container'
    if(loginError && this.state.loginError){
      Popup.alert(loginError)
      this.setState({loginError:false})
    }
    if(isLoginSuccess && this.state.dataReset){
      Popup.alert(isLoginSuccess)
      this.setInitialState();
    }
    
    return (
      <div className="container">
        <div className="left-view">
          <h1 className="master-title">
            Hola
          </h1>
        </div>
        <div className="right-view">
          <div className="mini-header">
            <p className="text">Already have an account?</p>
            <button className="login-btn">
              <span>Login</span>
            </button>
          </div>
          <div className="form-holder">
            <h2 className="title">Get Started Today!</h2>
            <h3 className="subtitle">Tell us about yourself and join the Jingle family</h3>
            <form className="register-form" onSubmit={this.onSubmit}>
              <section className={emailGroupClass}>
                <input className="form-field" name="email" type="text" placeholder="Email" value={email.value} onChange={this.onChange} />
                <span className="help-block">{email.message}</span>
              </section>
              <section>
                <input className="form-field" name="fullName" type="text" placeholder="Full name" value={this.state.fullName} onChange={this.onChange}/>
              </section>
              <section>
                <input className="form-field" name="companyName" type="text" placeholder="Company name" value={this.state.companyName} onChange={this.onChange}/>
              </section>
              <section className={passwordGroupClass}>
                <input className="form-field" name="password" type="password" placeholder="Password" value={password.value} onChange={this.onChange} />
               <span className="help-block">{password.message}</span>
              </section>
              <section className={confirmGroupClass}>
                <input className="form-field" name="confirmPassword" type="password" placeholder="Confirm password" value={confirmPassword.value} onChange={this.onChange} />
                <span className="help-block">{confirmPassword.message}</span>
              </section>
              <hr />
              <button className="register-btn" onClick={this.onSubmit}>
                <span>Register</span>
              </button>
              {isLoginPending && <div>please wait..</div>}
              <div>
                <Popup
                  className="mm-popup"
                  btnClass="mm-popup__btn"
                  closeBtn={true}
                  closeHtml={null}
                  defaultOk="Ok"
                  defaultCancel="Cancel"
                  wildClasses={false}
                  closeOnOutsideClick={true} />
              </div>
            </form>
            <p className="agree">By creating an account you are agreeing to our Terms and Conditions, and our Privacy Policy.</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, companyName) => dispatch(login(email, password, companyName))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
