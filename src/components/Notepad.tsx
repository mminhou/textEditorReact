import React, {useEffect, useState} from 'react';
import {AppBar, Grid} from "@material-ui/core";
import '../index.scss';
import {findTargetTab, NotepadProps, Tab} from "../comm/Comm";
import {getFirebaseStorageData, setFirebaseStorageData} from "../services/firebaseStorage";
import Content from "./Content";
import TabList from "./TabList";
import Toolbar from "./Toolbar";

function Notepad({tabList, storageTabList, activatedTab}: NotepadProps) {
    const [_tabList, setTabList] = useState<Tab[]>(tabList);
    const [_storageTabList, setStorageTabList] = useState<Tab[]>(storageTabList);
    const [_activatedTab, setActivatedTab] = useState<Tab>(activatedTab);
    const [_editedTitle, setEditedTitle] = useState<string>('');
    const [_editedContent, setEditedContent] = useState<string>('');

    useEffect(() => {
        // firebase storage에서 data를 읽어 _storageTabList에 넣어준다.
        async function updateStorage() {
            const res = await getFirebaseStorageData();
            setStorageTabList(res);
        }
        updateStorage();
    }, [_storageTabList])


    /**
     * Storage에 tab을 저장하기 위한 로직 -> firebase storage로 고도화
     */
    const saveStorage = (tab: Tab) => {
        const res = findTargetTab(_storageTabList, tab.title);
        if (res) {
            res.title = tab.title;
            res.content = tab.content;
            res.isEdited = false;
        } else {
            // setStorageTabList([..._storageTabList, tab]);
            _storageTabList.push(tab);
        }
        setFirebaseStorageData(_storageTabList);
    }

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <h1 onClick={() => window.location.reload()}>TEXT EDITOR</h1>
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static" style={{backgroundColor: "rgb(43, 43, 43)"}}>
                    <Toolbar _tabList={_tabList} setTabList={setTabList}
                             _storageTabList={_storageTabList}
                             _activatedTab={_activatedTab} setActivatedTab={setActivatedTab}
                             _editedContent={_editedContent}
                             _editedTitle={_editedTitle} setEditedTitle={setEditedTitle}
                             saveStorage={saveStorage} />
                    <TabList _tabList={_tabList} setTabList={setTabList}
                             _activatedTab={_activatedTab} setActivatedTab={setActivatedTab}/>
                </AppBar>
            </Grid>
            <Content _tabList={_tabList}
                     _activatedTab={_activatedTab}
                     setEditedContent={setEditedContent}/>
        </Grid>
    )
};

Notepad.defaultProps = {
    tabList: [],
    storageTabList: [],
    activatedTab: null,
};

export default Notepad;