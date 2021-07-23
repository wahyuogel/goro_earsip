import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFile,
	faPlusCircle,
	faSearchPlus,
	faSignOutAlt,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
	Nav,
	Badge,
	Image,
	Button,
	Dropdown,
	Accordion,
	Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import Profile1 from "../assets/img/team/profile-picture-1.jpg";
import { authService } from "../services/auth";

export default (props = {}) => {
	const location = useLocation();
	const { pathname } = location;
	const [show, setShow] = useState(false);
	const showClass = show ? "show" : "";

	const user = JSON.parse(localStorage.getItem("user"));
	const onCollapse = () => setShow(!show);

	const CollapsableNavItem = (props) => {
		const { eventKey, title, icon, children = null } = props;
		const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

		return (
			<Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
				<Accordion.Item eventKey={eventKey}>
					<Accordion.Button
						as={Nav.Link}
						className="d-flex justify-content-between align-items-center"
					>
						<span>
							<span className="sidebar-icon">
								<FontAwesomeIcon icon={icon} />{" "}
							</span>
							<span className="sidebar-text">{title}</span>
						</span>
					</Accordion.Button>
					<Accordion.Body className="multi-level">
						<Nav className="flex-column">{children}</Nav>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		);
	};

	const NavItem = (props) => {
		const {
			title,
			link,
			external,
			target,
			icon,
			image,
			badgeText,
			badgeBg = "secondary",
			badgeColor = "primary",
		} = props;
		const classNames = badgeText
			? "d-flex justify-content-start align-items-center justify-content-between"
			: "";
		const navItemClassName = link === pathname ? "active" : "";
		const linkProps = external ? { href: link } : { as: Link, to: link };

		return (
			<Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
				<Nav.Link {...linkProps} target={target} className={classNames}>
					<span>
						{icon ? (
							<span className="sidebar-icon">
								<FontAwesomeIcon icon={icon} />{" "}
							</span>
						) : null}
						{image ? (
							<Image
								src={image}
								width={20}
								height={20}
								className="sidebar-icon svg-icon"
							/>
						) : null}

						<span className="sidebar-text">{title}</span>
					</span>
					{badgeText ? (
						<Badge
							pill
							bg={badgeBg}
							text={badgeColor}
							className="badge-md notification-count ms-2"
						>
							{badgeText}
						</Badge>
					) : null}
				</Nav.Link>
			</Nav.Item>
		);
	};

	return (
		<div>
			<Navbar
				expand={false}
				collapseOnSelect
				variant="dark"
				className="navbar-theme-primary px-4 d-md-none"
			>
				<Navbar.Brand
					className="me-lg-5"
					as={Link}
					to={Routes.Search.path}
				></Navbar.Brand>
				<Navbar.Toggle
					as={Button}
					aria-controls="main-navbar"
					onClick={onCollapse}
				>
					<span className="navbar-toggler-icon" />
				</Navbar.Toggle>
			</Navbar>
			<CSSTransition timeout={300} in={show} classNames="sidebar-transition">
				<SimpleBar
					className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
				>
					<div className="sidebar-inner px-4 pt-3">
						<div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
							<div className="d-flex align-items-center">
								<div className="user-avatar lg-avatar me-4">
									<Image
										src={user.level == "admin" ? Profile1 : Profile3}
										className="user-avatar md-avatar rounded-circle"
									/>
								</div>
								<div className="d-block">
									<span>
										Hi, {user.level == "admin" ? "Administrator" : "Guest"}
									</span>
									&nbsp;
									<Button
										variant="secondary"
										size="xl"
										className="text-dark"
										onClick={(e) => {
											e.preventDefault();
											authService.logout();
											window.location.reload();
										}}
									>
										<FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
										Sign Out
									</Button>
								</div>
							</div>
							<Nav.Link
								className="collapse-close d-md-none"
								onClick={onCollapse}
							>
								<FontAwesomeIcon icon={faTimes} />
							</Nav.Link>
						</div>
						<Nav className="flex-column pt-3 pt-md-0">
							<NavItem
								title="Cari Arsip"
								icon={faSearchPlus}
								link={Routes.Search.path}
							/>
							{user.level == "admin" ? (
								<NavItem
									title="Tambah Arsip"
									icon={faPlusCircle}
									link={Routes.AddDocument.path}
								/>
							) : (
								<br />
							)}
							<Dropdown.Divider className="my-3 border-indigo" />
							<NavItem
								title="Surat Masuk"
								icon={faFile}
								link={Routes.SuratMasuk.path}
							/>
							<NavItem
								title="Surat Keluar"
								icon={faFile}
								link={Routes.SuratKeluar.path}
							/>
							<NavItem
								title="Paket Konsultasi"
								icon={faFile}
								link={Routes.PaketKonsultasi.path}
							/>
							<NavItem
								title="Kontrak"
								icon={faFile}
								link={Routes.Kontrak.path}
							/>
							<NavItem title="DED" icon={faFile} link={Routes.Ded.path} />
							<NavItem
								title="Justifikasi Teknis"
								icon={faFile}
								link={Routes.JustifikasiTeknis.path}
							/>
							<NavItem title="RPB" icon={faFile} link={Routes.Rpb.path} />
							<NavItem
								title="Padat Karya"
								icon={faFile}
								link={Routes.PadatKarya.path}
							/>
							<NavItem
								title="Peraturan Menteri"
								icon={faFile}
								link={Routes.PeraturanMenteri.path}
							/>
							<NavItem
								title="Undang-undang"
								icon={faFile}
								link={Routes.UndangUndang.path}
							/>
							<NavItem
								title="Surat Edaran"
								icon={faFile}
								link={Routes.SuratEdaran.path}
							/>
							<NavItem
								title="Keputusan"
								icon={faFile}
								link={Routes.Keputusan.path}
							/>
							<NavItem
								title="Spes. Umum &amp; Khusus"
								icon={faFile}
								link={Routes.SpesifikasiUmumKhusus.path}
							/>
							<NavItem
								title="Manual Pelaksanaan"
								icon={faFile}
								link={Routes.ManualPelaksanaan.path}
							/>
							<NavItem title="SOP" icon={faFile} link={Routes.Sop.path} />
							<NavItem title="SPT" icon={faFile} link={Routes.Spt.path} />
							<NavItem
								title="Laporan AMP"
								icon={faFile}
								link={Routes.LaporanAmp.path}
							/>
							<NavItem
								title="Laporan E-Monitoring"
								icon={faFile}
								link={Routes.LaporanEmonitoring.path}
							/>
						</Nav>
					</div>
				</SimpleBar>
			</CSSTransition>
		</div>
	);
};
