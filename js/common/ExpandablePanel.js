import {StyleSheet, View, Image, TouchableOpacity, Animated} from 'react-native';
import React, {Component} from 'react';
import {Card, CardItem} from 'native-base';
var { Text } = require('./FmText');

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
            didSetMaxHeight: false,
            minHeight: 0,
        };
        this.init = this.init.bind(this);
        
    }

    componentDidMount()
    {
        
    }
    
    init()
    {
        let initialValue    = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.state.animation.setValue(initialValue);
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

        if(this.state.expanded){
            // icon = this.icons['up'];
        }

        return (
            
                <Card style={styles.container}>
                    <CardItem style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                        <TouchableOpacity
                            onPress={this.toggle.bind(this)}
                            underlayColor="#959595"
                            style={{flex:1}}>
                            <View style={{flex:1}}>
                                {this.props.headerItem}
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
        overflow:'hidden',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    titleContainer : {
        flex: 1,
        flexDirection: 'row',
    },
    button      : {

    },
});

module.exports = ExpandablePanel;