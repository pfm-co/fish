
import React, { Component } from 'react';
var Modal   = require('react-native-modalbox');
var { Text } = require('../../common/FmText');
import styles from './styles';
import { Picker, View } from 'native-base';
import I18n from 'react-native-i18n'

const Item = Picker.Item;


export default class ModalDatePicker extends Component {
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
      this.refs.modal2.open();
  }

  render() { 
    return (
      <Modal style={[styles.modal]} backdrop={true}  position={"center"} ref={"modal2"}>
          <Text style={styles.messageText}>{I18n.t("DatePicker.ChooseADate")}</Text>
          
          <View style={styles.pickersView}>
            <Picker
                iosHeader={I18n.t("Home.SelectOne")}
                mode="dropdown"
                selectedValue={this.state.year}
                onValueChange={(newValue) => this.setState({year: newValue})}
                style={styles.picker}
            >
                <Item label="1395" value="1395" />
                <Item label="1394" value="1394" />
                <Item label="1393" value="1393" />
                <Item label="1392" value="1392" />
            </Picker>

            <Picker
                iosHeader={I18n.t("Home.SelectOne")}
                mode="dropdown"
                selectedValue={this.state.month}
                onValueChange={(newValue) => this.setState({month: newValue})}
                style={styles.picker}
            >
                <Item label="فروردین" value="1" />
                <Item label="اردیبهشت" value="2" />
                <Item label="خرداد" value="3" />
                <Item label="تیر" value="4" />
                <Item label="مرداد" value="5" />
                <Item label="شهریور" value="6" />
                <Item label="مهر" value="7" />
                <Item label="آبان" value="8" />
                <Item label="آذر" value="9" />
                <Item label="دی" value="10" />
                <Item label="بهمن" value="11" />
                <Item label="اسفند" value="12" />
            </Picker>
        </View>
      </Modal>
    );
  }
}
