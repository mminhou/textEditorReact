import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import Title from "./Title";

function Toolbar({anchorEl, add, handleMenuClick, handleMenuClose, _storageTabList, load, save, saveAs, setEditedTitle}) {
    return (
        <div className="toolbar">
            <Button className="menu-list-item" onClick={add}>new tab</Button>
            <Button className="menu-list-item" onClick={handleMenuClick}>load</Button>
            <Menu id="simple-menu"
                  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {_storageTabList.map((tab, i: number) => (
                    <MenuItem key={i} style={{width: 150}}
                              onClick={() => load(tab)}>* {tab.title}</MenuItem>
                ))}
            </Menu>
            <Button className="menu-list-item" onClick={save}>save</Button>
            <Button className="menu-list-item" onClick={saveAs}>save as</Button>
            <Title setEditedTitle={setEditedTitle}/>
        </div>
    );
}

export default Toolbar;