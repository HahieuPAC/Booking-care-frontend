import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES} from "../../utils/";
import { FormattedMessage } from 'react-intl';
import { USER_ROLE } from '../../utils/';
import _ from 'lodash';
// import { changeLanguageApp } from '../../store/actions';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        let {userInfo} = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, lang, userInfo, } = this.props;
        console.log("menu app: ", this.props.userInfo.roleId)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id="homeheader.welcome"/> 
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    <span onClick={() => {this.handleChangeLanguage(LANGUAGES.VI)}} 
                    className= {lang === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                        VN
                        </span>
                    <span onClick={() => {this.handleChangeLanguage(LANGUAGES.EN)}} 
                    className= {lang === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                        EN
                        </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'> 
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
