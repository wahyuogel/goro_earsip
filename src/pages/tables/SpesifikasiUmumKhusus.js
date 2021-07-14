import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import ArchiveTable from "./ArchiveTable";
import ArchiveService from "../../services/archive.service";

class SpesifikasiUmumKhusus extends Component {
	constructor(props) {
		super(props);
		const pathName = "spesifikasi-umum-khusus";
		const documentType = pathName.replace("/", "");
		const documentTypeLabel = "Spesifikasi Umum & Khusus";
		this.ref = ArchiveService.getAll().where("documentType", "==", pathName);
		this.subscribe = null;
		this.state = {
			archives: [],
			isFetch: false,
			documentType: documentType,
			documentTypeLabel: documentTypeLabel,
		};
	}

	filterUpdated = (newData, filterConfiguration) => {
		this.setState({
			archives: newData,
		});
	};

	onCollectionUpdate = (querySnapshot) => {
		const archives = [];
		querySnapshot.forEach((doc) => {
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
	};

	componentDidMount() {
		this.subscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
							<Breadcrumb.Item>Dokumen</Breadcrumb.Item>
							<Breadcrumb.Item active>
								{this.state.documentTypeLabel.toLowerCase()}
							</Breadcrumb.Item>
						</Breadcrumb>
						<h4>{this.state.documentTypeLabel.toUpperCase()}</h4>
						<p className="mb-0">
							Manajemen data dari {this.state.documentTypeLabel.toLowerCase()}
						</p>
					</div>
				</div>

				{!this.state.isFetch ? (
					<span>Sedang memuat data</span>
				) : this.state.archives.length > 0 ? (
					<ArchiveTable data={this.state.archives} />
				) : (
					<span>Data tidak ditemukan</span>
				)}
			</div>
		);
	}
}

export default SpesifikasiUmumKhusus;
