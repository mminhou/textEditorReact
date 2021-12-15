import React from "react";
import {TextField} from "@material-ui/core";
import {findTargetTab, Tab} from "./comm/Comm";

/**
 * Tab의 content가 수정되었는지 확인하기 위한 함수
 * -> onChange 메서드를 통해 event 타겟의 value가 발생하면 수정되었다고 판단 -> 수정된 tab의 title 색상을 바꿔준다.
 */

function Content({_tabList, _activatedTab, setEditedContent}) {
    const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 최적화하기 위한 로직 -> 이미 edited 된 상태의 tab은 return 처리
        _activatedTab.content = e.target.value;
        setEditedContent(e.target.value);
        // if (_activatedTab.isEdited) return
        // event 타겟의 value 가 발생시 수정했다고 판단 -> 활성화 된 tab의 edit flag를 바꿔준다.
        const targetTab: Tab = findTargetTab(_tabList, _activatedTab.title);
        targetTab.isEdited = true;
    }

    return (
        _tabList.map((tab, i: number) => (
            _activatedTab && tab.title === _activatedTab.title ?
                <TextField key={i} className="tab-content"
                           multiline rows={50} variant="filled"
                           defaultValue={tab.content}
                           onChange={onChangeContent}
                /> : ''
        ))
    )
}


export default Content;