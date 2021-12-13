import React from "react";
import {Tab} from "../comm/Comm";
import {Button} from "@material-ui/core";

/**
 * Tab을 다른 이름으로 저장하기 위한 로직
 */

function SaveAsButton({_tabList, _storageTabList, _activatedTab, _editedTitle, _editedContent, saveStorage}) {
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

        const targetTab: Tab = _tabList.find(e => e.title === _activatedTab.title);
        targetTab.title = _editedTitle;
        targetTab.content = _editedContent ? _editedContent : _activatedTab.content;
        targetTab.isEdited = false;
        saveStorage(targetTab);
        alert('Successful save tab data.');
    };

    return (
        <Button className="menu-list-item" onClick={saveAs}>save as</Button>
    );
}

export default SaveAsButton;