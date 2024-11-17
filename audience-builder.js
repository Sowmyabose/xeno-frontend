import axios from 'axios';
import { useState } from 'react';

export default function AudienceBuilder() {
    const [conditions, setConditions] = useState([]);
    const [audienceSize, setAudienceSize] = useState(0);

    const addCondition = () => {
        setConditions([...conditions, { field: '', operator: '', value: '' }]);
    };

    const calculateSize = async () => {
        const response = await axios.post('/api/segments/calculate', { conditions });
        setAudienceSize(response.data.size);
    };

    return (
        <div>
            <h1>Audience Builder</h1>
            {conditions.map((condition, index) => (
                <div key={index}>
                    <input placeholder="Field" />
                    <input placeholder="Operator" />
                    <input placeholder="Value" />
                </div>
            ))}
            <button onClick={addCondition}>Add Condition</button>
            <button onClick={calculateSize}>Calculate Size</button>
            <p>Audience Size: {audienceSize}</p>
        </div>
    );
}
