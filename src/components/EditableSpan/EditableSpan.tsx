import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
   titleForSpan: string
   onChange: (newValue: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {
   const {titleForSpan, onChange} = props;

   const [editMode, setEditMode] = useState(false);
   const [title, setTitle] = useState('');

   const activateEditMode = () => {
      setEditMode(true);
      setTitle(titleForSpan);
   };
   const activateViewMode = useCallback(() => {
      if (title.trim()) {
         setEditMode(false);
         onChange(title);
      }

   },[onChange, title]);
   const onChangeTitleSpanHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

   const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         activateViewMode();
      }
   };

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
});