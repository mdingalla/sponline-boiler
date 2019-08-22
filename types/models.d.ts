import { ReactSelectProps } from "../node_modules/@types/react-select";
import { IPersonaProps } from "../node_modules/office-ui-fabric-react/lib-es2015/Persona";
import { IPersona } from "office-ui-fabric-react/lib/Persona";

/** TodoMVC model definitions **/
declare interface AppConfig {
  IsProduction?: boolean;
  RequireBank?: boolean;
  AllowProjectCharge?: boolean;
}

declare interface TodoItemData {
  id?: TodoItemId;
  text?: string;
  completed?: boolean;
}

declare type VendorStoreState = {
  alphabets: string[];
};

declare type TodoItemId = number;

declare type TodoFilterType = "SHOW_ALL" | "SHOW_ACTIVE" | "SHOW_COMPLETED";

declare type TodoStoreState = TodoItemData[];

declare interface StaffMaster {
  Id: number;
}

declare interface SPUser {
  Id: number;
  LoginName: string;
  Email: string;
}

declare interface SharePointSPSUser extends SPUser {
  // Email:string,Id:number,Title:string,LoginName:string;
  Title: string;
  Groups: SPRestResult;
}

declare interface AppProfile {
  User: SharePointSPSUser;
  Staff: StaffMaster;
  Plant?: any;
}

declare interface SharePointRestResult {
  results: StaffMasterADData[];
  __next?: string;
}

declare interface SPRestResult {
  results: SPItem[];
}

declare interface SPItem {
  Id: number;
  Title: string;
}

declare interface StaffMasterADData {
  Id: any;
  Status: string;
  User?: string;
  WindowsID?: any;
}

declare interface APPSearchResultData {
  Id: number;
  Title: string;
  ClickLink: string;
  App: string;
}

declare interface UserSearchResult {
  spdata?: any;
  staffmasterdata?: any;
  searching: boolean;
}

declare interface GLItem {
  Amount: number;
  GLAccount: string;
  ClaimType: string;
  BusinessArea: string;
  Department: string;
  CostCentre: string;
  Title: string;
  Curr: string;
  EmpNo: string;
  PayTo: string;
  DteExpenseDate: Date;
  Method: string;
  ExpenseCategory?: string;
  Employee?: string;
  // NewDate?:Date;
}

declare interface SPGLItem {
  Title: string;
  Amount: number;
  CompanyCode: string;
  DocType: string;
  PostDate?: any;
  DocDate: string;
  Curr: string;
  Reference: string;
  DocHeaderText: string;
  GLAccount: string;
  PostKey: number;
  TaxCode: string;
  Assignment: string;
  CostCentre: string;
  BusinessArea: string;
  ItemText: string;
  EmpNo: string;
  EmpName:string;
  PayTo: string;
  Method: string;
  ClaimType: ClaimType;
  SubmitDate: string; // "2016-06-15",
  ExpenseDate: string; // "27/5/2016",
  Department: string;
  Categories: string; //"INDIRECT",
  MCreason: string;
  MCclinic: string;
  TravelPeriodFrom: string;
  TravelPeriodTo: string;
  TRdestination: string;
  TRcountry: string;
  TRinfo: string;
  TRpurpose: string;
  TypeOfExpense: string;
  TransactedAmount: string;
  Forex: string;
  PTCNextRefId: number;
  FinancePersonId: number;
  FinanceApprovedDate: Date;
  GMPersonId: number;
  ExchangeRate:number;
  ClaimCurrency:string;
  AutoRank?:number;
  KnownAsPayTo?:string;
}

declare interface CERReportItems {
  cerData: any[];
  plants?: any[];
  assetcategories?: any[];
  cerstatus?: any[];
  selectedAssetCategory?: string;
  selectedPlant?: string;
  selectedStatus?: string;
  querying: boolean;
}

declare interface CERRptItem {
  Title: string;
  Plant: string;
  Project: string;
  Description: string;
  TotalAmount: string;
  Qty: number;
  AssetCategory: string;
  Modified: string;
  CERStatus: string;
  AssetNumber: string;
  PONumber: string;
  CostCenter: string;
}

