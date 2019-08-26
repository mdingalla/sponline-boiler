import * as React from 'react';
// import * as Dropzone  from 'react-dropzone';
import classNames from 'classnames';
var Dropzone = require('react-dropzone')
import * as style from './style.css';

export namespace FileUploads {
    export interface Props {
        files:any[];
        onChange:(e:any[])=>void;
        textmessage:string;
    }

    export interface State {
        upFiles:any[];
    }
}

class FileUploads extends React.Component<FileUploads.Props,FileUploads.State> {
    constructor(props){
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.state = {
            upFiles:this.props.files.length > 0 ? this.props.files : []
        }

    }

    componentWillReceiveProps(nextProps:FileUploads.Props){
        if(nextProps != this.props)
        {
            this.setState({
                upFiles:nextProps.files
            })
        }
    }

    handleAdd(files) {
        let newState = this.state.upFiles.concat(files[0] || {});
        
        this.setState({
            upFiles:newState
        },()=>this.props.onChange(newState))
       
    }

    handleRemove(e){
        if(this.state.upFiles.length <= 0) return;
        let newState = this.state.upFiles.splice(e,1)
        this.setState({
            upFiles:this.state.upFiles
        },()=>this.props.onChange(this.state.upFiles))
        
    }

    onDrop(files) {
        
        let newState = this.state.upFiles.concat(files|| {});
        
        this.setState({
            upFiles:newState
        },()=>this.props.onChange(newState))
      }
    

    // handleChange(mfiles){
        
    //     let newFiles = this.state.upFiles;
    //     newFiles[indx] = mfiles[0] || null;
    //     // this.props.onChange(newFiles);
    //     this.setState({
    //         upFiles:newFiles
    //     },()=>this.props.onChange(newFiles))
    // }

    render(){

        const upFiles = this.props.files && this.props.files.length > 0 ?  
        <div className="col-md-6">
            <h4>For Upload</h4>
                <ul className="list-group">
                {this.state.upFiles.map((file,idx)=>{
                    return <li key={idx} className="list-group-item">
                    <button type="button" className="close" onClick={()=>{this.handleRemove(idx)}}
                    aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <a href="#">{file.name || ""}</a>
                        {/* <button type="button" onClick={()=>{this.handleRemove(idx)}}
                        className="btn btn-success">Remove</button> */}
                    </li>
                })}
                </ul>
        </div> : null;
        return <div className="row-fluid">
            <div className="col-md-6">
                <div className={classNames(style.filedropzone,"dropzone")} >
                    <Dropzone
                    onDrop={this.onDrop.bind(this)}>
                        <p>{this.props.textmessage}</p>
                        </Dropzone>
                </div>
            </div>
           {upFiles}
            {/* <input type="file" 
                     onChange={(e)=>{this.handleAdd(e.target.files);e.target.value=null}} /> */}
            {/* <button type="button"
            onClick={this.handleAdd}
             className="btn btn-success">Add</button> */}
            
        </div>
    }
}

export default FileUploads;