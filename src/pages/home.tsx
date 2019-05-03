import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { TabularView } from './tabularView';
import { TimelineView } from './timelineView';
import { HierarchicalView } from './hierarchicalView';
import { AddRecordView } from './addRecord';

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
                        <Tab>Add Record</Tab>
                    </TabList>

                    <TabPanel>
                        <TabularView></TabularView>
                    </TabPanel>
                    <TabPanel>
                        <HierarchicalView />
                    </TabPanel>
                    <TabPanel>
                        <TimelineView />
                    </TabPanel>
                    <TabPanel>
                        <AddRecordView />
                    </TabPanel>
                </Tabs>
            </div>);
    }
};