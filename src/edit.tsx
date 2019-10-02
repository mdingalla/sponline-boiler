require("./polyfill");
import * as React from "react";
import * as ReactDOM from "react-dom";
import MyUtility from "./utility";
import { editPagePath } from "./constants/config";


class EditPage extends React.Component<any,any>{
    constructor(props){
        super(props);

        const urlParams = MyUtility.UrlSearchParamProxy(window.location.search);

        const pRedirect = urlParams ? urlParams("redirect") : null;
        const ID = urlParams ? urlParams("ID") : null;

        if(!pRedirect && ID)
        {
            window.location.href = `${editPagePath}${ID}`
        }
    }

    componentDidMount(){
        console.log('edit page')
       
  
    }

    render(){
        return <div>

        </div>
    }
}

setTimeout(() => {
   ReactDOM.render(
       <EditPage />,
       document.getElementById('editroot')
   )
  }, 500);