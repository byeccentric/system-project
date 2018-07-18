import React from "react";
import * as PlanActions from "../../actions/PlanActions";

export default class FtpsModal extends React.Component {
    addPlan(e) {
        let item = {};
        e.preventDefault();

        let $form = $(e.target);
        item.type = $form.find('#edit_modal_type').val();
        item.id = $form.find('#edit_modal_id').val();

        item.name = $form.find('#edit_modal_name').val();
        item.login = $form.find('#edit_modal_login').val();
        item.password = $form.find('#edit_modal_password').val();
        item.server = $form.find('#edit_modal_server').val();

        PlanActions.createPlan(item);
        $form.find('.close').trigger('click');
        return false;
    }

    render() {
        return (
            <div class="modal fade" id="edit_modal" tabIndex="-1" role="dialog" aria-labelledby="feedback_modalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form action="/" class="edit_modal_form" onSubmit={this.addPlan.bind(this)}>
                            <input type="hidden" id="edit_modal_module" name="module" value="plan" />
                            <input type="hidden" id="edit_modal_action" name="type" value="add" />
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="feedback_modalLabel">Создать</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="edit_modal_date" class="control-label">Дата</label>
                                    <input type="date" required class="form-control" id="edit_modal_date" />
                                </div>
                                <div class="form-group">
                                    <label for="edit_modal_name" class="control-label">Название</label>
                                    <input type="text" required class="form-control" id="edit_modal_name" />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

