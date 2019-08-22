import { ITermStore, taxonomy } from "@pnp/sp-taxonomy";

taxonomy.setup({
    sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl:"https://interplexgroup.sharepoint.com/sites/Region/Corp/legal"
      }
})


  const store: ITermStore = taxonomy.termStores.getByName("Taxonomy_+fbatXz7iODpxN/jrdHNtA==");
  const group =  store.getTermGroupById("30de891f-4b97-45ef-b143-95a6e3a75c0e");

  class SPOnlineTermStore {
      static GetDepartment(){
          return group.termSets.getById("8ed8c9ea-7052-4c1d-a4d7-b9c10bffea6f").terms.get();
      }
  }

  export default SPOnlineTermStore;