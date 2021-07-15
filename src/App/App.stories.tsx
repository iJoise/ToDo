import React from 'react';
import {Meta, Story} from '@storybook/react';
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
   title: 'TODOLISTS/App',
   component: App,
   decorators: [ReduxStoreProviderDecorator],
   argTypes: {}
} as Meta;


const Template: Story = () => <App />;


export const AppWithReduxExample = Template.bind({})



