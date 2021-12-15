import React from "react";
import Title from "./Title";
import AddButton from "./button/AddButton";
import LoadButton from "./button/LoadButton";
import SaveButton from "./button/SaveButton";
import SaveAsButton from "./button/SaveAsButton";

function Toolbar({_tabList, _storageTabList, _activatedTab, _editedContent, _editedTitle, setTabList, setEditedTitle, setActivatedTab, saveStorage}) {
    return (
        <div className="toolbar">
            <AddButton _tabList={_tabList} _activatedTab={_activatedTab} setTabList={setTabList}
                       setActivatedTab={setActivatedTab}/>
            <LoadButton _tabList={_tabList} _storageTabList={_storageTabList}
                        setActivatedTab={setActivatedTab} setTabList={setTabList}/>
            <SaveButton _tabList={_tabList} _activatedTab={_activatedTab} _editedContent={_editedContent}
                        saveStorage={saveStorage}/>
            <SaveAsButton _tabList={_tabList} _storageTabList={_storageTabList}
                          _activatedTab={_activatedTab} _editedTitle={_editedTitle}
                          _editedContent={_editedContent} saveStorage={saveStorage}/>
            <Title setEditedTitle={setEditedTitle}/>
        </div>
    );
}

export default Toolbar;