import React, {useEffect, useState} from 'react';
import {AppBar, Grid} from "@material-ui/core";
import '../index.scss';
import {NotepadProps, Tab} from "./comm/Comm";
import Title from "./Title";
import Content from "./Content";
import TabList from "./TabList";
import SaveAsButton from "./button/SaveAsButton";
import AddButton from "./button/AddButton";
import SaveButton from "./button/SaveButton";
import LoadButton from "./button/LoadButton";
import {fireStorage} from "../firebase";
import axios from "axios";

/**
 * Firebase storage GET method (read data.json)
 */
async function getFirebaseStorageData() {
    const storageRef = fireStorage.ref().child('data.json');
    const url = await storageRef.getDownloadURL();
    const res = await axios.get(url);
    return res.data
}

/**
 * Firebase storage POST method
 */
function setFirebaseStorageData(newData: Tab[]) {
    const storageRef = fireStorage.ref().child('data.json');
    const jsonString = JSON.stringify(newData);
    const blob = new Blob([jsonString], {type: "application/json"});
    storageRef.put(blob).then(() => {
        console.log("success upload data to firebase storage");
    });
}


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
        const targetTab: Tab = _storageTabList.find(e => e.title === tab.title);
        if (targetTab) {
            targetTab.title = tab.title;
            targetTab.content = tab.content;
            targetTab.isEdited = false;
        } else {
            console.log(_storageTabList);
            console.log(tab, '-----------------');
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
                    <div className="toolbar">
                        <AddButton _tabList={_tabList} _activatedTab={_activatedTab} setTabList={setTabList}
                                   setActivatedTab={setActivatedTab}/>
                        <LoadButton _tabList={_tabList} _storageTabList={_storageTabList}
                                    setActivatedTab={setActivatedTab} setTabList={setTabList}/>
                        <SaveButton _tabList={_tabList} _activatedTab={_activatedTab} _editedContent={_editedContent}
                                    saveStorage={saveStorage}/>
                        <SaveAsButton _tabList={_tabList} _storageTabList={_storageTabList}
                                      _activatedTab={_activatedTab} _editedTitle={_editedTitle}
                                      _editedContent={_editedContent} saveStorage={saveStorage}/>
                        <Title setEditedTitle={setEditedTitle}/>
                    </div>
                    <TabList _tabList={_tabList} _activatedTab={_activatedTab} setTabList={setTabList}
                             setActivatedTab={setActivatedTab}/>
                </AppBar>
            </Grid>
            <Content _tabList={_tabList} _activatedTab={_activatedTab} setEditedContent={setEditedContent}/>
        </Grid>
    )
};

Notepad.defaultProps = {
    tabList: [],
    storageTabList: [],
    activatedTab: null,
};

export default Notepad;