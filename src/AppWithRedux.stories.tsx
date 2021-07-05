import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AppWithRedux} from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
   title: 'TODOLISTS/AppWithRedux',
   component: AppWithRedux,
   decorators: [ReduxStoreProviderDecorator],
   argTypes: {}
} as Meta;


const Template: Story = () => <AppWithRedux />;


export const AppWithReduxExample = Template.bind({})



