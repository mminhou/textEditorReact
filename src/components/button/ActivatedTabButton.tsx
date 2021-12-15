import React from "react";
import {Button} from "@material-ui/core";
import {Tab} from "../../comm/Comm";

/**
 * Tab을 활성화 시키기위한 로직
 */

function ActivatedTabButton({_activatedTab, setActivatedTab, tab}) {
    const activate = (tab: Tab) => {
        setActivatedTab(tab);
    };

    return (
        <Button className="tab-list-title-button" onClick={() => activate(tab)}
                style={{
                    backgroundColor: _activatedTab && _activatedTab.title === tab.title ? 'rgb(116, 122, 128)' : 'rgb(43, 43, 43)',
                    color: tab.isEdited ? 'rgb(209, 103, 90)' : 'white',
                }}>
            {tab.title}
        </Button>
    );
}

export default ActivatedTabButton;