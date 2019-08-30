import {sp} from '@pnp/sp'

sp.setup({
    sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl:"https://interplexgroup.sharepoint.com/sites/Region/Corp/legal"
      }
})

const CONTRACTS = "Documents";
const CLASSIFICATION = "Classification";

const myWeb = sp.web;

class LegalWebApi {
    static UploadDocument(file: File, mfilename){
        if (file.size <= 10485760) {
            return myWeb
              .getFolderByServerRelativeUrl(CONTRACTS)
              .files.add(mfilename, file, true);
          } else {
            return myWeb
              .getFolderByServerRelativeUrl(CONTRACTS)
              .files.addChunked(mfilename, file);
          }
    }

    static GetClassificationByKeyValue(keyvalue){
      return myWeb.lists.getByTitle(CLASSIFICATION)
        .items.filter(`KeyValue eq '${keyvalue}'`)
        .get();
    }
}

export default LegalWebApi;