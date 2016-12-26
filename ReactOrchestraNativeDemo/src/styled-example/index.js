
import React, { PropTypes } from 'react';
import { Header, Title, Button,
  Icon,
  Footer,
  Text,
  FooterTab, Content, Container } from 'native-base';
import randomColor from 'randomcolor';
import {
  View,
} from 'react-native';


import { Note } from 'react-orchestra/native';
export const AppHeader = props => (
  <Header>
    <Title>{props.title}</Title>
  </Header>
  );

AppHeader.propTypes = {
  title: PropTypes.string,
};

const renderButton = props => (
  <Note name="C3" instrumentName="acoustic_grand_piano">
    <View>
      <Text>
        Click me
      </Text>
    </View>
  </Note>
);

export const AppFooter = props => (
  <Footer
    theme={props.theme || {}}
  >
    <FooterTab>
      <Button
        onPress={props.goToSettings}
      >
        {/* <Badge>2</Badge> */}
        <Text>Settings</Text>
        <Icon name="ios-settings-outline" />
      </Button>
      <Button
        onPress={props.goToInstrument}
      >
            Play
            <Icon name="ios-play-outline" />
      </Button>
    </FooterTab>
  </Footer>
  );

AppFooter.propTypes = {
  goToSettings: PropTypes.func,
  goToInstrument: PropTypes.func,
  theme: PropTypes.string,

};


class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Header>
          <Title>Header</Title>
        </Header>
        <Content>
        {
          renderButton()
        }
        </Content>
        <Footer>
        </Footer>
      </Container>


    );
  }
}
export default Demo;
