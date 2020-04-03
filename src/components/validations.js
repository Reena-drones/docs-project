import React from 'react';
export default function validations({formData, cpass}) {
    console.log("cpass", cpass);
    if(formData.firstname !== "" && formData.lastname !== "" && formData.contact !== "" && formData.email !== "" && formData.password !== "" && cpass !== "")
    {
        let emailregex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailregex.test(formData.email)){
            return {"status": false, "message": "Invalid email Format!!!"}
        }
        console.log(formData.password !== cpass);
        if(formData.password !== cpass){

            return {"status": false, "message": "passwords do not match!!!"}
        }

        return {"status": true, "message": "User Registered successfully. Please sign in.!!"}

    }
    else{
        return {"status": false, "message": "Fields marked with * cannot be blank!!!"}
    }

}



