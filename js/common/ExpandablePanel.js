import {StyleSheet, View, Image, TouchableOpacity, Animated, Easing} from 'react-native';
import React, {Component} from 'react';
import {Card, CardItem} from 'native-base';
var { Text } = require('./FmText');
import Icon from 'react-native-vector-icons/Ionicons';


class ExpandablePanel extends Component{
    static propTypes = {
        headerItem: React.PropTypes.element,
    }

  static defaultProps = {
    ...Component.defaultProps,
    expanded: true,
  }

    constructor(props){
        super(props);


        this.state = {
            title       : props.title,
            expanded    : props.expanded,
            didUserInteract: false,
            animation   : new Animated.Value(),
            rotateAnimation: new Animated.Value(0),
            didSetMaxHeight: false,
            minHeight: 0,
        };
        
    }

    componentDidMount()
    {
        
    }
    

    toggle(){
        
        let initialValue    = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            didUserInteract: true,
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        let springAnim = Animated.spring(
            this.state.animation,
            {
                toValue: finalValue,
                overshootClamping: false,
                bounciness: 0,
                speed: 10
            }
        );

        this.state.animation.addListener(() => {
            this.props.onToggle && this.props.onToggle();
        });

        springAnim.start(() => {this.props.onToggle && this.props.onToggle()});
        

        this.state.rotateAnimation.setValue(this.state.expanded ? 100 : 0);

        Animated.timing(
            this.state.rotateAnimation,
        {
            toValue: this.state.expanded ? 0 : 100,
            duration: 400,
            easing: Easing.linear
        }
        ).start()

    }

    _setMaxHeight(event){
        if (!this.state.didSetMaxHeight)
        {
            this.setState({
                maxHeight   : event.nativeEvent.layout.height,
                didSetMaxHeight: true,
            });
        }
    }

    _setMinHeight(event){
        // this.setState({
        //     minHeight   : 0
        // });
    }

    render(){
        var interpolatedRotateAnimation = this.state.rotateAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg']
        });

        let icon = <Animated.View style={[styles.arrowIcon, {
            transform: [
                {translateX: 0},
                {rotate: interpolatedRotateAnimation},
                {translateY: 0}
                ] }]}>
                     <Icon name="ios-arrow-dropdown" size={20} color="#858585" />
                    </Animated.View>;

        return (
            
                <Card style={styles.container}>
                    <CardItem style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                        <TouchableOpacity
                            onPress={this.toggle.bind(this)}
                            underlayColor="#959595"
                            style={{flex:1}}>
                            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                {this.props.headerItem}
                                {icon}
                            </View>
                        </TouchableOpacity>
                    </CardItem>
                    
                    <Animated.View 
                        style={[{height: this.state.animation}, !this.state.didUserInteract && !this.state.expanded ? {position: 'absolute', top: -2000} : {}]}>
                        <CardItem onLayout={this._setMaxHeight.bind(this)}>
                            {this.props.children}
                        </CardItem>
                    </Animated.View>
                </Card>
            
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    titleContainer : {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#ececec"
    },
    button      : {

    },
    arrowIcon: {
        marginLeft: 5
    }
});

module.exports = ExpandablePanel;