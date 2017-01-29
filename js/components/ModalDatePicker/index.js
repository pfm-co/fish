
import React, { Component } from 'react';
import { connect } from 'react-redux';

var Modal   = require('react-native-modalbox');
var { Text } = require('../../common/FmText');
import styles from './styles';
import { Picker, Button, View } from 'native-base';
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome';

const Item = Picker.Item;
import { changePayslipYearMonth } from '../../actions/settings';


class ModalDatePicker extends Component {
  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

constructor(props) {
    super(props);
    this.state = {
        year: props.year.toString(),
        month: props.month.toString()
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
      <Modal 
        style={[styles.modal]} 
        backdrop={true}  
        position={"center"}
        ref={(modalDlg) => {
            this.props.refr(modalDlg);
            this.modalDlg = modalDlg;
        }}
        >
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

        <View style={styles.buttons}>
            <Button 
                style={styles.button}
                onPress={() => {
                    this.modalDlg.close();
                }}
            >
                <Text style={styles.buttonText}>{I18n.t("Common.Close") + " "} <Icon name="remove" /> </Text>
            </Button>

            <Button 
                style={[styles.button, {marginLeft: 30}]}
                onPress={() => {
                    this.props.changePayslipYearMonth(this.state.month, this.state.year);
                    this.modalDlg.close();
                }}
            >
                <Text style={styles.buttonText}> {I18n.t("Common.Ok") + " " } <Icon name="check" /> </Text>
            </Button>
        </View>
      </Modal>
    );
  }
}


function bindActions(dispatch) {
  return {
    changePayslipYearMonth: (month: int, year: int) => dispatch(changePayslipYearMonth(month, year)),
  };
}

const mapStoreToProps = store => ({
    year: store.settings.payslipYear,
    month: store.settings.payslipMonth,
});

export default connect(mapStoreToProps, bindActions)(ModalDatePicker);
