import React, {useEffect, useState} from 'react';
import {AppBar, Grid} from "@material-ui/core";
import '../index.scss';
import {NotepadProps, Tab} from "./comm/Comm";
import Content from "./Content";
import Title from "./Title";
import TabList from "./TabList";
import SaveAsButton from "./button/SaveAsButton";
import AddButton from "./button/AddButton";
import SaveButton from "./button/SaveButton";
import LoadButton from "./button/LoadButton";
import {fireStorage} from "../firebase";
import axios from "axios";

async function getFirebaseStorageData() {
    const storageRef = fireStorage.ref().child('data.json');
    let url = await storageRef.getDownloadURL();
    let res = await axios.get(url);
    return res.data.tabList

    // const storageRef = fireStorage.ref().child('data.json');
    // const fr = new FileReader();
    // let res;
    //
    // storageRef.getDownloadURL()
    //     .then(function (url) {
    //         const xhr = new XMLHttpRequest();
    //         xhr.responseType = "blob";
    //         xhr.onload = function (event) {
    //             const blob = xhr.response;
    //             fr.readAsText(blob);
    //         };
    //         xhr.open("GET", url);
    //         xhr.send();
    //
    //     })
    //     .catch(function (error) {
    //         // Handle any errors
    //     });
    //
    // fr.addEventListener("load", (e) => {
    //     const restored = JSON.parse(fr.result);
    // });
}


function Notepad({tabList, storageTabList, activatedTab}: NotepadProps) {
    const [_tabList, setTabList] = useState<Tab[]>(tabList);
    const [_storageTabList, setStorageTabList] = useState<Tab[]>(storageTabList);
    const [_activatedTab, setActivatedTab] = useState<Tab>(activatedTab);
    const [_editedTitle, setEditedTitle] = useState<string>('');
    const [_editedContent, setEditedContent] = useState<string>('');

    console.log(_storageTabList);

    useEffect(() => {
        async function updateStorage() {
            const res = await getFirebaseStorageData();
            setStorageTabList(res);
        }
        updateStorage();
    }, [])


    const storageRef = fireStorage.ref().child('data.json');
    // const res = storageRef.child('data.json');

    // json 데이터 저장하는 방법
    const backupData = {
        tabList: [
            {
                "title": "tab1",
                "content": "tab1 Contenta asfsadf",
                "editedContent": '',
                "isEdited": false
            },
            {
                "title": "tab2",
                "content": "tab2 123123123123",
                "editedContent": '',
                "isEdited": false
            },
            {
                "title": "tab3",
                "content": "tab3 @!#!@#@!#@!#@!#",
                "editedContent": '',
                "isEdited": false
            },
        ]
    };
    backupData.tabList.push({
        "title": "tab4",
        "content": "tab4 오마이갓 너무 졸려",
        "editedContent": '',
        "isEdited": false
    })

    const jsonString = JSON.stringify(backupData);
    const blob = new Blob([jsonString], {type: "application/json"});
    storageRef.put(blob).then(() => {
        console.log("success upload backup");
    });

    // json 데이터 가져오기


    // storageRef.listAll().then(function(res) {
    //     console.log(res);
    // }).catch(
    //     // Err handling
    // )

    // function getFirebaseStorageData() {
    //     const storageRef = fireStorage.ref().child('data.json');
    //     const fr = new FileReader();
    //     let res;
    //
    //     storageRef.getDownloadURL()
    //         .then(function (url) {
    //             const xhr = new XMLHttpRequest();
    //             xhr.responseType = "blob";
    //             xhr.onload = function (event) {
    //                 const blob = xhr.response;
    //                 fr.readAsText(blob);
    //             };
    //             xhr.open("GET", url);
    //             xhr.send();
    //
    //         })
    //         .catch(function (error) {
    //             // Handle any errors
    //         });
    //
    //     fr.addEventListener("load", (e) => {
    //         const restored = JSON.parse(fr.result);
    //         setStorageTabList(restored);
    //     });
    // }


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
            console.log(targetTab);
            console.log(_storageTabList);
            console.log(tab, '-----------------');
            // setStorageTabList([..._storageTabList, tab]);
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