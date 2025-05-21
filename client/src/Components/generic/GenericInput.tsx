import { type Dispatch, type SetStateAction } from "react";

interface genericInputProps {
    state: string,
    setState: Dispatch<SetStateAction<string>>
}

const GenericInput = ({state, setState} : genericInputProps) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    }

    return <input
        value={state}
        onChange={handleInputChange}
    />
}

export default GenericInput;