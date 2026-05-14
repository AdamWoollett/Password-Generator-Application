import React from 'react'
import { useState, useCallback, useRef, useEffect } from 'react'
import usePasswordGenerator from './usePasswordGenerator';


const PasswordGenerator = () => {
    //The states for the password generator functionality
    const [length, setLength] = useState(10);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState('');
    //useRef for copy functionality
    const passwordAsReference = useRef(null);
    //States for UI control
    /*const [listenForButtonClick,setListenForButtonClick] = useState(false);*/
    const [errorVisibility, setErrorVisibility] = useState("invisible bg-red-500 mt-1 p-1 text-center");
    const [passwordStrength, setPasswordStrength] = useState("Weak");
    const [passwordStrengthStyling, setPasswordStrengthStyling] = useState("inline bg-red-500 p-2");

    /*const passwordGenerator = useCallback(() => {
            //Variables controlling what characters are accessible
            let pass = '';
            let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            //Error handling and password strength indicators
            ((numberAllowed === false && characterAllowed === false) ? setErrorVisibility("visible bg-red-500 mt-1 p-1 text-center") : setErrorVisibility("invisible bg-red-500 mt-1 p-1 text-center") );
            if(numberAllowed === false && characterAllowed === false && password.length < 11){setPasswordStrength("Weak");setPasswordStrengthStyling("inline bg-red-500 p-2");}else{};
            if(numberAllowed === true || characterAllowed === true || (password.length >= 11 && password.length < 16)){setPasswordStrength("Intermediate");setPasswordStrengthStyling("inline bg-orange-500 p-2");}else{};
            if(numberAllowed === true && characterAllowed === true || password.length >= 16){setPasswordStrength("Strong");setPasswordStrengthStyling("inline bg-green-500 p-2");}else{};
            /*if(errorVisibility === "visible bg-red-500 mt-1"){return}else{}*/
            //Additional characters to be added to the pool if the user chooses them*/
            /*if (numberAllowed) str += '0123456789';
            if (characterAllowed) str += '!@#$%^&*()_+-=[]{}|;:,.<>?';
            //The random character chooser function
            for (let i = 1; i <= length; i++) {
                let char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char);
            };
            //Set the value for the input box and console log it
            setPassword(pass);
            console.log(pass);
            //Console logs to monitor output password length
            (pass.length >= 6 ? console.log("Password length is >= 6"):console.log("Password length is <= 6"));
            (pass.length <= 20 ? console.log("Password length is <= 20"):console.log("Password length is >= 20"));
            //Dependencies for the useCallback
        }, [length, numberAllowed, characterAllowed, setPassword]);*/
    const callbackedPasswordGenerator = useCallback(()=>{usePasswordGenerator({numberAllowed,characterAllowed,setErrorVisibility,setPasswordStrength,setPasswordStrengthStyling,password,length,setPassword})},[length, numberAllowed, characterAllowed, setPassword]);
    //useEffect ensures the passwordGenerator runs on any UI update
    useEffect(() => { callbackedPasswordGenerator(); }, [length, numberAllowed, characterAllowed, setPassword, setErrorVisibility, errorVisibility]);

    //Function for copying password to clipboard and selecting the text to enhance user experience
    const copyPasswordToClipboard = useCallback(() => {
        passwordAsReference.current?.select();
        window.navigator.clipboard.writeText(password)
    }, [password]);

    //The JSX for the component
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8 mt-8">Super Duper Password Generator</h1>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-10">
                <div>
                    <label className="block text-xl font-bold" htmlFor="password">Generated Password:</label>
                    <input className="m-2 shadow w-100 focus:outline-none focus:shadow-outline p-1" id="password" type="text"
                        placeholder="Your new password will appear here" value={password} readOnly ref={passwordAsReference}></input>
                    <button className="bg-blue-400 hover:bg-blue-500 rounded focus:outline-none focus:shadow-outline p-1 text-center cursor-pointer"
                        type="button" onClick={copyPasswordToClipboard}>Copy Password</button>
                </div>
                <div className="flex">
                    <label className=" block min-w-40" htmlFor="length">Password Length: {length}</label>
                    <input className="shadow focus:outline-none focus:shadow-outline -mb-1" id="length" type="range"
                        min={6} max={20} value={length} onChange={(e) => setLength(e.target.value)}></input>
                </div>
                <div className="flex">
                    <label><input type="checkbox" checked={numberAllowed} onChange={() => { setNumberAllowed(!numberAllowed) }}></input>
                        <span className="m-1">Include Numbers</span>
                    </label>
                </div>
                <div className="flex">
                    <label><input type="checkbox" checked={characterAllowed} onChange={() => setCharacterAllowed(!characterAllowed)}></input>
                        <span className="m-1">Include Special Characters</span>
                    </label>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 font-bold rounded focus:outline-none focus:shadow-outline p-2 text-center cursor-pointer mt-2"
                    type="button" onClick={usePasswordGenerator}>Generate Password</button><p className="inline ml-8">Password strength: </p><p className={passwordStrengthStyling}>{passwordStrength}</p>
                {/*<button className="bg-blue-500 hover:bg-blue-700 font-bold rounded focus:outline-none focus:shadow-outline p-2 text-center cursor-pointer mt-2"
                        type="button" onClick={()=>setListenForButtonClick(!listenForButtonClick)}>Generate Password</button>*/}
                <p className={errorVisibility}>Select at least one of either Numbers or Special Characters for a more secure password</p>
            </div>
        </div>
    )
};

export default PasswordGenerator
