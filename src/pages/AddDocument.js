import React, { useState, Component } from "react";
import ArchiveService from "../services/archive.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
	Col,
	Row,
	Button,
	Card,
	Form,
	InputGroup,
} from "@themesberg/react-bootstrap";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import FileUploader from "./components/FileUploader";
import ReactTags from "react-tag-autocomplete";

class AddDocument extends Component {
	constructor() {
		super();
		this.state = {
			key: "",
			documentNumber: "",
			description: "",
			documentName: "",
			linkUpload: "",
			location: "",
			documentType: "surat-masuk",
			documentDate: moment(new Date()).format("MM/DD/YYYY"),
			setDocumentDate: "",
			updated_at: new Date(),
			created_at: new Date(),
			submitted: false,
			keyword: [],
			tags: [],
			suggestions: [
				{ id: 3, name: "surat" },
				{ id: 4, name: "dokumen" },
				{ id: 5, name: "perjanjian" },
				{ id: 6, name: "peraturan" },
			],
		};

		this.reactTags = React.createRef();
	}
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	onChangeDate(param, value) {
		const state = this.state;
		state[param] = value.format("MM/DD/YYYY");
		this.setState(state);
	}

	onDelete(i) {
		let tags = this.state.tags.slice(0);
		tags.splice(i, 1);
		this.setState({ tags });
	}

	onAddition(tag) {
		const tags = [].concat(this.state.tags, tag);
		this.setState({ tags });
	}

	onValidate(tag) {
		return /^[A-Z]{3,12}$/i.test(tag.name);
	}

	handlerFileUploader(param, value) {
		const state = this.state;
		state[param] = value;
		this.setState(state);
	}

	saveArchive = (e) => {
		e.preventDefault();
		let keyword = [];
		this.state.tags.map((key) => keyword.push(key.name));
		let data = {
			documentNumber: new Date().getTime().toString(),
			description: this.state.description,
			documentName: this.state.documentName,
			linkUpload: this.state.linkUpload,
			location: this.state.location,
			documentType: this.state.documentType,
			documentDate: this.state.documentDate,
			keyword: keyword,
			updated_at: new Date(),
			created_at: new Date(),
		};

		ArchiveService.create(data)
			.then(() => {
				console.log("Created new item successfully!");
				alert("Data berhasil ditambahkan");
				this.props.history.push("/" + this.state.documentType);
				this.setState({
					submitted: true,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	newArchive() {
		this.setState({
			key: "",
			documentNumber: "",
			description: "",
			documentName: "",
			linkUpload: "",
			location: "",
			documentType: "",
			documentDate: "",
			setDocumentDate: "",
			updated_at: new Date(),
			created_at: new Date(),
		});
	}

	render() {
		return (
			<div>
				<Row>
					{this.state.submitted && <span>Data sukses ditambahkan</span>}
					<Col xs={12} xl={8}>
						<Card border="light" className="bg-white shadow-sm mb-4">
							<Card.Body style={{ backgroundColor: "#e0edf3" }}>
								<h5 className="mb-4">
									Tambahkan dokumen yang ingin diarsipkan
								</h5>
								<Form>
									<Row>
										<Col md={6} className="mb-3">
											<Form.Group id="firstName">
												<Form.Label>Nama Dokumen</Form.Label>
												<Form.Control
													required
													type="text"
													name="documentName"
													onChange={this.onChange}
													placeholder="Masukan nama dokumen..."
												/>
											</Form.Group>
										</Col>
										<Col md={6} className="mb-3">
											<Form.Group id="lastName">
												<Form.Label>Perihal</Form.Label>
												<Form.Control
													required
													type="text"
													name="description"
													onChange={this.onChange}
													placeholder="Tulis perihal dokumen disini"
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row className="align-items-center">
										<Col md={6} className="mb-3">
											<Form.Group id="birthday">
												<Form.Label>Tanggal Dokumen Dibuat</Form.Label>
												<Datetime
													timeFormat={false}
													name="documentDate"
													onChange={(value) => {
														const param = "documentDate";
														this.onChangeDate(param, value);
													}}
													renderInput={(props, openCalendar) => (
														<InputGroup>
															<InputGroup.Text>
																<FontAwesomeIcon icon={faCalendarAlt} />
															</InputGroup.Text>
															<Form.Control
																required
																type="text"
																name="documentDate"
																value={
																	this.state.documentDate
																		? moment(this.state.documentDate).format(
																				"MM/DD/YYYY"
																		  )
																		: ""
																}
																placeholder="mm/dd/yyyy"
																onFocus={openCalendar}
																onChange={() => {}}
															/>
														</InputGroup>
													)}
												/>
											</Form.Group>
										</Col>
										<Col md={6} className="mb-3">
											<Form.Group id="documentType">
												<Form.Label>Tipe Dokumen</Form.Label>
												<Form.Select
													defaultValue="surat-masuk"
													name="documentType"
													onChange={this.onChange}
												>
													<option value="surat-masuk">Surat Masuk</option>
													<option value="surat-keluar">Surat Keluar</option>
													<option value="paket-konsultasi">
														Paket Konsultasi
													</option>
													<option value="kontrak">Kontrak</option>
													<option value="ded">DED</option>
													<option value="justifikasi-teknis">
														Justifikasi Teknis
													</option>
													<option value="rpb">RPB</option>
													<option value="padat-karya">Padat Karya</option>
													<option value="peraturan-menteri">
														Peraturan Menteri
													</option>
													<option value="undang-undang">Undang-undang</option>
													<option value="surat-edaran">Surat Edaran</option>
													<option value="keputusan">Keputusan</option>
													<option value="spesifikasi-umum-khusus">
														Spesifikasi Umum &amp; Khusus
													</option>
													<option value="manual-pelaksanaan">
														Manual Pelaksanaan
													</option>
													<option value="sop">SOP</option>
													<option value="spt">SPT</option>
													<option value="laporan-amp">Laporan AMP</option>
												</Form.Select>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col md={6} className="mb-3">
											<Form.Group id="location">
												<Form.Label>Lokasi Dokumen</Form.Label>
												<Form.Control
													required
													type="text"
													name="location"
													onChange={this.onChange}
													placeholder="Lokasi fisik dokumen disimpan.."
												/>
											</Form.Group>
										</Col>

										<Col md={6} className="mb-3">
											<Form.Group id="location">
												<Form.Label>Kata Kunci</Form.Label>
												<ReactTags
													style="{{minWidth: 200px;}}"
													allowNew
													ref={this.reactTags}
													tags={this.state.tags}
													autoresize={false}
													placeholderText="Masukan kata kunci.."
													suggestions={this.state.suggestions}
													onDelete={this.onDelete.bind(this)}
													onAddition={this.onAddition.bind(this)}
												/>
												<span>
													*Gunakan Enter & Tab untuk menambahkan kata kunci
												</span>
											</Form.Group>
										</Col>
									</Row>

									<h5 className="my-4">Upload Dokumen</h5>
									<Row>
										<Col sm={9} className="mb-3">
											<FileUploader
												className="text"
												handlerUpload={(value) =>
													this.handlerFileUploader("linkUpload", value)
												}
											/>
										</Col>
									</Row>
									<div className="mt-3">
										<Button
											variant="primary"
											type="submit"
											data-bs-toggle="modal"
											data-bs-target="#modalNotification"
											onClick={(e) => this.saveArchive(e)}
										>
											Simpan Data
										</Button>
										{this.state.submitted && (
											<img
												alt="loading"
												src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
											/>
										)}
									</div>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default AddDocument;
