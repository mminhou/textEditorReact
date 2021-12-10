import React, {useRef, useState} from 'react';
import {
    AppBar,
    Button,
    Grid,
    Icon,
    IconButton, Menu, MenuItem,
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
    // 임시 cnt number
    cnt: number;
}

function Notepad({tabList, activatedTab}: NotepadProps) {
    const [_tabList, setTabList] = useState<Tab[]>(tabList);
    const [_activatedTab, setActiveTab] = useState<Tab>(activatedTab);
    const [_editedContent, setEditedContent] = useState<string>('');
    const [_cnt, setCnt] = useState<number>(4);
    const inputRef = useRef<HTMLInputElement>(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    /**
     * Tab 생성을 위한 로직
     */
    const add = () => {
        const t: Tab = {title: 'tab' + _cnt, content: 'new tab content', editedContent: ' ', isEdited: false};
        setCnt(_cnt + 1);
        setTabList([..._tabList, t]);
        setActiveTab(t);
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
        // 선택된 tab이 없는 상태에서 save 클릭시 에러창
        if (!_activatedTab) {
            alert('Error no choose Tab')
            return
        }
        const storageTabList = JSON.parse(localStorage.getItem('tabList'));
        const targetTab = storageTabList.find(e => e.title === _activatedTab.title);
        // targetTab이 있으면 content만 변경, 없으면 storage에 새로운 tab data 추가
        if (targetTab) {
            if (_editedContent) {
                targetTab.content = _editedContent;
            }
        } else {
            storageTabList.push(_activatedTab);
        }
        // 현재 state tabList에서 해당 tab의 indicator 제거하기 위함.
        localStorage.setItem('tabList', JSON.stringify(storageTabList));
        alert('success');
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
        console.log('activate');
        setActiveTab(tab);
    };

    /**
     * 열려있는 Tab을 닫기위한 로직 -> localstorage에서 삭제되는 것은 아님.
     */
    const close = (tab: Tab) => {
        console.log('Press close tab button!');
        const targetTab: Tab = _tabList.find(e => e.title === tab.title);
        if (_tabList.includes(targetTab)) {
            setTabList(_tabList.filter(t => t.title !== tab.title));
        }
        setActiveTab(undefined);
    };

    /**
     * Tab의 content가 수정되었는지 확인하기 위한 함수
     * -> onChange 메서드를 통해 event 타겟의 value가 발생하면 수정되었다고 판단 -> 수정된 tab의 title 색상을 바꿔준다.
     */
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedContent(e.target.value);
        // 최적화하기 위한 로직 -> 이미 edited 된 상태의 tab은 return 처리
        if (_activatedTab.isEdited) return
        // event 타겟의 value 가 발생시 수정했다고 판단 -> 활성화 된 tab의 edit flag를 바꿔준다.
        if (e.target.value !== _activatedTab.content) {
            const targetTab: Tab = _tabList.find(e => e.title === _activatedTab.title);
            targetTab.isEdited = true;
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
                <h1 onClick={() => window.location.reload()}>TEXT EDITOR</h1>
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static" style={{backgroundColor: "rgb(43, 43, 43)"}}>
                    <div className="toolbar">
                        <Button className="menu-list-item" onClick={add}>new tab</Button>

                        <Button className="menu-list-item"
                                onClick={handleClick}>load</Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>

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
                                        style={{
                                            backgroundColor: _activatedTab && _activatedTab.title === tab.title ? 'rgb(116, 122, 128)' : 'rgb(43, 43, 43)',
                                            color: tab.isEdited ? 'rgb(209, 103, 90)' : 'white'
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
                    <TextField key={i} className="tab-content"
                               multiline rows={50} variant="filled" fullWidth
                               style={{display: _activatedTab && (tab.title === _activatedTab.title) ? 'block' : 'none'}}
                               defaultValue={tab.content}
                               onChange={onChange}
                               ref={inputRef}
                    />
                ))}
            </Grid>

        </Grid>
    )
};


// {_activatedTab ?
//                     <TextField multiline rows={50} variant="filled" style={{width: '80%'}}
//                                defaultValue={_activatedTab.content}/>
//
//                     :
//                     <TextField multiline rows={50} variant="filled" style={{width: '80%'}}/>
//                 }

Notepad.defaultProps = {
    tabList: JSON.parse(localStorage.getItem('tabList')) || [],
    // tabList:
    //     [
    //     {title: 'tab1', content: 'asdfsadfsdafsdaf', editedContent: '', isEdited: false},
    //     {title: 'tab2', content: '12312321313', editedContent: '', isEdited: false},
    //     {title: 'tab3', content: '!@#!@#!@#@!#!#%$#%', editedContent: '', isEdited: false},
    // ]
    // ,
    activatedTab: null,
};

export default Notepad;