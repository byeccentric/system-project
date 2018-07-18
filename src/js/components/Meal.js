import React from "react";

import Clipboard from "clipboard";
import * as MealActions from "../actions/MealActions";

export default class Meal extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        new Clipboard('.this');
    }


    modalAddData(e) {
        var $elem = $($(e.target).parents().get(1));
        $('#edit_modal_type').val('edit');
        $('#edit_modal_id').val($elem.find('td:nth-child(1)').html());

        $('#edit_modal_name').val($elem.find('td:nth-child(2)').html());
        $('#edit_modal_login').val($elem.find('td:nth-child(3)').html());
        $('#edit_modal_password').val($elem.find('td:nth-child(4)').html());
        $('#edit_modal_server').val($elem.find('td:nth-child(5)').html());
    }

    removeFtp(e) {
        let id = $(e.target).data('id');
        FtpsActions.deleteFtp(id);
        e.preventDefault();
    }

    render() {
        const {id, name, login, password, server} = this.props;

        const styles = {
            opacity: 0,
            position: 'absolute',
            left: '-99999px'
        };

        return (
            <tr id={"element" + id}>
                <td class="id">{ id }</td>
                <td class="name">{ name }</td>
                <td class="login">{ login }</td>
                <td class="pass">{ password }</td>
                <td class="server">{ server }</td>
                <td>
                    <input type="text" id={"link" + id} defaultValue={"ftp://"+login+':'+password+'@'+server} style={ styles } />
                    <textarea id="data<?php echo $item['id']; ?>" style={ styles } defaultValue={name + ":" +
"Логин:" + login +
"Пароль:" + password +
"Сервер:" +
"Ссылка: ftp://" + login + ":" + password + "@" + server}></textarea>
                    <a href="#" class="this" data-clipboard-target={"#link" + id}>Копировать ссылку</a>&nbsp;
                    <a href="#" class="this" data-clipboard-target={"#data" + id}>Копировать данные</a>
                </td>
                <td>
                    <a href="#" class="edit_link" data-toggle="modal" data-target="#edit_modal" onClick={this.modalAddData.bind(this)}>Изменить</a>
                    <a href="#" class="remove_link" data-id={ id } onClick={this.removeFtp.bind(this)}>Удалить</a>
                </td>
            </tr>
        );
    }
}
