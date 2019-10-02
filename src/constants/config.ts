import { ReactSelectValue, ContractClassification } from "../../types/models";

export const SPOnPremise = `https://iconnect.interplex.com`;

export const homePagePath = `${_spPageContextInfo.webServerRelativeUrl}/SitePages/LegalMain.aspx`

export const pagePath =
  _spPageContextInfo.webServerRelativeUrl + "/SitePages/MainApp.aspx";

export const OwnerGroup =  "Legal Repository Owners";

export const uploadPagePath = `${pagePath}/new`
export const searchPagePath = `${pagePath}/search`;
export const editPagePath = `${pagePath}/edit/`;
export const Vendor = "Vendor";
export const Customer ="Customer";
export const Entity = "Entity";
export const Others = "Others";

export const _vendors = "vendors";
export const _customers = "customers";
export const _entities = "entities";

export const ContractClassTypes:ContractClassification[] = [
  Vendor,
  Customer,
  Entity,
  Others
]



export const DayPickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],

  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today"
};

export const ApproverRoles = [
  "Approver",
  "ApproverManager",
  "HR1",
  "HR2",
  "HR3",
  "HRM",
  "GM",
  "FINANCE"
];

export function GetApprovalOrder(pos: string): number {
  return ApproverRoles.indexOf(pos);
}

export const PTCMassUploadDateFormat = "DD/MM/YYYY";


export const BootstrapTableOptions = {
  paginationSize: 4,
  SitePagestartIndex: 1,
  // alwaysShowAllBtns: true, // Always show next and previous button
  // withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  // showTotal: true,
  // paginationTotalRenderer: customTotal,
  sizePerPageList: [{
    text: '50', value: 50
  }, {
    text: '100', value: 100
  }]
  // , {
  //   text: 'All', value: products.length
  // }] // A numeric array is also available. the purpose of above example is custom the text
};

export const EmptyReactSelectValue:ReactSelectValue = {
  label:'',value:''
}
