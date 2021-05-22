import React, {ChangeEvent, useState} from "react";

type EditableStanPropsType = {
   titleForSpan: string
   onChange: (newValue: string) => void
}
export const EditableStan: React.FC<EditableStanPropsType> = ({titleForSpan,onChange}) => {
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

   return (
      editMode
         ? <input
            onBlur={activateViewMode}
            value={title}
            onChange={onChangeTitleSpanHandler}
            autoFocus/>
         : <span onDoubleClick={activateEditMode}>{titleForSpan}</span>
   )
}