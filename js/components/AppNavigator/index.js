
import React, { Component } from 'react';
import { View, StyleSheet, BackAndroid, Image, StatusBar, NavigationExperimental, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
var { Text } = require('../../common/FmText');
import Icon from 'react-native-vector-icons/Entypo';

import { actions } from 'react-native-navigation-redux-helpers';
import { logout } from '../../actions/user';

import { closeDrawer, openDrawer, navigateTo } from '../../actions/drawer';

import Login from '../Login';
import Home from '../Home';
import About from '../About';
import Help from '../Help';
import History from '../History';
// import ModalDatePicker from '../ModalDatePicker';
import { statusBarColor } from '../../themes/theme-base';
import FmDrawer from '../../common/FmDrawer';
import I18n from 'react-native-i18n'
import { zeroPad } from '../../common/Helper'

let MenuItem = require('../../common/MenuItem');
import { phonecall } from 'react-native-communications';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
var Modal   = require('react-native-modalbox');

import styles from './styles';

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
      if (this.handleBackButton())
        return true;

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

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
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
      case 'login':
          return <Login /> 
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'help':
        return <Help />;
      case 'history':
        return <History />;
      default :
        return <Home />
    }
  }

  renderNavigationView() {
    let accountItem, myAppItem, loginItem;

    if (this.props.isLoggedIn) {

        accountItem = (
            <View style={styles.accountItem}>
              <View style={styles.topAccountDetails}>
                <View style={{marginTop: 15, marginRight: 10}}>
                  <Text style={styles.accountIdText}>{I18n.t("Common.NationalCode")}:  {zeroPad(this.props.userInfo.nationalCode, 10)}</Text>
                  <Text style={styles.accountIdText}>{I18n.t("Common.PersonelCode")}:  {this.props.userInfo.personelCode}</Text>
                </View>

                <Image style={styles.profilePic} source={require('../../../images/default_profile_photo.png')}/>                
              </View>

                <View style={styles.nameView}>
                    <Text style={styles.nameText}>
                        {this.props.userInfo.firstName + ' ' + this.props.userInfo.lastName}
                    </Text>
                </View>

                <Text style={styles.regionText}>{this.props.userInfo.region}</Text>
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
                source={require('../../../images/drawer-header.png')}>
                {accountItem}
            </Image>

            <MenuItem
                title="تاریخچه"
                icon={<FontAwesomeIcon name="calendar" size={25} color="#003372" />}
                selectedIcon={<FontAwesomeIcon name="calendar" size={25} color="#5bc0de" />}
                selected={this.props.navigation.routes[this.props.navigation.routes.length - 1].key === 'history'}
                onPress={() => {
                  // this.props.closeDrawer();
                  // this.datePickerDlg.open();
                  this.navigateTo('history');
                }}
            />

            <View style={{width: null, height:1, backgroundColor: "#d8d8d8", marginTop: 3, marginBottom: 7}}/>

            <MenuItem
                title="درباره"
                icon={<FontAwesomeIcon name="quote-left" size={25} color="#003372" />}
                selectedIcon={<FontAwesomeIcon name="quote-left" size={25} color="#5bc0de" />}
                selected={this.props.navigation.routes[this.props.navigation.routes.length - 1].key === 'about'}
                onPress={() => {
                  this.navigateTo('about');
                }}
            />

            <MenuItem
                title="راهنما"
                icon={<EntypoIcon name="help-with-circle" size={25} color="#003372" />}
                selectedIcon={<EntypoIcon name="help-with-circle" size={25} color="#5bc0de" />}
                selected={this.props.navigation.routes[this.props.navigation.routes.length - 1].key === 'help'}
                onPress={() => {
                  this.navigateTo('help');
                }}
            />

            <MenuItem
                title="تماس با پشتیبانی"
                icon={<FontAwesomeIcon name="phone" size={25} color="#003372" />}
                onPress={() => {
                  phonecall("02188402938", true);
                }}
            />

            <View style={{width: null, height:1, backgroundColor: "#d8d8d8", marginTop: 7, marginBottom: 3}}/>

            <MenuItem
                title="خروج"
                icon={<EntypoIcon name="log-out" size={25} color="#003372" />}
                onPress={() => {
                  this.props.closeDrawer();
                  this.modalDlg.open();
                }}
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
        drawerLockMode={this.props.isLoggedIn ? 'unlocked' : 'locked-closed'}
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

          { /* <ModalDatePicker refr={(datePickerDlg) => { this.datePickerDlg = datePickerDlg; }} /> */}
          <Modal 
            style={[styles.modal]} 
            backdrop={true}  
            position={"center"}
            ref={(modalDlg) => {
                this.modalDlg = modalDlg;
            }}
            >

            <Text style={styles.dlgConfirmText}>
              آیا برای خروج مطمئن هستید؟
            </Text>

            <View style={{flex:1}} />

            <View style={styles.dlgButtonsView}>
              <Button transparent 
                style={styles.dlgButton}
                onPress={() =>  this.modalDlg.close() }
                > خیر </Button>
              <Button transparent 
                style={[styles.dlgButton, {marginLeft: 20}]}
                onPress={() =>  {
                  this.modalDlg.close();
                  this.props.logout();
                }}
                > بله </Button>
            </View>
            
          </Modal>
      </FmDrawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
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
    region: store.user.region,
    province: store.user.province,
  }
});


AppNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
};

export default connect(mapStoreToProps, bindAction)(AppNavigator);
