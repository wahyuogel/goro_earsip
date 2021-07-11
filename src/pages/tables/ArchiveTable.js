import React, { Component } from "react";
import { Card, Table } from '@themesberg/react-bootstrap';
import TableRow from "./TableRow";

class ArchiveTable extends Component{
    constructor(props){
        super(props);
        let archives = this.props.data;
        const user = JSON.parse(localStorage.getItem("user"));
        this.state = {
            archives : archives,
            loggedUser : user
        }
    }
    render() {
        return (
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
                <thead>
                <tr>
                    <th className="border-bottom">#</th>
                    <th className="border-bottom">Nama Dokumen</th>
                    <th className="border-bottom">Lokasi</th>
                    <th className="border-bottom">Tanggal Pembuatan</th>
                    <th className="border-bottom">Perihal</th>
                    <th className="border-bottom">Tipe</th>
                    <th className="border-bottom">Link Download</th>
                    {this.state.loggedUser.level == "admin" ? <th className="border-bottom">Action</th> : <span />}
                </tr>
                </thead>
                <tbody>
                {this.state.archives.map(t => <TableRow key={`${t.documentNumber}`} data={t} />)}
                </tbody>
            </Table>
            </Card.Body>
        </Card>
        )
    }
}


export default ArchiveTable;