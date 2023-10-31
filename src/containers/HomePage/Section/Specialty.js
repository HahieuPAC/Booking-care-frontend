import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import userService from "../../../services/userService";
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
// Import css files


import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg"

class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await userService.getAllSpecialty();
        console.log(">>> check res specialty: ", res);
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }

    }

    handleViewDetailDoctor = (item) => {
        if(this.props.history)
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() { 
        let {dataSpecialty} = this.state;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>      
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.specialty-popular"/></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-info"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 && 
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='section_customize specialty-child' key ={index} 
                                    onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='bg-image section-specialty'
                                        style={{ 
                                            backgroundImage: `url(${item.image})`
                                        }}/>
                                        <div className='specialty-name'>{item.name}</div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        //inject
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
