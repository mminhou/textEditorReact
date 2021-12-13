import React from "react";
import {TextField} from "@material-ui/core";

function Title({setEditedTitle}) {
    /**
     * Tab 의 title 수정을 위한 field가 채워질 때, editedTitle을 수정하기 위한 로직
     */
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value);
    }

    return (
        <TextField size="small" id="outlined-size-normal" placeholder="another title"
                   variant="outlined"
                   onChange={onChangeTitle}>
        </TextField>
    );
}

export default Title;