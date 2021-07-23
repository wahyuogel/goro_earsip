import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

import { PrivateRoute } from "../private";

// pages
import Upgrade from "./Upgrade";
import SearchDocument from "./SearchDocument";
import AddDocument from "./AddDocument";
import EditDocument from "./EditDocument";
import Signin from "./Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// Tables
import SuratMasuk from "./tables/SuratMasuk";
import SuratKeluar from "./tables/SuratKeluar";
import PaketKonsultasi from "./tables/PaketKonsultasi";
import Kontrak from "./tables/Kontrak";
import PeraturanMenteri from "./tables/PeraturanMenteri";
import SuratEdaran from "./tables/SuratEdaran";
import Ded from "./tables/Ded";
import JustifikasiTeknis from "./tables/JustifikasiTeknis";
import Rpb from "./tables/Rpb";
import PadatKarya from "./tables/PadatKarya";
import Keputusan from "./tables/Keputusan";
import SpesifikasiUmumKhusus from "./tables/SpesifikasiUmumKhusus";
import ManualPelaksanaan from "./tables/ManualPelaksanaan";
import Sop from "./tables/Sop";
import Spt from "./tables/Spt";
import UndangUndang from "./tables/UndangUndang";
import LaporanAmp from "./tables/LaporanAmp";
import LaporanEmonitoring from "./tables/LaporanEmonitoring";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

import { configureAuth } from "../helpers/configureAuth";
configureAuth();
const RouteWithLoader = ({ component: Component, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Route
			{...rest}
			render={(props) => (
				<div>
					{" "}
					<Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
				</div>
			)}
		/>
	);
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	const localStorageIsSettingsVisible = () => {
		return localStorage.getItem("settingsVisible") === "false" ? false : true;
	};

	const [showSettings, setShowSettings] = useState(
		localStorageIsSettingsVisible
	);

	const toggleSettings = () => {
		setShowSettings(!showSettings);
		localStorage.setItem("settingsVisible", !showSettings);
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem("user") ? (
					<div>
						<Preloader show={loaded ? false : true} />
						<Sidebar />

						<main className="content">
							<Navbar />
							<Component {...props} />
							{/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
						</main>
					</div>
				) : (
					<Redirect
						to={{ pathname: "/sign-in", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default () => (
	<Switch>
		{/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
		<RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
		<RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
		<RouteWithLoader
			exact
			path={Routes.ForgotPassword.path}
			component={ForgotPassword}
		/>
		<RouteWithLoader
			exact
			path={Routes.ResetPassword.path}
			component={ResetPassword}
		/>
		<RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
		<RouteWithLoader
			exact
			path={Routes.NotFound.path}
			component={NotFoundPage}
		/>
		<RouteWithLoader
			exact
			path={Routes.ServerError.path}
			component={ServerError}
		/>

		{/* pages */}
		{/* <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} /> */}
		<RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
		<RouteWithSidebar
			exact
			path={Routes.Search.path}
			component={SearchDocument}
		/>
		<RouteWithSidebar
			exact
			path={Routes.AddDocument.path}
			component={AddDocument}
		/>
		<RouteWithSidebar exact path="/ubah-dokumen/:id" component={EditDocument} />
		<RouteWithSidebar
			exact
			path={Routes.SuratMasuk.path}
			component={SuratMasuk}
		/>
		<RouteWithSidebar
			exact
			path={Routes.SuratKeluar.path}
			component={SuratKeluar}
		/>
		<RouteWithSidebar
			exact
			path={Routes.PaketKonsultasi.path}
			component={PaketKonsultasi}
		/>
		<RouteWithSidebar exact path={Routes.Kontrak.path} component={Kontrak} />
		<RouteWithSidebar exact path={Routes.Ded.path} component={Ded} />
		<RouteWithSidebar
			exact
			path={Routes.JustifikasiTeknis.path}
			component={JustifikasiTeknis}
		/>
		<RouteWithSidebar exact path={Routes.Rpb.path} component={Rpb} />
		<RouteWithSidebar
			exact
			path={Routes.PadatKarya.path}
			component={PadatKarya}
		/>
		<RouteWithSidebar
			exact
			path={Routes.UndangUndang.path}
			component={UndangUndang}
		/>
		<RouteWithSidebar
			exact
			path={Routes.PeraturanMenteri.path}
			component={PeraturanMenteri}
		/>
		<RouteWithSidebar
			exact
			path={Routes.SuratEdaran.path}
			component={SuratEdaran}
		/>
		<RouteWithSidebar
			exact
			path={Routes.Keputusan.path}
			component={Keputusan}
		/>
		<RouteWithSidebar
			exact
			path={Routes.SpesifikasiUmumKhusus.path}
			component={SpesifikasiUmumKhusus}
		/>
		<RouteWithSidebar
			exact
			path={Routes.ManualPelaksanaan.path}
			component={ManualPelaksanaan}
		/>
		<RouteWithSidebar exact path={Routes.Sop.path} component={Sop} />
		<RouteWithSidebar exact path={Routes.Spt.path} component={Spt} />
		<RouteWithSidebar
			exact
			path={Routes.LaporanAmp.path}
			component={LaporanAmp}
		/>
		<RouteWithSidebar
			exact
			path={Routes.LaporanEmonitoring.path}
			component={LaporanEmonitoring}
		/>

		{/* components */}
		<RouteWithSidebar
			exact
			path={Routes.Accordions.path}
			component={Accordion}
		/>
		<RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
		<RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
		<RouteWithSidebar
			exact
			path={Routes.Breadcrumbs.path}
			component={Breadcrumbs}
		/>
		<RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
		<RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
		<RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
		<RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
		<RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
		<RouteWithSidebar
			exact
			path={Routes.Pagination.path}
			component={Pagination}
		/>
		<RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
		<RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
		<RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
		<RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
		<RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
		<RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

		<Redirect to={Routes.NotFound.path} />
	</Switch>
);
