import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { TabularView } from './tabularView';

export class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>AttQL</h1>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Tabular View</Tab>
                        <Tab>Hierarchical View</Tab>
                        <Tab>Timeline View</Tab>
                    </TabList>

                    <TabPanel>
                        <TabularView pageNo={1} rowCount={10}></TabularView>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h1>Praveen_Fuck</h1>
                    </TabPanel>
                </Tabs>
            </div>);
    }
};