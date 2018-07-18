import React from "react";
import Nav from "./Nav";

export default class Layout extends React.Component {
    render() {
        const location = { pathname: window.location.hash.replace('#', '') }

        return (
            <div>
                <Nav location={location}/>
                <div class="container-fluid">
                    <div class="row">
                        {this.props.children}
                    </div>
                </div>
            </div>

        );
    }
}
