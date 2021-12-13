export interface NotepadProps {
    tabList: Tab[];
    storageTabList: Tab[];
    activatedTab?: Tab;
}

export interface Tab {
    title: string;
    content: string;
    editedContent: string;
    isEdited: boolean;
}
