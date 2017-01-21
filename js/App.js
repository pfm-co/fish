
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CodePush from 'react-native-code-push';
import { connect } from 'react-redux';


import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';
import ProgressBar from './components/loaders/ProgressBar';

import theme from './themes/theme-base';
import Translations from './common/Translations'
import I18n from 'react-native-i18n';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
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
    CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ showDownloadingModal: true });
            this._modal.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ showInstalling: true });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this._modal.close();
            this.setState({ showDownloadingModal: false });
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
      }
    );
  }

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container theme={theme} style={{ backgroundColor: theme.defaultBackgroundColor }}>
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
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
                    {I18n.t("fa.InstallingUpdate")}
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
                      {I18n.t("fa.DownloadingUpdate")} {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar
                      color="theme.brandPrimary"
                      progress={parseInt(this.state.downloadProgress, 10)}
                    />
                  </View>
                }
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }

    return <AppNavigator />;
  }
}



function bindActions(dispatch) {
  return {
  };
}

function bindStore(store)
{
  return {
    appLang: store.settings.language,

  };
}


export default connect(bindStore, bindActions)(App);