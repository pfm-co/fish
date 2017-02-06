
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, View } from 'native-base';
const { Text, Heading1, Heading2, Paragraph } = require('../../common/FmText');
const FmHeader = require('../../common/FmHeader');

import styles from './styles';
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome';

import { openDrawer } from '../../actions/drawer';



class Help extends Component {
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
        <Heading2 style={{}}>راهنما</Heading2>
        <Paragraph style={{marginTop: 25}}>
        لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.
        </Paragraph>
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
                  <View><Text style={styles.headerContentText}>راهنما</Text></View>
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
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStoreToProps = store => ({
});

export default connect(mapStoreToProps, bindActions)(Help);
