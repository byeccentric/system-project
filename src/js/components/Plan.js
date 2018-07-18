import React from "react";
import {connect} from "react-redux"

import * as PlanActions from "../actions/PlanActions";

@connect((store) => {
    return {
        todayPlans: store.plans.todayPlans,
    };
})

export default class Plan extends React.Component {
    removePlan(e) {
        let id = $(e.target).data('id');
        PlanActions.deleteFtp(id);
        e.preventDefault();
    }

    showComment(e) {
        e.preventDefault();
        let $elem = $(e.target);
        let $commentElem = $elem.parent().parent().find('.comment-form');
        if (!$elem.hasClass('slided')) {
            $commentElem.removeClass('hidden');
            $elem.addClass('slided');
            $elem.html('Сохранить');
        } else {
            $commentElem.addClass('hidden');
            $elem.removeClass('slided');
            $elem.html('Комментировать');

            if ($commentElem.find('textarea').data('comment') != $commentElem.find('textarea').val()) {
                this.props.dispatch(
                    PlanActions.commentPlan(
                        $elem.parent().parent().data('id'),
                        $commentElem.find('textarea').val()
                    )
                );
            }
        }
    }

    render() {
        const {id, comment, maked, name} = this.props;

        let style = {
            lineHeight: '34px'
        };

        return (
            <div class="item clearfix" data-id={id} data-maked={maked} style={style}>
                <div class="col-sm-4">
                    {name}
                </div>
                <div class="col-sm-3">
                    <span class="comment">{comment ? 'Есть комментарий' : 'Нет комментария'}</span>
                    &nbsp;
                    <a href="#" class="add-comment" onClick={this.showComment.bind(this)}>Комментировать</a>
                </div>
                <div class="col-sm-2 maked-status">
                    {maked ? 'Выполнено' : 'Не выполнено'}
                </div>
                <div class="col-sm-2">
                    <a class="maked" href="#">{maked ? 'Не готово' : 'Готово'}</a>
                    &nbsp;
                </div>
                <div class="col-sm-1">
                    <a class="remove" href="#">Удалить</a>
                </div>
                <div class="col-sm-6 hidden comment-form">
                    <textarea class="form-control" data-comment={comment} defaultValue={comment} />
                </div>
            </div>

        );
    }
}
