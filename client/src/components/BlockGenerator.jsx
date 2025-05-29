import {useState} from 'react';
import BlockSelect from './BlockSelect';

const BlockGenerator = () => {
    const [selectedBlocks, setSelectedBlocks] = useState([]);
    const [blockCount, setBlockCount] = useState(1);

    const handleIncreaseBlocks = () => {
        setBlockCount(prevCount => prevCount+1);
    }

    const handleDecreaseBlocks = () => {
        setBlockCount(prevCount => prevCount-1);
    }

    return (
        <div className='block-generator'>
            <div className='flex-row'>
                <button onClick={handleIncreaseBlocks}>+</button>
                <button onClick={handleDecreaseBlocks}>-</button>
            </div>
            <div className='flex-col'>
                {Array.from({ length: blockCount }, (_, index) => (
                    <BlockSelect key={index}/>
                ))}
            </div>
        </div>
    )
}

export default BlockGenerator;