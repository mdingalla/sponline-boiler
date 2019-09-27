import * as React from 'react';

interface ErrorPanelProps {
    errors:any[];
}

const ErrorPanel:React.SFC<ErrorPanelProps> = (props) => {
    const errorPanel = props.errors.length > 0 ? <div className="alert alert-danger" role="alert">
        <ul className="list-styled">
    {props.errors.map((error,i)=>{
           return <li key={i}>{error.message}</li>
    })}</ul></div> : null;

    return <div>
        {errorPanel}
    </div>
}

export default ErrorPanel;