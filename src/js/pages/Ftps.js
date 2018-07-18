import React from "react";
import {connect} from "react-redux"

import Clipboard from "clipboard";

import * as FtpsActions from "../actions/FtpsActions";

@connect((store) => {
    return {
        ftps: store.ftps.ftps,
        fetched: store.ftps.fetched
    };
})
export default class Ftps extends React.Component {
    componentWillMount() {
        if (!this.props.fetched) {
            this.props.dispatch(FtpsActions.getFtps())
        }
    }

    componentDidMount() {
        new Clipboard('.this');
    }

    modalClearData() {
        $('#edit_modal_type').val('add');
        $('#edit_modal_id').val('');

        $('#edit_modal_name').val('');
        $('#edit_modal_login').val('');
        $('#edit_modal_password').val('');
        $('#edit_modal_server').val('');
    }

    removeFtp(id) {
        this.props.dispatch(
            FtpsActions.deleteFtp(
                id
            )
        );
    }

    editFtp(item) {
        this.props.dispatch(
            FtpsActions.editFtp(item)
        );
    }

    render() {
        const {ftps} = this.props;

        const FtpsComponents = ftps.map((ftp, index) => {
            return <Ftp key={index} {...ftp} number={index+1} removeFtp={this.removeFtp.bind(this)}/>;
        });

        return (
            <div class="col-sm-12 col-md-12 main">
                <h2 class="sub-header">Доступы</h2>
                <a href="#" data-toggle="modal" data-target="#edit_modal" onClick={this.modalClearData.bind(this)}>Добавить</a>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>название</th>
                            <th>login</th>
                            <th>pass</th>
                            <th>server</th>
                            <th>ссылки</th>
                            <th>управление</th>
                        </tr>
                        </thead>
                        <tbody>
                        {FtpsComponents}
                        </tbody>
                    </table>
                </div>
                <FtpsModal editFtp={this.editFtp.bind(this)} />
            </div>

        );
    }
}

const Ftp = props => {
    const modalAddData = (e) => {
        var $elem = $($(e.target).parents().get(1));
        $('#edit_modal_type').val('edit');
        $('#edit_modal_id').val($elem.attr('id').replace('element', ''));

        $('#edit_modal_name').val($elem.find('td:nth-child(2)').html());
        $('#edit_modal_login').val($elem.find('td:nth-child(3)').html());
        $('#edit_modal_password').val($elem.find('td:nth-child(4)').html());
        $('#edit_modal_server').val($elem.find('td:nth-child(5)').html());
    }

    const removeFtp = e => {
        const id = parseInt($(e.target).parent().parent().attr('id').replace('element', ''));
        props.removeFtp(id);
        e.preventDefault();
    }

    const {id, name, login, password, server, number} = props;

    const styles = {
        opacity: 0,
        position: 'absolute',
        left: '-99999px'
    };

    return (
        <tr id={"element" + id}>
            <td class="id">{ number }</td>
            <td class="name">{ name }</td>
            <td class="login">{ login }</td>
            <td class="pass">{ password }</td>
            <td class="server">{ server }
            </td>
            <td>
                <input type="text" id={"link" + id} defaultValue={"ftp://"+login+':'+password+'@'+server} style={ styles } />
                <textarea id={"dataid" + id} style={ styles } defaultValue={`${name}
Логин: ${login}
Пароль: ${password}
Сервер: ${server}
Ссылка: ftp://${login}:${password}@${server}`}></textarea>
                <a href="#" class="this" data-clipboard-target={"#link" + id}>Копировать ссылку</a>&nbsp;
                <a href="#" class="this" data-clipboard-target={"#dataid" + id}>Копировать данные</a>
            </td>
            <td>
                <a href="#" class="edit_link" data-toggle="modal" data-target="#edit_modal" onClick={modalAddData.bind(this)}>Изменить</a>
                <a href="#" class="remove_link" onClick={removeFtp}>Удалить</a>
            </td>
        </tr>
    );
}

const FtpsModal = props => {
    const editFtp = e => {
        let item = {};
        e.preventDefault();

        const $form = $(e.target);
        item.type = $form.find('#edit_modal_type').val();
        item.id = $form.find('#edit_modal_id').val();

        item.name = $form.find('#edit_modal_name').val();
        item.login = $form.find('#edit_modal_login').val();
        item.password = $form.find('#edit_modal_password').val();
        item.server = $form.find('#edit_modal_server').val();

        props.editFtp(item);
        $form.find('.close').trigger('click');
        return false;
    };

    return (
        <div class="modal fade" id="edit_modal" tabIndex="-1" role="dialog" aria-labelledby="feedback_modalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form action="/" class="edit_modal_form" onSubmit={editFtp}>
                        <input type="hidden" id="edit_modal_type" name="type" value="add"/>
                        <input type="hidden" id="edit_modal_id" name="id" value=""/>
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="feedback_modalLabel">Редактировать</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" required class="form-control" id="edit_modal_name"
                                       placeholder="Название"/>
                            </div>
                            <div class="form-group">
                                <input type="text" required class="form-control" id="edit_modal_login"
                                       placeholder="Логин"/>
                            </div>
                            <div class="form-group">
                                <input type="text" required class="form-control" id="edit_modal_password"
                                       placeholder="Пароль"/>
                            </div>
                            <div class="form-group">
                                <input type="text" required class="form-control" id="edit_modal_server"
                                       placeholder="Сервер"/>
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
