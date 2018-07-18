import React from "react";
import {Link} from "react-router-dom";

export default class Nav extends React.Component {
    constructor() {
        super()

        this.state = {
            collapsed: true,
        };
    }

    toggleCollapse(e) {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    render() {
        let {location} = this.props;
        const {collapsed} = this.state;
        const ftpClass = location.pathname === "/" ? "active" : "";
        const betsClass = location.pathname.match(/^\/bets/) ? "active" : "";
        const planClass = location.pathname.match(/^\/plan/) ? "active" : "";
        const mealClass = location.pathname.match(/^\/meal/) ? "active" : "";
        const hardClass = location.pathname.match(/^\/hard/) ? "active" : "";
        const navClass = collapsed ? "collapse" : "";

        return (
            <nav class="navbar navbar-inverse navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Всякое</a>
                    </div>
                    <div id="navbar" class={"navbar-collapse " + navClass}>
                        <ul class="nav navbar-nav navbar-right">
                            <li class={ftpClass}>
                               <Link to="/" onClick={this.toggleCollapse.bind(this)}>FTP</Link>
                            </li>
                            <li class={betsClass}>
                                <Link to="bets" activeClassName="active">Ставки</Link>
                            </li>
                            <li class={planClass}>
                                <Link to="plan">Планировщик</Link>
                            </li>
                            <li class={mealClass}>
                                <Link to="meal">Питание</Link>
                            </li>
                            <li class={hardClass}>
                                <Link to="hard">Тренировки</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}