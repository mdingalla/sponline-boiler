import * as React from "react";

export namespace SharePointModalDialog {
  export interface Props {
    message?:string;
  }
}

class SharePointModalDialog extends React.Component<
  SharePointModalDialog.Props,
  any
> {
  loader: any;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
      this.loader = SP.UI.ModalDialog.showWaitScreenWithNoClose(
       this.props.message ||  "Saving...",
        "Please wait while request is in progress..."
      );
    });
  }

  componentWillUnmount() {
    if (this.loader) {
      this.loader.close();
    }
  }

  render() {
    return (
      <div>
        <div />
      </div>
    );
  }
}

export default SharePointModalDialog;
