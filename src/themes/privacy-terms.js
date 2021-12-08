import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Privacy from '../components/PrivacyTerms/PrivacyTerms';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class PrivacyTerms extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Privacy Terms" subpage="Community" page="Privacy Terms" />
                <Privacy />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default PrivacyTerms;