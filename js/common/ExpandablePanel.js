import {StyleSheet, View, Image, TouchableOpacity, Animated} from 'react-native';
import React, {Component} from 'react';
import {Card, CardItem} from 'native-base';
var { Text } = require('./FmText');

class ExpandablePanel extends Component{
    static propTypes = {
        headerItem: React.PropTypes.element,
    }

    constructor(props){
        super(props);

        this.state = {
            title       : props.title,
            expanded    : true,
            animation   : new Animated.Value()
        };
    }

    toggle(){
        let initialValue    = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){

        if(this.state.expanded){
            // icon = this.icons['up'];
        }

        return (
            <Animated.View 
                style={[styles.container, {height: this.state.animation}]}>
                <Card>
                    <CardItem style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                        <TouchableOpacity
                            onPress={this.toggle.bind(this)}
                            underlayColor="#f1f1f1"
                            style={{flex:1}}>
                            <View style={{flex:1}}>
                                {this.props.headerItem}
                            </View>
                        </TouchableOpacity>
                    </CardItem>
                    
                    <CardItem onLayout={this._setMaxHeight.bind(this)}>
                        {this.props.children}
                    </CardItem>
                </Card>
            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        margin:10,
        overflow:'hidden'
    },
    titleContainer : {
        flex: 1,
        flexDirection: 'row'
    },
    button      : {

    },
});

module.exports = ExpandablePanel;