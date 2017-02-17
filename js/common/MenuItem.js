/**
 * Created by Arman on 2016-11-01.
 *
 * @flow
 */

'use strict';

var theme = require('../themes/theme-base');
var React = require('React');
var View = require('View');
var { Text } = require('./FmText');
var Image = require('Image');
var StyleSheet = require('StyleSheet');
var FmTouchable = require('TouchableNativeFeedback');


class MenuItem extends React.Component {
    props: {
        icon: number;
        selectedIcon: number;
        selected: boolean;
        title: string;
        badge: ?string;
        onPress: () => void;
    };



    render() {
        var icon = this.props.selected ? this.props.selectedIcon : this.props.icon;
        var selectedTitleStyle = this.props.selected && styles.selectedTitle;
        var badge;
        if (this.props.badge) {
            badge = (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {this.props.badge}
                    </Text>
                </View>
            );
        }
        return (
            <FmTouchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Text style={[styles.title, selectedTitleStyle]}>
                        {this.props.title}
                    </Text>
                    <View style={styles.icon}>
                        {icon}
                    </View>
                    {badge}
                </View>
            </FmTouchable>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    icon: {
        marginRight: 7,
    },
    title: {
        flex: 1,
        fontSize: 17,
        color: '#032250',
        marginRight:13,
    },
    selectedTitle: {
        color: '#7F91A7',
    },
    badge: {
        backgroundColor: '#DC3883',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
    },
});

module.exports = MenuItem;
