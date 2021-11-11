import React from 'react';
import { useWindowDimensions, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { RenderHTMLSource, Document } from 'react-native-render-html';
import { useScroller } from '../utils/scroller';

function LoadingDisplay() {
    return (
        <View style={styles.loading}>
            <ActivityIndicator color="#61dafb" size="large" />
        </View>
    )
}

const HZ_MARGIN = 10;

export default function ArticleBody({
    dom,
    scrollViewRef
}: { 
    dom: Document | null; 
    scrollViewRef: any;
}) {
    const { width } = useWindowDimensions();
    const availableWidth = Math.min(width, 500);
    const scroller = useScroller();

    return (
        <ScrollView
            {...scroller.handlers}
            style={styles.container}
            contentContainerStyle={[styles.content, { width: availableWidth }]}
            ref={scrollViewRef}
            scrollEventThrottle={100}
        >
            {dom ? (
                <RenderHTMLSource
                    contentWidth={availableWidth - 2 * HZ_MARGIN}
                    source={{ dom }} />
            ) : (
                <LoadingDisplay />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        alignSelf: "center",
        paddingHorizontal: HZ_MARGIN,
        // leave some space for the FAB
        paddingBottom: 65
    },
    loading: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
