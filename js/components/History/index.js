
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, View } from 'native-base';
const { Text, Heading1, Heading2, Paragraph } = require('../../common/FmText');
const FmHeader = require('../../common/FmHeader');

import styles from './styles';
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome';



class History extends Component {
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

    const content = (
      <View style={styles.content}>
        <Heading2 style={{}}>تاریخچه</Heading2>

      </View>
    );


    return (
      <Container>
        <View style={styles.container}>
          <FmHeader
              style={styles.header}
              rightItem={{
                  layout: 'icon',
                  title: 'Menu',
                  icon: require('../../common/img/hamburger.png'),
                  onPress: () => this.props.openDrawer(),
              }}
              >
              <View style={styles.headerContent}>
                  <View><Text style={styles.headerContentText}>{I18n.t("Common.AppName")}</Text></View>
              </View>
          </FmHeader>

          <Content>
            
            {content}

          </Content>
        </View>
      </Container>

    );
  }
}


function bindActions(dispatch) {
  return {
  };
}

const mapStoreToProps = store => ({
});

export default connect(mapStoreToProps, bindActions)(History);
