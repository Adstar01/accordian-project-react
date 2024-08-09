import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {

    const [selected, setSelected] = useState(null);
    const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultipleSelection(getCurrentId) {
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
        if(findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
        else copyMultiple.splice(findIndexOfCurrentId,1);

        setMultiple(copyMultiple);
    }

    return <div className="wrapper">
        <button onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}>
            Enable Multi Selection</button>
        <div className="accordian">
            {
                data && data.length > 0 ?
                    data.map(dataItem => <div className="item">
                        <div onClick={
                            enableMultipleSelection 
                            ? () => handleMultipleSelection(dataItem.id) 
                            : () => handleSingleSelection(dataItem.id) } className="title">
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                        </div>
                        {
                            enableMultipleSelection ? 
                            multiple.indexOf(dataItem.id) !== -1 && 
                            <div className="content">{dataItem.answer}</div> :
                            selected === dataItem.id && <div className="content">{dataItem.answer}</div>
                        }
                    </div>)
                    : <div>No data found !</div>
            }
        </div>
    </div>
}
