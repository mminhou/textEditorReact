import React, {useState} from 'react';
import {
    AppBar,
    Button,
    Grid,
    Icon,
    IconButton,
    TextField,
} from "@material-ui/core";
import '../index.scss';

interface Tab {
    title: string;
    content: string;
    editedContent: string;
    isEdited: boolean;
}

interface NotepadProps {
    tabList: Tab[];
    activatedTab?: Tab;
    cnt: number;
}

function Notepad({tabList, activatedTab, cnt}: NotepadProps) {
    const [_tabList, setTabList] = useState(tabList);
    const [_activatedTab, setActiveTab] = useState(activatedTab);
    const [_cnt, setCnt] = useState(cnt);

    /**
     * Tab 생성을 위한 로직
     */
    const add = () => {
        const t: Tab = {title: 'tab' + _cnt, content: 'new tab content', editedContent: ' ', isEdited: false};
        setCnt(_cnt + 1);
        setTabList([..._tabList, t]);
        console.log('new tab button');
    };

    /**
     * Tab을 불러오기 위한 로직
     */
    const load = () => {
        console.log(localStorage.getItem('tabList'));
        console.log('load tab button');
    };

    /**
     * 수정된 Tab의 data(content)를 저장하기 위한 로직
     */
    const save = () => {
        console.log('save data');
    };

    /**
     * Tab을 다른 이름으로 저장하기 위한 로직
     */
    const saveAs = () => {
        console.log('save as data');
    };

    /**
     * Tab을 활성화 시키기위한 로직
     */
    const activate = (tab: Tab) => {
        setActiveTab(tab);
        console.log('activate');
    };

    /**
     * 열려있는 Tab을 닫기위한 로직
     */
    const close = (tab: Tab) => {
        console.log('Press close tab button!');
        const targetTab: Tab = _tabList.find(e => e.title === tab.title);
        if (_tabList.includes(targetTab)) {
            setTabList(_tabList.filter(t => t.title !== tab.title));
        }
        setActiveTab(undefined);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <h1 onClick={() => window.location.reload()}>TEXT EDITOR</h1>
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static" style={{backgroundColor: "rgb(43, 43, 43)"}}>
                    <div className="toolbar">
                        <Button className="menu-list-item" onClick={add}>new tab</Button>
                        <Button className="menu-list-item" onClick={load}>load</Button>
                        <Button className="menu-list-item" onClick={save}>save</Button>
                        <Button className="menu-list-item" onClick={saveAs}>save as</Button>
                        <TextField size="small" id="outlined-size-normal" defaultValue="another title"
                                   variant="outlined">
                        </TextField>
                    </div>
                    <div style={{display: "inline-block", padding: 10}}>
                        {_tabList.map((tab, i: number) => (
                            <div key={i} className="tab-list-item"
                                 style={{width: 100 / _tabList.length + '%', float: "left"}}>
                                <Button className="tab-list-title-button" onClick={() => activate(tab)}
                                        style={{backgroundColor: _activatedTab && _activatedTab.title === tab.title ? 'rgb(136, 136, 136)' : 'rgb(43, 43, 43)'}}>
                                    {tab.title}
                                </Button>
                                <Button className="tab-list-close-button" onClick={() => close(tab)}>
                                    x
                                </Button>
                            </div>
                            // <Button className="tab-list-item" key={i} onClick={activate}
                            //         style={{width: 100/_tabList.length+'%'}}>{tab.title}
                            //     <Button style={{marginLeft: 20}} onClick={close}>x</Button>
                            // </Button>
                        ))}
                    </div>
                </AppBar>
            </Grid>
            <Grid item xs={12}>
                {_activatedTab ?
                    <TextField multiline rows={50} variant="filled" style={{width: '80%'}} value={_activatedTab.content} /> :
                    <TextField multiline rows={50} variant="filled" style={{width: '80%'}} defaultValue="No choose tab." />
                }
            </Grid>

        </Grid>
    )
};


Notepad.defaultProps = {
    // tabList: JSON.parse(localStorage.getItem('tabList')) || [],
    tabList: [
        {title: 'tab1', content: 'asdfsadfsdafsdaf', editedContent: '', isEdited: false},
        {title: 'tab2', content: '12312321313', editedContent: '', isEdited: false},
        {title: 'tab3', content: '!@#!@#!@#@!#!#%$#%', editedContent: '', isEdited: false},
    ],
    activatedTab: null,
    cnt: 4
};

export default Notepad;