import { useState } from "react";
import { useCallback } from "react";

const usePasswordGenerator = ({numberAllowed,characterAllowed,setErrorVisibility,setPasswordStrength,setPasswordStrengthStyling,password,length,setPassword}) => {
            //Variables controlling what characters are accessible
            let pass = '';
            let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            //Error handling and password strength indicators
            ((numberAllowed === false && characterAllowed === false) ? setErrorVisibility("visible bg-red-500 mt-1 p-1 text-center") : setErrorVisibility("invisible bg-red-500 mt-1 p-1 text-center"))
            if (numberAllowed === false && characterAllowed === false && password.length < 11) { setPasswordStrength("Weak"); setPasswordStrengthStyling("inline bg-red-500 p-2"); } else { };
            if (numberAllowed === true || characterAllowed === true || (password.length >= 11 && password.length < 16)) { setPasswordStrength("Intermediate"); setPasswordStrengthStyling("inline bg-orange-500 p-2"); } else { };
            if (numberAllowed === true && characterAllowed === true || password.length >= 16) { setPasswordStrength("Strong"); setPasswordStrengthStyling("inline bg-green-500 p-2"); } else { };
            /*if(errorVisibility === "visible bg-red-500 mt-1"){return}else{}*/
            //Additional characters to be added to the pool if the user chooses them
            if (numberAllowed) str += '0123456789';
            if (characterAllowed) str += '!@#$%^&*()_+-=[]{}|;:,.<>?';
            //The random character chooser function
            for (let i = 1; i <= length; i++) {
                let char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char);
            }
            //Set the value for the input box and console log it
            setPassword(pass);
            console.log(pass);
            //Console logs to monitor output password length
            (pass.length >= 6 ? console.log("Password length is >= 6") : console.log("Password length is <= 6"));
            (pass.length <= 20 ? console.log("Password length is <= 20") : console.log("Password length is >= 20"));
            //Dependencies for the useCallback
            return{pass};
    };

    export default usePasswordGenerator
