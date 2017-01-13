/**
 * Created by Arman on 2016-11-01.
 *
 * @flow
 */

'use strict';

var theme = require('../themes/theme-base');
var React = require('React');
var View = require('View');
var Text = require('Text');
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
                    <Image style={styles.icon} source={icon} />
                    <Text style={[styles.title, selectedTitleStyle]}>
                        {this.props.title}
                    </Text>
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
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        flex: 1,
        fontSize: 17,
        color: theme.lightText,
    },
    selectedTitle: {
        color: theme.darkText,
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
