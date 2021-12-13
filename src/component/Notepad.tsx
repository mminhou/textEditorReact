import React, {useState} from 'react';
import {AppBar, Button, Grid, Menu, MenuItem, TextField} from "@material-ui/core";
import '../index.scss';

interface Tab {
    title: string;
    content: string;
    editedContent: string;
    isEdited: boolean;
}

interface NotepadProps {
    tabList: Tab[];
    storageTabList: Tab[];
    activatedTab?: Tab;
}

function Notepad({tabList, storageTabList, activatedTab}: NotepadProps) {
    const [_tabList, setTabList] = useState<Tab[]>(tabList);
    const [_storageTabList, setStorageTabList] = useState<Tab[]>(storageTabList);
    const [_activatedTab, setActiveTab] = useState<Tab>(activatedTab);

    const [_editedContent, setEditedContent] = useState<string>('');
    const [_editedTitle, setEditedTitle] = useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement>(null);

    /**
     * Tab 생성을 위한 로직
     */
    const add = () => {
        // 새로운 탭에 랜덤넘버 부여 -> 이미 가지고있는 탭과 동일하다면 err 발생!
        const cnt: number = Math.floor(Math.random() * 100);
        const chk: Tab = _tabList.find(e => e.title === 'tab' + cnt);
        if (chk) {
            alert('Please retry!');
            return
        }

        const newTab: Tab = {title: 'tab' + cnt, content: 'your code here.....', editedContent: '', isEdited: true};
        setTabList([..._tabList, newTab]);
        setActiveTab(newTab);
    };

    /**
     * Tab을 불러오기 위한 로직
     */
    const load = (tab: Tab) => {
        const targetTab: Tab = _tabList.find(e => e.title === tab.title);
        if (targetTab) {
            setActiveTab(targetTab);
            handleMenuClose();
            return
        }
        setTabList([..._tabList, tab]);
        setActiveTab(tab);
        handleMenuClose();

    };

    /**
     * 수정된 Tab의 data(content)를 저장하기 위한 로직
     */
    const save = () => {
        // 선택된 tab이 없는 상태에서 save 클릭시 에러발생
        if (!_activatedTab) {
            alert('The selected tab does not exist.')
            return
        }
        const targetTab: Tab = _tabList.find(e => e.title === _activatedTab.title);
        targetTab.content = _editedContent ? _editedContent : _activatedTab.content;
        targetTab.isEdited = false;
        saveStorage(targetTab);
        alert('Successful save tab data.');
    };

    /**
     * Tab을 다른 이름으로 저장하기 위한 로직
     */
    const saveAs = () => {
        if (!_activatedTab) {
            alert('Error: The selected tab does not exist.')
            return
        }

        // 이미 가지고있는 title 인 경우
        if (_storageTabList.find(e => e.title === _editedTitle)) {
            alert('Error: The title is already in use,');
            return
        }

        const targetTab = _tabList.find(e => e.title === _activatedTab.title);
        targetTab.title = _editedTitle;
        targetTab.content = _editedContent ? _editedContent : _activatedTab.content;
        targetTab.isEdited = false;
        saveStorage(targetTab);
        alert('Successful save tab data.');
    };


    /**
     * Storage에 tab을 저장하기 위한 로직
     */
    const saveStorage = (tab: Tab) => {
        const targetTab = _storageTabList.find(e => e.title === tab.title);
        if (targetTab) {
            targetTab.title = tab.title;
            targetTab.content = tab.content;
            targetTab.isEdited = false;
        } else {
            _storageTabList.push(tab);
        }
        localStorage.setItem('tabList', JSON.stringify(_storageTabList));
    }

    /**
     * Tab을 활성화 시키기위한 로직
     */
    const activate = (tab: Tab) => {
        setActiveTab(tab);
    };

    /**
     * 열려있는 Tab을 닫기위한 로직 -> localstorage에서 삭제되는 것은 아님.
     */
    const close = (tab: Tab) => {
        const targetTab: Tab = _tabList.find(e => e.title === tab.title);
        if (targetTab) {
            setTabList(_tabList.filter(t => t.title !== tab.title));
        }
        setActiveTab(undefined);
    };

    /**
     * Tab의 content가 수정되었는지 확인하기 위한 함수
     * -> onChange 메서드를 통해 event 타겟의 value가 발생하면 수정되었다고 판단 -> 수정된 tab의 title 색상을 바꿔준다.
     */
    const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 최적화하기 위한 로직 -> 이미 edited 된 상태의 tab은 return 처리
        _activatedTab.content = e.target.value;
        setEditedContent(e.target.value);
        // if (_activatedTab.isEdited) return
        // event 타겟의 value 가 발생시 수정했다고 판단 -> 활성화 된 tab의 edit flag를 바꿔준다.
        const targetTab: Tab = _tabList.find(e => e.title === _activatedTab.title);
        targetTab.isEdited = true;
    }

    /**
     * Tab 의 title 수정을 위한 field가 채워질 때, editedTitle을 수정하기 위한 로직
     */
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value);
    }

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
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <h1 onClick={() => window.location.reload()}>TEXT EDITOR</h1>
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static" style={{backgroundColor: "rgb(43, 43, 43)"}}>
                    <div className="toolbar">
                        <Button className="menu-list-item" onClick={add}>
                            new tab
                        </Button>
                        <Button className="menu-list-item" onClick={handleMenuClick}>
                            load
                        </Button>
                        <Menu id="simple-menu"
                              anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            {_storageTabList.map((tab, i: number) => (
                                <MenuItem key={i} style={{width: 150}}
                                          onClick={() => load(tab)}>* {tab.title}</MenuItem>
                            ))}
                        </Menu>
                        <Button className="menu-list-item" onClick={save}>
                            save
                        </Button>
                        <Button className="menu-list-item" onClick={saveAs}>
                            save as</Button>
                        <TextField size="small" id="outlined-size-normal" placeholder="another title"
                                   variant="outlined"
                                   onChange={onChangeTitle}>
                        </TextField>
                    </div>
                    <div style={{display: "inline-block", padding: 10}}>
                        {_tabList.map((tab, i: number) => (
                            <div key={i} className="tab-list-item"
                                 style={{width: 100 / _tabList.length + '%', float: "left"}}>
                                <Button className="tab-list-title-button" onClick={() => activate(tab)}
                                        style={{
                                            backgroundColor: _activatedTab && _activatedTab.title === tab.title ? 'rgb(116, 122, 128)' : 'rgb(43, 43, 43)',
                                            color: tab.isEdited ? 'rgb(209, 103, 90)' : 'white',
                                        }}>
                                    {tab.title}
                                </Button>
                                <Button className="tab-list-close-button" onClick={() => close(tab)}>
                                    x
                                </Button>
                            </div>
                        ))}
                    </div>
                </AppBar>
            </Grid>
            <Grid item xs={12}>
                {_tabList.map((tab, i: number) => (
                    _activatedTab && tab.title === _activatedTab.title ?
                        <TextField key={i} className="tab-content"
                                   multiline rows={50} variant="filled"
                                   defaultValue={tab.content}
                                   onChange={onChangeContent}
                        /> : ''
                ))}
            </Grid>

        </Grid>
    )
};


Notepad.defaultProps = {
    tabList: [],
    storageTabList: JSON.parse(localStorage.getItem('tabList')) || [],
    activatedTab: null,
};

export default Notepad;