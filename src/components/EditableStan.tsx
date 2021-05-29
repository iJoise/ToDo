import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableStanPropsType = {
   titleForSpan: string
   onChange: (newValue: string) => void
}
export const EditableStan: React.FC<EditableStanPropsType> = ({titleForSpan, onChange}) => {
   const [editMode, setEditMode] = useState(false);
   const [title, setTitle] = useState('');

   const activateEditMode = () => {
      setEditMode(true)
      setTitle(titleForSpan)
   };
   const activateViewMode = () => {
      setEditMode(false);
      onChange(title);
   };
   const onChangeTitleSpanHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

   const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         activateViewMode();
      }
   }

   return (
      editMode
         ? <TextField
            onBlur={activateViewMode}
            value={title}
            onChange={onChangeTitleSpanHandler}
            autoFocus
            onKeyPress={onKeyPressEnterHandler}
         />
         : <span onDoubleClick={activateEditMode}>{titleForSpan}</span>
   )
}