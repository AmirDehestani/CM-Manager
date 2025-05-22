const GenericInput = ({state, setState, placeholder=""}) => {

    const handleInputChange = (event) => {
        setState(event.target.value);
    }

    return <input className="input-component"
        value={state}
        placeholder={placeholder}
        onChange={handleInputChange}
    />
}

export default GenericInput;