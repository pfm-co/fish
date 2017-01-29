
import React, { Component } from 'react';
import { View, StyleSheet, BackAndroid, Image, StatusBar, NavigationExperimental, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
var { Text } = require('./common/FmText');
import Icon from 'react-native-vector-icons/Entypo';

import { actions } from 'react-native-navigation-redux-helpers';
import { logout } from './actions/user';

var TouchableOpacity = require('TouchableOpacity');

import { closeDrawer, openDrawer } from './actions/drawer';

import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import ModalDatePicker from './components/ModalDatePicker';
import SplashPage from './components/SplashScreen';
import { statusBarColor } from './themes/theme-base';
import FmDrawer from './common/FmDrawer';
import I18n from 'react-native-i18n'
let MenuItem = require('./common/MenuItem');
const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;
const drawerWidth = deviceWith / 1.3 > 290 ? 290 : deviceWith / 1.3;

const {
  popRoute,
  pushRoute,
  jumpTo
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {
  _handlers = [];

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    jumpTo: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  constructor(props) {
      super(props);

      console.log("AppNavigator Props:", props);
      
      this._handlers = [];
      this.addBackButtonListener = this.addBackButtonListener.bind(this);
      this.removeBackButtonListener = this.removeBackButtonListener.bind(this);
      this.handleBackButton = this.handleBackButton.bind(this);
      this._renderScene = this._renderScene.bind(this);
      this.renderNavigationView = this.renderNavigationView.bind(this);
      this.openDrawer = this.openDrawer.bind(this);
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

  componentWillReceiveProps(nextProps)
  {

  }


  componentDidUpdate() {    
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this.closeDrawer();
    }
  }


  openDrawer() {
    if (this._drawer)  
        this._drawer.openDrawer();
  }

  closeDrawer() {
    if (this._drawer) {
      this._drawer.closeDrawer();
    }
  }

  getChildContext() {
      return {
          addBackButtonListener: this.addBackButtonListener,
          removeBackButtonListener: this.removeBackButtonListener,
      };
  }

  addBackButtonListener(listener) {
      this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
      this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  handleBackButton() {
      for (let i = this._handlers.length - 1; i >= 0; i--) {
          if (this._handlers[i]()) {
              return true;
          }
      }

      const {navigator} = this.refs;
      if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
      }

      return false;
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    if (!this.props.isLoggedIn)
      return <Login />;
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
          return <Login /> 
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'blankPage':
        return <BlankPage />;
      default :
        return <Home />
    }
  }

  renderNavigationView() {
    console.log("props.scene.route.key", this.props);

    let accountItem, myAppItem, loginItem;

    if (this.props.isLoggedIn) {

        accountItem = (
            <View style={{width: drawerWidth, flex:1, flexDirection:"column", justifyContent: 'space-between',
                        paddingRight: 40}}>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30}}>
                <View style={{marginTop: 15, marginRight: 10}}>
                  <Text>{I18n.t("Common.NationalCode")}:  {this.props.userInfo.nationalCode}</Text>
                  <Text>{I18n.t("Common.PersonelCode")}:  {this.props.userInfo.personelCode}</Text>
                </View>

                <Image style={styles.profilePic} source={require('../images/default_profile_photo.png')}/>                
              </View>

                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <TouchableOpacity
                      accessibilityTraits="button"
                      onPress={() => { 
                        this.props.closeDrawer();
                        this.props.logout();
                      }}>
                        <Text style={styles.logout}>خروج</Text>
                    </TouchableOpacity>

                    <Text style={styles.name}>
                        {this.props.userInfo.firstName + ' ' + this.props.userInfo.lastName}
                    </Text>
                </View>
            </View>
        );

    }
    else {
        accountItem = (
            <View>
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
                title="فیش حقوقی"
                icon={require('../images/maps-icon.png')}
                selectedIcon={require('../images/maps-icon-active.png')}
                onPress={() => {
                  this.props.closeDrawer();
                  this.props.jumpTo('home', this.props.navigation.key);
                }}
            />

            <MenuItem
                title="تاریخچه"
                icon={require('../images/maps-icon.png')}
                selectedIcon={require('../images/maps-icon-active.png')}
                onPress={() => {
                  this.props.closeDrawer();
                  this.datePickerDlg.open();
                }}
            />

            <MenuItem
                title="درباره"
                icon={require('../images/maps-icon.png')}
                selectedIcon={require('../images/maps-icon-active.png')}
                onPress={() => {
                  this.props.closeDrawer();
                  this.props.pushRoute({key: 'about'}, this.props.navigation.key);
                }}
            />

            <MenuItem
                title="راهنما"
                icon={require('../images/maps-icon.png')}
                selectedIcon={require('../images/maps-icon-active.png')}
            />
        </View>
    )
}


  render() {
    return (
      <FmDrawer
        ref={(drawer) => { this._drawer = drawer; }}
        drawerWidth={ drawerWidth }
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}
        onDrawerOpen={() => {
          if (this.props.drawerState == "closed")
            this.props.openDrawer();
        }}
        onDrawerClose={() => {
          if (this.props.drawerState == "opened")
            this.props.closeDrawer();
        }}
        >

          <StatusBar
            backgroundColor={statusBarColor}
            barStyle="default"
          />
          <NavigationCardStack
            navigationState={this.props.navigation}
            renderOverlay={this._renderOverlay}
            renderScene={this._renderScene}
          />

          <ModalDatePicker refr={(datePickerDlg) => { this.datePickerDlg = datePickerDlg; }} />
      </FmDrawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    jumpTo: (routeKey, key) => dispatch(jumpTo(routeKey, key)),
    logout: () => dispatch(logout()),
  };
}

const mapStoreToProps = store => ({
  drawerState: store.drawer.drawerState,
  navigation: store.cardNavigation,
  isLoggedIn: store.user.isLoggedIn, 
  userInfo: {
    firstName: store.user.firstName,
    lastName: store.user.lastName,
    personelCode: store.user.personelCode,
    nationalCode: store.user.nationalCode,
  }
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
        justifyContent: 'flex-start',
    },
    name: {
        marginTop: 10,
        color: '#6f0000',
        fontSize: 23,
        textShadowColor: "#c06262",
        textShadowOffset: {width: 0, height: 3},
        textShadowRadius: 5,
    },
    logout: {
        fontSize: 15,
        color: '#b80101',
    },
    profilePic:
    {
      width: 70,
      height: 70,
      borderRadius: 35,
    }

});

AppNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
};

export default connect(mapStoreToProps, bindAction)(AppNavigator);
