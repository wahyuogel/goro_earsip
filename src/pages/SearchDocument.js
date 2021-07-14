import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
	Col,
	Row,
	Button,
	Form,
	Breadcrumb,
	InputGroup,
} from "@themesberg/react-bootstrap";
import ArchiveTable from "../pages/tables/ArchiveTable";
import ArchiveService from "../services/archive.service";

class SearchDocument extends Component {
	constructor(props) {
		super(props);
		this.state = {
			archives: [],
			keyword: "",
			isFetch: false,
		};
	}
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	search(queryText, e) {
		e.preventDefault();
		const archives = [];
		ArchiveService.getAll()
			// .orderBy("documentName")
			// .startAt(queryText)
			// .endAt(queryText + "~")
			.where("keyword", "array-contains", queryText)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					const {
						documentName,
						created_at,
						description,
						documentDate,
						documentType,
						documentNumber,
						linkUpload,
						location,
						updated_at,
					} = doc.data();

					archives.push({
						key: doc.id,
						documentName,
						created_at,
						description,
						documentDate,
						documentType,
						documentNumber,
						linkUpload,
						location,
						updated_at,
					});
				});

				this.setState({
					archives,
					isFetch: true,
				});
			});
	}

	render() {
		return (
			<div>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
					<div className="d-block mb-4 mb-md-0">
						<Breadcrumb
							className="d-none d-md-inline-block"
							listProps={{
								className: "breadcrumb-dark breadcrumb-transparent",
							}}
						>
							<Breadcrumb.Item>
								<FontAwesomeIcon icon={faHome} />
							</Breadcrumb.Item>
							<Breadcrumb.Item>Pencarian</Breadcrumb.Item>
							<Breadcrumb.Item active>Cari Arsip</Breadcrumb.Item>
						</Breadcrumb>
						<h4>Cari Arsip</h4>
						<p className="mb-0">Masukan nama dokumen yang ingin Anda Cari</p>
					</div>
				</div>

				<div className="table-settings mb-4">
					<Row className="justify-content-between align-items-center">
						<Col xs={8} md={6} lg={3} xl={4}>
							<InputGroup>
								<InputGroup.Text>
									<FontAwesomeIcon icon={faSearch} />
								</InputGroup.Text>
								<Form.Control
									type="text"
									placeholder="Masukkan nama dokumen..."
									name="keyword"
									onChange={this.onChange}
								/>
								<Button
									variant="primary"
									onClick={(e) => this.search(this.state.keyword, e)}
								>
									Lakukan pencarian
								</Button>
							</InputGroup>
						</Col>
						<Col xs={4} md={2} xl={1} className="ps-md-0 text-end"></Col>
					</Row>
				</div>

				{!this.state.isFetch ? (
					<span>Sedang memuat data</span>
				) : this.state.archives.length > 0 ? (
					<ArchiveTable data={this.state.archives} />
				) : (
					<span>Data tidak ditemukan. Silahkan masukan kata kunci lain</span>
				)}
			</div>
		);
	}
}
export default SearchDocument;
