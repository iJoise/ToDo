import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

export default {
   title: 'TODOLISTS/EditableSpan',
   component: EditableSpan,
   argTypes: {
      onClick: {
         description: 'Value EditableSpan changed'
      },
      value: {
         defaultValue: 'HTML',
         description: 'Start value EditableSpan'
      }
   },
} as Meta;

const callback = action('Value EditableSpan changed')

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;
export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
   onChange: callback,
   titleForSpan: 'HTML'
}


