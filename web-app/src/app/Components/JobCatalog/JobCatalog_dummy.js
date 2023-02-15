import React from "react";

function NameList(){
    const Jobs = ['Software Engineer', 'Data Engineer']
    return (
        <div>
            <h2>{Jobs[0]}</h2>
            <h2>{Jobs[1]}</h2>
        </div>
    )
}
export default NameList;