declare interface CERRecord {
  id?: number;
  plant?: ReactSelectValue;
  planttitle?: string;
  deptcostcentre?: ReactSelectValue;
  assetlocation?: string;
  projectname?: string;
  purposereason?: string;
  items?: CERAssetItem[];
  quotations?: CERQuotation[];
  machinedetails?: MachineDetails;
  requestor: IPersonaProps[];
  approvers?: CERApprover[];
  budget?: number;
  expended?: number;
  wflowstatus?: WFlowStatus;
  Title?: string;
  wflowmessage?: any;
  assignedToId?: any;
  allowEdit?: boolean;
}

declare type WFlowStatus =
  | "DRAFT"
  | "NEW"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELED"
  | "WITHDRAW";

declare type CERApproverType =
  | "HOD"
  | "FINANCE"
  | "GM"
  | "RCOO"
  | "FUNCHEADCFO"
  | "CORP";
declare interface CERApprover {
  spId?: number;
  cerid?: number;
  approvertype: CERApproverType;
  approver: IPersonaProps[];
  approvedate?: Date;
  id: number;
}

declare interface CERAssetItem {
  spId?: number;
  id: number;
  assetcategory: ReactSelectValue;
  description: string;
  qty: number;
  currency: string;
  unitprice: number;
  exchangerate: number;
  totalamount: number;
}

declare interface CERQuotation {
  spId?: number;
  id: number;
  vendorname: string;
  vendorquote: string;
  files: any[];
  forUpload: any[];
  justification: string;
}

declare interface MachineDetails {
  assetlife: number;
  vendorname: string;
  deliverydate?: Date;
  installdate?: Date;
  paymentterms: string;
}

declare interface ReactSelectValue {
  value: string;
  label: string;
}

declare interface DashboardModel {
  cers: CERSummary[];
  mycers: CERSummary[];
  approvals: CERSummary[];
}

declare interface CERSummary {
  Title: string;
  Ref: string;
  Id: number;
  Status: string;
  WorkflowStatus: string;
}

declare type ClaimType =
  | "Corp Credit Card"
  | "Entertainment"
  | "Medical"
  | "Others"
  | "Transportation"
  | "Travel Claim"
  | "Hand Phone";

declare interface PettyCashView {
  pettycash: PettyCashModel;
  claimTypes: ClaimType[];
  staffRequestor: any;
}

declare interface PTCWorkflowApprover {
  Id: number;
  spId?: number;
  Role: string;
  ApprovedOn?: Date;
  User: SharePointSPSUser;
  SortOrder: number;
}

declare interface CashAdvanceWorkflowApprover {
  Id: number;
  spId?: number;
  Role: string;
  ApprovedOn?: Date;
  User: any;
  SortOrder: number;
}

declare interface PettyCashModel extends SPItem {
  plant?: ReactSelectValue;
  planttitle?: string;
  plantcode?: string;
  deptcostcentre?: ReactSelectValue;
  projectcode?:ReactSelectValue;
  costcenter?: string;
  dept?: string;
  requestor?: IPersonaProps[];
  claimType?: ClaimType;
  trcode?: ReactSelectValue;
  items?: any[];
  trdetails?: TRDetailItem[];
  approvers?: PTCWorkflowApprover[];
  wflowstatus?: WFlowStatus;
  isworkflow?: boolean;
  wflowmessage?: any;
  files?: any[];
  upfiles?: any[];
  claimCurrency?: string;
  errors?: any[];
  issaving: boolean;
  requireBank?: boolean;
  bankRef?: number;
  IsCostCenterCharged: boolean;
  isMassUpload?:boolean
}

declare interface TRDetailItem {
  DateFrom: string;
  DateTo: string;
  Destination: string;
  Country: string;
  Purpose: string;
  NoOfDays: number;
  Allowance: number;
}

declare interface PTCItem {
  id: number;
  spId?: number;
  dateFrom: Date;
  dateTo: Date;
  category: string;
  expenseType: string;
  gldesc:string;
  remarks: string;
  paymentMode: string;
  currency: string;
  exchangeRate: number;
  transactamount: number;
  taxlocal: number;
  totaltransactamount?: number;
  claimcurrency: string;
  handPhone?:HandPhonePTCItem;
  payToId?:number;
}

declare interface CorpCreditPTCItem extends PTCItem {
  CCTRCode: string;
}

