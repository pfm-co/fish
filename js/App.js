
import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import CodePush from 'react-native-code-push';
import { connect } from 'react-redux';


import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './components/AppNavigator';
import ProgressBar from './components/loaders/ProgressBar';

import theme from './themes/theme-base';
import Translations from './common/Translations'
import I18n from 'react-native-i18n';

import { appStarted } from './actions/settings';


const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWith,
    height: deviceHeight,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: deviceHeight / 4,
    width: deviceWith * 0.90,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20
  },
});

class App extends Component {

  constructor(props) {
    super(props);

    I18n.defaultLocale = this.props.appLang;
    I18n.locale = this.props.appLang;
    I18n.fallbacks = true;
    I18n.translations = Translations;

    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0,
    };
  }

  componentDidMount() {
    this.props.appStarted();

    CodePush.sync({ updateDialog: false, installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log("DOWNLOADING_PACKAGE")
            this.setState({ showDownloadingModal: true });
            this._modal.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log("INSTALLING_UPDATE");
            this.setState({ showInstalling: true });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
          console.log("UPDATE_INSTALLED");
            this._modal.close();
            this.setState({ showDownloadingModal: false });
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        
          parseInt(this.state.downloadProgress, 10);

        this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
      }
    );
  }

  render() {
    if (this.state.showDownloadingModal) {
      return (
          <View style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              position={"center"}
              backdrop={true}
              ref={(c) => { this._modal = c; }}
              swipeToClose={false}
            >
              <View
                style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}
              >
                {this.state.showInstalling ?
                  <Text
                    style={{
                      color: theme.brandPrimary,
                      textAlign: 'center',
                      marginBottom: 15,
                      fontSize: 15,
                    }}
                  >
                    در حال نصب بروزرسانی...
                  </Text> :
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.brandPrimary,
                        textAlign: 'center',
                        marginBottom: 15,
                        fontSize: 15,
                      }}
                    >
                       در حال دریافت بروزرسانی... {`%${parseInt(this.state.downloadProgress, 10)}`}
                    </Text>
                   
                  </View>
                }
              </View>
            </Modal>
          </View>
      );
    }

    return <AppNavigator />;
  }
}



function bindActions(dispatch) {
  return {
    appStarted: () => dispatch(appStarted()),
  };
}

function bindStore(store)
{
  return {
    appLang: store.settings.language,

  };
}


export default connect(bindStore, bindActions)(App);