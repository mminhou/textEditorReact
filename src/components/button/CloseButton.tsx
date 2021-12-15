import React from "react";
import {Button} from "@material-ui/core";
import {Tab} from '../../comm/Comm';

/**
 * 열려있는 Tab을 닫기위한 로직 -> localstorage에서 삭제되는 것은 아님.
 */

function CloseButton({_tabList, setTabList, tab}) {
    const close = (tab: Tab) => {
        setTabList(_tabList.filter(t => t.title !== tab.title));
    }

    return (
        <Button className="tab-list-close-button" onClick={() => close(tab)}>
            x
        </Button>
    );
}

export default CloseButton;