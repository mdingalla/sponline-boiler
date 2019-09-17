

declare interface ContractSummaryData {
    Id:number;
    IPXEntityName:string;
    ContractCategoryName:string;
    Classification:string;
    ContractType:string;
    EffectiveDate?:string;
    ExpiryDate?:string;
    Function?:string
}


declare interface RelatedDocs {
    Id:number;
    isParent:boolean;
}