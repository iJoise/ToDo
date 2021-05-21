import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
   addItem: (title: string) => void
}


export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {

   const [newTaskTitle, setNewTaskTitle] = useState('');
   const [error, setError] = useState<string | null>(null);

   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(event.currentTarget.value);
   };
   const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
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
         <input
            className={error ? 'error' : ''}
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
         />
         <button onClick={addNewTask}>+</button>
         {error && <div className='error-message'>{error}</div>}
      </div>
   )
}