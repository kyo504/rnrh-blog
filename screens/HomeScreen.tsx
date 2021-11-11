import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { DrawerLayout } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import FeedItemDisplay from '../components/FeedItemDisplay';
import useRssFeed from '../hooks/useRssFeed';
import { FeedItem } from '../shared-types';

function Separator() {
    return <View style={{ height: 10 }} />;
}

const renderItem: ListRenderItem<FeedItem> = function renderItem({ item }) {
    return <FeedItemDisplay item={item} />;
}

export default function HomeScreen() {
    const { items, refresh, isRefreshing } = useRssFeed('https://reactnative.dev/blog/rss.xml');

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <FlatList
                onRefresh={refresh}
                refreshing={isRefreshing}
                data={items}
                renderItem={renderItem}
                ListFooterComponent={Separator}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={Separator}
            />
        </SafeAreaView>
    )
}
