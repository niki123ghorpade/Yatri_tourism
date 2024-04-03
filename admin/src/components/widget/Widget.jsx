import "./widget.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/${type}/count`);
            const data = await response.json();
            const countValue = data[`${type}Count`]; // Assuming your response has keys like enquiryCount, packageCount, userCount
            setCount(countValue);
        } catch (error) {
            console.error(`Error fetching ${type} count:`, error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case "users":
                return <PersonOutlinedIcon className="icon" style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }} />;
            case "packages":
                return <ShoppingCartOutlinedIcon className="icon" style={{ color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)" }} />;
            case "enquiries":
                return <AccountBalanceWalletOutlinedIcon className="icon" style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }} />;
            default:
                return null;
        }
    };

    const getTitle = (type) => {
        switch (type) {
            case "users":
                return "USERS";
            case "packages":
                return "PACKAGES";
            case "enquiries":
                return "ENQUIRIES";
            default:
                return "";
        }
    };

    const getLinkText = (type) => {
        switch (type) {
            case "users":
                return "See all Users";
            case "packages":
                return "See all Packages";
            case "enquiries":
                return "See all Enquiries";
            default:
                return "";
        }
    };

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{getTitle(type)}</span>
                <span className="counter">{count}</span>
                <Link to={`/${type}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <span className="link">{getLinkText(type)}</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {/* Diff can be added here */}
                </div>
                {getIcon(type)}
            </div>
        </div>
    );
};

export default Widget;