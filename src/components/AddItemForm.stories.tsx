import React from 'react';
import { Story, Meta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import '../App.scss'

export default {
   title: 'AddItemForm/AddItemForm',
   component: AddItemForm,
   argTypes: {
   },
} as Meta;

const callback = action('Text added')

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;
export const AddInput = Template.bind({})
AddInput.args = {
   addItem: callback
}


