
import React, { Component } from 'react';
import { connect } from 'react-redux';

var { Text } = require('../../common/FmText');
import styles from './styles';
import { Button, View } from 'native-base';
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome';



class About extends Component {
  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const navigator = this.props.navigator;

  }

  componentDidMount()
  {
      
  }

  render() { 
    return (
        <View>
            <Text>Hello </Text>
        </View>

    );
  }
}


function bindActions(dispatch) {
  return {
  };
}

const mapStoreToProps = store => ({
});

export default connect(mapStoreToProps, bindActions)(About);
