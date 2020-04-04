import React from "react";
import {compose, withHandlers ,withState} from "recompose";
import '../static/modal.css'
const InitialFormData =
    {"username":"",
    "email":"",
    "password":""
};
export default compose(
    withState('confirmPassword', 'setConfirmPassword', ''),
    withState('passwordError', 'setPasswordError', ''),
    withState('message', 'setMessage', ''),
    withState('formData', 'setFormData', InitialFormData),
    withHandlers({
        validateForm : ({formData}) =>()=>{
            Object.keys(formData).map((fieldName)=>{
                if (formData[fieldName] === "")
                    return false
            });
            return true
        }
    }),
    withHandlers({
        updateFormData:({formData, setFormData}) =>(event)=>{
            formData[event.target.name] = event.target.value;
            setFormData(formData)
        },

        changeConfirmPassword: ({setConfirmPassword, formData, setPasswordError}) =>(event)=> {
            event.preventDefault();
            setConfirmPassword(event.target.value);
            if (formData["password"] !== event.target.value)
                setPasswordError("Passwords do not match");

            else
                setPasswordError("")
        },
        goToLogin:({history})=>()=>{
            history.push('/login');
        },
        onSubmitForm:({formData, setMessage, validateForm, history})=> (event)=>{
            event.preventDefault();
            if (!validateForm){
                setMessage("All field are required")
            }
            fetch('http://localhost:8000/signUp',
                {method:'POST',
                    body: JSON.stringify(formData),
                    headers:{'Content-Type':'application/json',
                        'Accept': 'application/json'}})
                .then((response) => {
                    if(response.status !== 200){
                        setMessage("Unable to register. Please try after some time")
                    }
                    response.json()
                        .then((data) => {
                            console.log(data)
                            if(data.status === 200) {
                                setMessage("");
                                localStorage.setItem('id', data.email);
                                history.push('/profile');
                            }
                            else{
                                setMessage(data["message"])
                            }
                        })
                })
            }
    })
)(function Register({updateFormData,
    confirmPassword,
    changeConfirmPassword,
    passwordError,
    register,
    formData,
    onSubmitForm,
    goToLogin,
    message})
        {return (
        <div>
            <h1>Please Sign Up</h1>
            {message !== "" && <span style={{"color":"red"}}>{message}</span>}
            <form className="form-signup">
                {Object.keys(formData).map((fieldName) => (
                    <div className="modalInputBox">
                        <input type={fieldName==="password"?"password":"text"} name={fieldName} minLength="1" placeholder={fieldName}
                           value={formData[fieldName]} onChange={updateFormData}/>
                    </div>
                    ))}
            <div className="modalInputBox">
                <input type="password" name="cpassword" placeholder="Confirm Password*"
                       value={confirmPassword} onChange={changeConfirmPassword}/>
            </div>
            {passwordError !== "" && <span style={{"color":"red"}}>{passwordError}</span>}
            <div className="modalInputBox">
                <button className="btn btn-lg btn-primary btn-block" type="button" disabled={Boolean(passwordError)} onClick={onSubmitForm}>
                    SignUp
                </button>
            </div>
            </form>
            Already a User?<span onClick={goToLogin}>SignIn</span>
        </div>
    )
})