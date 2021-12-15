import React from "react";
import {Button} from "@material-ui/core";
import {findTargetTab, Tab} from "../comm/Comm";

/**
 * 수정된 Tab의 data(content)를 저장하기 위한 로직
 */

function SaveButton({_tabList, _activatedTab, _editedContent, saveStorage}) {
    const save = () => {
        // 선택된 tab이 없는 상태에서 save 클릭시 에러발생
        if (!_activatedTab) {
            alert('The selected tab does not exist.')
            return
        }
        const targetTab: Tab = findTargetTab(_tabList, _activatedTab.title);
        targetTab.content = _editedContent ? _editedContent : _activatedTab.content;
        targetTab.isEdited = false;
        saveStorage(targetTab);
        alert('Successful save tab data.');
    };

    return (
        <Button className="menu-list-item" onClick={save}>save</Button>
    );
}

export default SaveButton;