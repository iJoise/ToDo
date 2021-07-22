import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

export type AddItemFormPropsType = {
   addItem: (title: string) => void
   disabled?: boolean
}


export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo ( ({addItem, disabled}) => {
   const [newTaskTitle, setNewTaskTitle] = useState('');
   const [error, setError] = useState<string | null>(null);

   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(event.currentTarget.value);
   };
   const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null);
      }
      if (event.key === 'Enter') {
         addNewTask();
      }
   };
   const addNewTask = () => {
      const trimmedNewTaskTitle = newTaskTitle.trim();
      if (trimmedNewTaskTitle) {
         addItem(trimmedNewTaskTitle)
      } else {
         setError('Title is required')
      }
      setNewTaskTitle('');
   };

   return (
      <div>
         <TextField
            error={!!error}
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant={"outlined"}
            label={'Type value'}
            helperText={error}
            disabled={disabled}
         />
         <IconButton onClick={addNewTask} color={"primary"} disabled={disabled}>
            <ControlPoint/>
         </IconButton>
      </div>
   )
});