import React from "react";
import {connect} from "react-redux"

import Plan from "../components/Plan";
import * as PlanActions from "../actions/PlanActions";

import PlanModal from "../components/modal/PlanModal";

@connect((store) => {
    return {
        todayPlans: store.plans.todayPlans,
        weekPlans: store.plans.weekPlans,
        pastPlans: store.plans.pastPlans,
        fetched: store.plans.fetched
    };
})

export default class Plans extends React.Component {
    componentWillMount() {
        if (!this.props.fetched) {
            this.props.dispatch(PlanActions.getPlans())
        }
    }

    render() {
        const {todayPlans, weekPlans, pastPlans} = this.props;

        const todayPlansComponent = todayPlans.map((plan) => {
            return <Plan key={plan.id} {...plan}/>;
        });

        /*const pastPlansComponent = todayPlans.map((plan) => {
            return <Plan key={plan.id} {...plan}/>;
        });

        const weekPlansComponent = weekPlans.map((plan) => {
            return <Plan key={plan.id} {...plan}/>;
        });*/

        return (
            <div class="col-sm-12 col-md-12 main">
                <h2 class="sub-header">Планы на сегодня</h2>
                <a href="#" data-toggle="modal" data-target="#edit_modal">Добавить</a>
                {todayPlansComponent}
                <br/>
                <PlanModal />
            </div>

        );
    }
}