declare interface MedicalPTCItem extends PTCItem {
  Clinic: string;
  MedicalReason: string;
}

declare interface EntertainmentPTCItem extends PTCItem {
  NoGuest?: string;
  NoStaff?: string;
  EntertainmentLocation: string;
}

declare interface TranspoPTCItem extends PTCItem {
  Origin: string;
  Destination: string;
  Country: string;
  Mileage?: string;
}

declare interface LocalizedData {
  Locale: string;
  Data: any[];
}

declare interface CashAdvanceRequest {
  Id?: number;
  plant?: ReactSelectValue;
  planttitle?: string;
  plantcode?: string;
  deptcostcentre?: ReactSelectValue;
  costcenter?: string;
  dept?: string;
  requestor: IPersonaProps[];
  title: string;
  costcentre: string;
  loantype: string;
  wflowstatus?: WFlowStatus;
  vendorname?: string;
  termloan?: string;
  items?: CashAdvanceRequestItem[];
  approvers?: PTCWorkflowApprover[];
  issaving?: boolean;
  wflowmessage?: any;
  isworkflow?: boolean;
}

declare interface CashAdvanceRequestItem {
  id: number;
  Id?: number;
  Purpose?: string;
  Amount?: number;
  AmountWords?: string;
  PaymentMode?: any;
  GLCode?: string;
}

declare interface CashAdvanceRequestView {
  record: Partial<CashAdvanceRequest>;
}

declare interface NonTradeAdminPurchaseOrgFormState {
  Title: string;
  User: IPersona[];
  PurchaseOrgs: ReactSelectValue[];
  value: ReactSelectValue[];
  Id?: number;
}

declare interface PTCMassUploadPage {
  data: PTCMassUploadItem[];
  files:File[];
  pageState?: ValidationResult;
  status:PTCMassUploadStatus;
  logs:Logs;
  PTCs:any;
}

declare interface PTCMassApprovePage {
  pageState?: ValidationResult;
  PTCs:any;
}

declare interface ValidationResult { rowId?:number, valid: boolean; errors: any[] }

type Logs = Log[]

declare interface Log {
  // The log method
  method: Methods
  // The arguments passed to console API
  data: any[]
}

type PTCMassUploadStatus = 
  | 'New'
  | 'Completed'
  | 'Error'
  | 'Processing'
  
  declare type Customer = "Customer";
  declare type Vendor = "Vendor";
  declare type Entity = "Entity";
  declare type Others = "Others"
  
  type ContractClassification =
   Customer | Vendor | Entity | Others



type Methods =
  | 'log'
  | 'warn'
  | 'error'
  | 'info'
  | 'debug'
  | 'command'
  | 'result'

declare interface PTCMassUploadItem {
  No:number;
  Company: string;
  EmpNo: string;
  PayTo:string;
  CostCentre: string;
  ClaimType: string;
  TRCode: string;
  "TravelClaim Remarks": string;
  MedicalClinic: string;
  MedicalReason: string;
  "Entertainment Remarks": string;
  "Entertainment No of Guest": string;
  "EntertainmentNo of Staff": string;
  "Entertainment Location": string;
  "Transportation Remarks": string;
  "Transportation Origin": string;
  "Transportation Destination": string;
  "Transportation Country": string;
  Mileage: string;
  "Other Remarks": string;
  Remarks:string;
  "TR Number":string;
  DateFrom: string;
  DateTo: string;
  Category: string;
  ExpenseType: string;
  PaymentMode: string;
  Currency: string;
  ExchangeRate: string;
  TransactAmount: string;
  LocalTax: string;
  ClaimCurrency: string;
  "TravelClaim DateFrom": string;
  "TravelClaim DateTo": string;
  "TravelClaim Destination": string;
  "TravelClaim Country": string;
  "TravelClaim Purpose": string;
  "TravelClaim Allowance": string;
  "TravelClaim RemarksChanges": string;
  StaffId?:number;
  PayToStaffId?:number;
  IsValid:boolean;
  Id?:number;
}

declare interface HandPhonePTCItem {
  id?:number;
  value?:ReactSelectValue;
  ptcid?:number;
}


declare interface CounterParty {
  Classification?:ContractClassification,
  PartyName?:string;
  Nature?:string;
}
