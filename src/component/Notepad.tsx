import React, {useState} from 'react';
import {AppBar, Button, Grid, Menu, MenuItem, TextField} from "@material-ui/core";
import '../index.scss';
import {NotepadProps, Tab} from "./comm/Comm";
import Content from "./Content";
import Title from "./Title";
import TabList from "./TabList";
import SaveAsButton from "./button/SaveAsButton";
import AddButton from "./button/AddButton";
import SaveButton from "./button/SaveButton";
import LoadButton from "./button/LoadButton";

function Notepad({tabList, storageTabList, activatedTab}: NotepadProps) {
    const [_tabList, setTabList] = useState<Tab[]>(tabList);
    const [_storageTabList, setStorageTabList] = useState<Tab[]>(storageTabList);
    const [_activatedTab, setActivatedTab] = useState<Tab>(activatedTab);

    const [_editedTitle, setEditedTitle] = useState<string>('');
    const [_editedContent, setEditedContent] = useState<string>('');


    /**
     * Storage에 tab을 저장하기 위한 로직
     */
    const saveStorage = (tab: Tab) => {
        const targetTab: Tab = _storageTabList.find(e => e.title === tab.title);
        if (targetTab) {
            targetTab.title = tab.title;
            targetTab.content = tab.content;
            targetTab.isEdited = false;
        } else {
            console.log(_storageTabList);
            setStorageTabList([..._storageTabList, tab]);
            console.log(_storageTabList);
            // _storageTabList.push(tab);
        }
        localStorage.setItem('tabList', JSON.stringify(_storageTabList));
    }

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <h1 onClick={() => window.location.reload()}>TEXT EDITOR</h1>
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static" style={{backgroundColor: "rgb(43, 43, 43)"}}>
                    <div className="toolbar">
                        <AddButton _tabList={_tabList} _activatedTab={_activatedTab} setTabList={setTabList} setActivatedTab={setActivatedTab}/>
                        <LoadButton _tabList={_tabList} _storageTabList={_storageTabList} setActivatedTab={setActivatedTab} setTabList={setTabList} />
                        <SaveButton _tabList={_tabList} _activatedTab={_activatedTab} _editedContent={_editedContent} saveStorage={saveStorage} />
                        <SaveAsButton _tabList={_tabList} _storageTabList={_storageTabList} _activatedTab={_activatedTab} _editedTitle={_editedTitle} _editedContent={_editedContent} saveStorage={saveStorage} />
                        <Title setEditedTitle={setEditedTitle} />
                    </div>
                    <TabList _tabList={_tabList} _activatedTab={_activatedTab} setTabList={setTabList} setActivatedTab={setActivatedTab} />
                </AppBar>
            </Grid>
            <Content _tabList={_tabList} _activatedTab={_activatedTab} setEditedContent={setEditedContent} />
        </Grid>
    )
};

Notepad.defaultProps = {
    tabList: [],
    storageTabList: JSON.parse(localStorage.getItem('tabList')) || [],
    activatedTab: null,
};

export default Notepad;