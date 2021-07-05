import React from 'react';
import { Story, Meta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
   title: 'TODOLISTS/AddItemForm',
   component: AddItemForm,
   argTypes: {
      onClick: {
         description: 'Button clicked inside component'
      }
   },
} as Meta;

const callback = action('Button clicked inside component')

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;
export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
   addItem: callback
}


