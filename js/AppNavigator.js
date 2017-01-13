
import React, { Component } from 'react';
import { Text, View, StyleSheet, BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Login from './components/Login';
import Home from './components/Home';
import SplashPage from './components/SplashScreen';
import { statusBarColor } from './themes/theme-base';
import FmDrawer from './common/FmDrawer';
import I18n from 'react-native-i18n'


const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'blankPage':
        return <BlankPage />;
      default :
        return <Login />;
    }
  }

  renderNavigationView() {
    let accountItem, myAppItem, loginItem;

    // if (this.props.user.isLoggedIn) {
    if (true) {
        // let name = this.props.user.name || '';
        let name = '';

        accountItem = (
            <View style={{flexDirection:"row", justifyContent: 'space-between',}}>
                {/*<TouchableOpacity onPress={this.openProfileSettings}>*/}
                    {/*<ProfilePicture userID={this.props.user.id} size={80}/>*/}
                {/*</TouchableOpacity>*/}
                <Text style={styles.name}>
                    {name.toUpperCase()}
                </Text>

                <Button
                    style={{alignSelf: 'flex-end', padding:10}}
                    onPress={() => {
                        this.logout();
                    } }
                >
                    <Text 
                        style={{color: 'white', fontWeight: 'bold'}}>
                    {I18n.t('Login.Logout')}
                  </Text>
                </Button>
            </View>
        );

    }
    else {
        accountItem = (
            <View>
                <Image source={require('../images/default-logo.png')}/>
                <Text style={styles.name}>
                    DEFAULT, to be changed
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.drawer}>
            <Image
                style={styles.header}
                source={require('../images/drawer-header.png')}>
                {accountItem}
            </Image>

            <MenuItem
                title="Car Groups"
                selected={this.props.tab === 'cargroups'}
                onPress={this.onTabSelect.bind(this, 'cargroups')}
                icon={require('../images/maps-icon.png')}
                selectedIcon={require('../images/maps-icon-active.png')}
            />

            <MenuItem
                title="Maps"
                selected={this.props.tab === 'map'}
                onPress={this.onTabSelect.bind(this, 'map')}
                icon={require('../images/maps-icon.png')}
                selectedIcon={require('../images/maps-icon-active.png')}
            />
        </View>
    )
}


  render() {
    return (
      <FmDrawer
        ref="drawer"
        drawerWidth={290}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}>

          <StatusBar
            backgroundColor={statusBarColor}
            barStyle="default"
          />
          <NavigationCardStack
            navigationState={this.props.navigation}
            renderOverlay={this._renderOverlay}
            renderScene={this._renderScene}
          />
      </FmDrawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});


let styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: 'white',
        zIndex:1000
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 20,
        justifyContent: 'flex-end',
    },
    name: {
        marginTop: 10,
        color: '#6f0000',
        fontSize: 12,
    },

});

export default connect(mapStateToProps, bindAction)(AppNavigator);
