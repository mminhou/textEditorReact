import React from "react";
import {Tab} from "../comm/Comm";
import {Button} from "@material-ui/core";

/**
 * Tab 생성을 위한 로직
 */

function AddButton({_tabList, _activatedTab, setTabList, setActivatedTab}) {
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
        setActivatedTab(newTab);
    };
    return (
        <Button className="menu-list-item" onClick={add}>new tab</Button>

    )
}

export default AddButton;