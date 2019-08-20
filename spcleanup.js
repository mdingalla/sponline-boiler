const pnp = require('sp-pnp-js');
const shelljs = require('shelljs');
const PnpNode = require('sp-pnp-node').PnpNode;
var appconfig = require('./config/app.json')
const isTest = appconfig.isTest;
const appdir = appconfig.folder;

const murl = `legal/SiteAssets/${appdir}`

const pnpNode = new PnpNode();

pnpNode.init().then((settings) => {
  console.log(settings.siteUrl);
  const web = new pnp.Web(settings.siteUrl);

  pnp.setup({
    sp: {
      headers: {
        Accept: 'application/json; odata=verbose'
      }
    }
  });

  return web.getFolderByServerRelativeUrl(`${murl}`).files.get().then(files => {
    return files.map((file) => {
      web.getFileByServerRelativeUrl(file.ServerRelativeUrl).delete()
        .then((result) => {
          console.log(result)
        });
    });

    // return web.getFolderByServerRelativeUrl("/PettyCash/SiteAssets/ptcnext/homepage").files.get().then(files => {
    //   return files.map((file) => {
    //     web.getFileByServerRelativeUrl(file.ServerRelativeUrl).delete()
    //       .then((result) => {
    //         console.log(result)
    //       });
    //   });
  }).then(
    //shelljs.exec("gulp watch")
    // web.getFolderByServerRelativeUrl(`${murl}`).folders.get().then(folders => {
    //   folders.map((folder) => {
    //     console.log(folder)
    //   })
    // })
  );




}).catch(console.log);
