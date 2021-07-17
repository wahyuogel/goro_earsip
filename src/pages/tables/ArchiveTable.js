import React, { Component } from "react";
import { Card, Table } from "@themesberg/react-bootstrap";
import TableRow from "./TableRow";
import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";
class ArchiveTable extends Component {
	constructor(props) {
		super(props);
		let archives = this.props.data;
		const user = JSON.parse(localStorage.getItem("user"));
		this.state = {
			archives: archives,
			loggedUser: user,
		};
	}

	filterUpdated = (newData, filterConfiguration) => {
		this.setState({
			archives: newData,
		});
	};

	render() {
		return (
			<Card border="light" className="table-wrapper table-responsive shadow-sm">
				<Card.Body className="pt-0">
					<Table hover className="user-table align-items-center">
						<thead>
							<TableFilter
								rows={this.state.archives}
								onFilterUpdate={this.filterUpdated}
							>
								{/* <th className="border-bottom">#</th> */}
								<th filterkey="documentName" className="border-bottom">
									Nama Dokumen
								</th>
								<th filterkey="location" className="border-bottom">
									Lokasi
								</th>
								<th filterkey="documentDate" className="border-bottom">
									Tanggal Pembuatan
								</th>
								<th filterkey="description" className="border-bottom">
									Perihal
								</th>
								{this.props.isSearch ? (
									<th className="border-bottom">Tipe</th>
								) : (
									<span />
								)}
								<th className="border-bottom">Link Download</th>
								{this.state.loggedUser.level == "admin" ? (
									<th className="border-bottom">Action</th>
								) : (
									<span />
								)}
							</TableFilter>
						</thead>
						<tbody>
							{this.state.archives.map((t) => (
								<TableRow
									key={`${t.documentNumber}`}
									data={t}
									isSearch={this.props.isSearch}
								/>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		);
	}
}

export default ArchiveTable;
