import ProgressBar from "./modules/ProgressBar";
import IsotopeLayout from "./modules/IsotopeLayout";
import Home from "./modules/Home";
import CustomClasses from "./modules/CustomClasses";
import SidebarNav from "./modules/SidebarNav";
import Search from "./modules/Search";
import SinglePost from "./modules/SinglePost";
import Logo from "./modules/Logo";
import { preloader } from "./modules/Helpers";
import $ from "jquery";
//import { objectFitIEFix } from "./modules/Helpers";

import { newContainer } from "./modules/PageTransitions";

const isotopeLayout = new IsotopeLayout();
// const progressBar = new ProgressBar();
const home = new Home();
const customClasses = new CustomClasses();
const sidebarNav = new SidebarNav();
const search = new Search();
const singlePost = new SinglePost();

const logo = new Logo($(".word"));

preloader();
//objectFitIEFix();

newContainer.init();
