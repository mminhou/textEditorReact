import React from "react";
import {Tab} from "../comm/Comm";
import {Button, Menu, MenuItem} from "@material-ui/core";

/**
 * Tab을 불러오기 위한 로직
 */

function LoadButton({_tabList, _storageTabList, setActivatedTab, setTabList}) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement>(null);

    const load = (tab: Tab) => {
        const targetTab: Tab = _tabList.find(e => e.title === tab.title);
        if (targetTab) {
            setActivatedTab(targetTab);
            handleMenuClose();
            return
        }
        setTabList([..._tabList, tab]);
        setActivatedTab(tab);
        handleMenuClose();
    };

    /**
     * load dropdown menu login -> using material ui menu
     */
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
        <div style={{display: "inline-block"}}>
            <Button className="menu-list-item" onClick={handleMenuClick}>load</Button>
            <Menu id="simple-menu"
                  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {_storageTabList.map((tab, i: number) => (
                    <MenuItem key={i} style={{width: 150}}
                              onClick={() => load(tab)}>* {tab.title}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default LoadButton;