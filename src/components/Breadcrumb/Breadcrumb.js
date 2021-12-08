import React, { Component } from 'react';

class Breadcrumb extends Component {
    render() {
        return (
            <section className={`breadcrumb-area d-flex align-items-center ${this.props.title.split(" ").join("")}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Breamcrumb Content */}
                            <div className="breadcrumb-content text-center">
                                {/* <h2 className="m-0">{this.props.title}</h2> */}
                                {/* <ol className="breadcrumb d-flex justify-content-center">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="#">{this.props.subpage}</Link></li>
                                    <li className="breadcrumb-item active">{this.props.page}</li>
                                </ol> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Breadcrumb;