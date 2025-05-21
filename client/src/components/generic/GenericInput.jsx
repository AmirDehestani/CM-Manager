const GenericInput = ({state, setState}) => {

    const handleInputChange = (event) => {
        setState(event.target.value);
    }

    return <input
        value={state}
        onChange={handleInputChange}
    />
}

export default GenericInput;