import { useEffect, useState } from "react";
import AddContentModal from "../components/ui/AddContentModal";
import Sidebar from "../components/ui/Sidebar";
import useContent from "../hooks/useContent";
import { ToastContainer } from "react-toastify";
import PopUpModal from "../components/ui/PopUpModal";
import { shareModalText, shareModalTitle } from "../config/config";
import Header from "../components/ui/Header";
import ContentSection from "../components/ui/ContentSection";
import filterData from "../utils/filterData";
import { useSelector } from "react-redux";
import { RootState } from "../config/redux/store";
import { Content } from "../config/redux/contentSlice";
import Plus from "../components/Icons/Plus";

const Dashboard = () => {
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filterContent, setFilterContent] = useState("My Mind");
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);



}