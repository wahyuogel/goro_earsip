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

class EditDocument extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: "",
			documentNumber: "",
			description: "",
			documentName: "",
			documentNameLabel: "",
			linkUpload: "",
			location: "",
			documentType: "surat-masuk",
			documentDate: moment(new Date()).format("MM/DD/YYYY"),
			setDocumentDate: "",
			updated_at: new Date(),
			created_at: new Date(),
			submitted: false,
		};
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

	handlerFileUploader(param, value) {
		const state = this.state;
		state[param] = value;
		this.setState(state);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		const data = ArchiveService.getAll().doc(id);
		data.get().then((t) => {
			if (t.exists) {
				const doc = t.data();
				this.setState({
					key: doc.id,
					documentNumber: doc.documentNumber,
					description: doc.description,
					documentName: doc.documentName,
					documentNameLabel: doc.documentName,
					linkUpload: doc.linkUpload,
					location: doc.location,
					documentType: doc.documentType,
					documentDate: doc.documentDate,
					updated_at: doc.updated_at,
					created_at: doc.created_at,
				});
			}
		});
	}

	updateArchive(param, e) {
		e.preventDefault();
		let data = {
			documentNumber: this.state.documentNumber,
			description: this.state.description,
			documentName: this.state.documentName,
			linkUpload: this.state.linkUpload,
			location: this.state.location,
			documentType: this.state.documentType,
			documentDate: this.state.documentDate,
			updated_at: new Date(),
			created_at: this.state.created_at,
		};
		const id = this.props.match.params.id;
		ArchiveService.update(id, data)
			.then(() => {
				console.log("Updated item successfully!");
				alert("Data berhasil diubah");
				this.props.history.push("/" + this.state.documentType);
				this.setState({
					submitted: true,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		return (
			<div>
				<Row>
					<Col xs={12} xl={8}>
						<Card border="light" className="bg-white shadow-sm mb-4">
							<Card.Body style={{ backgroundColor: "#ffffdf" }}>
								<h5 className="mb-4">
									Ubah dokumen yang telah diarsipkan -{" "}
									{this.state.documentNameLabel}{" "}
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
													value={this.state.documentName}
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
													value={this.state.description}
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
													value={this.state.documentType}
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
													value={this.state.location}
													onChange={this.onChange}
													placeholder="Lokasi fisik dokumen disimpan.."
												/>
											</Form.Group>
										</Col>
									</Row>

									<h5 className="my-4">Upload Dokumen</h5>
									<Row>
										<Col sm={9} className="mb-3">
											Dokumen yang telah diupload :{" "}
											<a
												href={this.state.linkUpload}
												style={{ textDecoration: "underline" }}
											>
												{this.state.documentNameLabel}
											</a>
											<br />
											<br />
											<span className="text-small">
												<i>
													*Klik link diatas untuk lihat file. Lewati bagian ini
													jika tidak ada perubahan dokumen yang telah diupload
												</i>
											</span>
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
											onClick={(e) => this.updateArchive(this.state.key, e)}
										>
											Ubah Data
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

export default EditDocument;
