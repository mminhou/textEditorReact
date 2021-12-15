import React from "react";
import CloseButton from "./button/CloseButton";
import ActivatedTabButton from "./button/ActivatedTabButton";

function TabList({_tabList, _activatedTab, setTabList, setActivatedTab}) {
    return (
        <div style={{display: "inline-block", padding: 10}}>
            {_tabList.map((tab, i: number) => (
                <div key={i} className="tab-list-item" style={{width: 100 / _tabList.length + '%', float: "left"}}>
                    <ActivatedTabButton _activatedTab={_activatedTab} setActivatedTab={setActivatedTab} tab={tab} />
                    <CloseButton _tabList={_tabList} tab={tab} setTabList={setTabList} />
                </div>
            ))}
        </div>
    );
}

export default TabList;