import { useState } from "react";
import TextBox from "./textbox.js";
import Result from "./result.js";
import "./App.css"
export default function Main(){
    const [result, setResult] = useState("init"); // state to hold result
    return (
        <>
            <title>What's That Zip Code?</title>
            <h1>Enter Zip Code: </h1>
            <TextBox setResult={setResult}/>
            <Result zipcode={result} />
        </>
    );
}