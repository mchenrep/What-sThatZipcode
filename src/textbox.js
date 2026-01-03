export default function TextBox({setResult}){
    // submit handler to change zipcode state
    function handleSubmit(e){
        e.preventDefault(); 
        const form = new FormData(e.currentTarget)
        const zip = form.get("zipcode");
        setResult(`${zip}`);
        e.currentTarget.reset(); // reset text field  
    }
    
    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="zipcode"
                    pattern="[0-9]{5}"
                />
            </form>
        </>
    );
}