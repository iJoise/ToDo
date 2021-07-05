import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Task, TaskPropsType} from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";

export default {
   title: 'TODOLISTS/Task',
   component: Task,
   decorators: [ReduxStoreProviderDecorator],
} as Meta;



const Template: Story<TaskPropsType> = (args) => <Task {...args} />;



export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
   task: {id: '1', title: 'JS', isDone: true},
   todolistID: 'todolistID',
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
   task: {id: '1', title: 'JS', isDone: false},
   todolistID: 'todolistID',
}

