import * as React from 'react';
import {Link} from 'react-router-dom';
import AppRoutes from '../../routes';
import { Router, Route, Switch, RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { Store } from 'redux';
import {pagePath} from '../../constants/config';
// import LiNavLink from '../../components/LiNavLink';
import { RouterState } from 'react-router-redux';


export namespace SideNavigation {
    export interface Props extends RouteComponentProps<void>{
        store:Store<RootState>;
        history:any;
        router:RouterState
    }
}

const mylinks = [
    {
        path:'',
        title:'Home',
        linkClass:'fas fa-tachometer-alt'
    },
    // {
    //     path:'/vendor',
    //     title:'Vendor',
    //     linkClass:'fas fa-user'
    // },
    {
        path:'/ad',
        title:'StaffMaster - AD Sync',
        linkClass:'fas fa-users'
    },
    {
        path:'/search',
        title:'App Search',
        linkClass:'fas fa-search'
    },
    {
        path:'/usersearch',
        title:'User Search',
        linkClass:'fas fa-user-md'
    },
    {
        path:'/glreport',
        title:'GL Report',
        linkClass:'fas fa-chart-bar'
    }
]

class SideNavigation extends React.Component<SideNavigation.Props> {
    constructor(props){
        super(props);
    }



    render(){
        let navSideBarStyle = {height: '1px'};
        
        let mylists = mylinks.map((link,idx)=>{
            // return <li className="active" key={idx}>                            
            // <Link to={pagePath + link.path}><i className={link.linkClass}></i>{link.title}</Link>
            // </li>
            return (
                <div></div>
                // <LiNavLink  to={pagePath + link.path}  key={idx}
                // iconClassName={link.linkClass}
                // className={null} 
                // exact={false}
                // strict={false} 
                // location={this.props.router.location} 
                // activeClassName="active" 
                // activeStyle={null}
                // style={null}
                // text={link.title} {...this.props} />
            )
        })

        return <Router history={this.props.history}  >
            <div className="navbar-collapse navbar-ex1-collapse collapse" aria-expanded="false" 
                        style={navSideBarStyle}>
                            <ul className="nav navbar-nav side-nav">
                            {mylists}
                        </ul>
                </div>
            </Router>
        
    }
}

export default SideNavigation