import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import How from '../components/HowItWorks/HowItWorks';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class HowItWorks extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="How It Works" subpage="Community" page="How It Works" />
                <How />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default HowItWorks;