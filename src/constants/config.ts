import { ReactSelectValue } from "../../types/models";

export const SPOnPremise = `https://iconnect.interplex.com`;

export const pagePath =
  _spPageContextInfo.webServerRelativeUrl + "/SitePages/MainApp.aspx";
export const CashAdvancePagePath =
  _spPageContextInfo.webServerRelativeUrl + "/SitePages/CashAdvance.aspx";
export const PTCMassUploadPagePath =
  _spPageContextInfo.webServerRelativeUrl +
  "/SitePages/ptcmassupload/PTCMassUpload.aspx";

  export const PTCMassApprovePagePath =
  _spPageContextInfo.webServerRelativeUrl +
  "/SitePages/ptcmassupload/PTCMassApprove.aspx";

  export const GLReportPagePath =
  _spPageContextInfo.webServerRelativeUrl +
  "/SitePages/newglreport/GLReport.aspx";

export const PTCNextWorkflowName = "PTCNext Approval";


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
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }]
  // , {
  //   text: 'All', value: products.length
  // }] // A numeric array is also available. the purpose of above example is custom the text
};

export const EmptyReactSelectValue:ReactSelectValue = {
  label:'',value:''
}
