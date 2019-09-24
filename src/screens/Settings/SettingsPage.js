// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Translate, withLocalize, getLanguages, getActiveLanguage, setActiveLanguage
} from "react-localize-redux";

// Vendor
import {
  Body,
  Button,
  CheckBox,
  Container,
  Content,
  DatePicker,
  Fab,
  Form,
  H3,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Picker,
  Text,
  Title,
  Toast
} from "native-base";
import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";
import eventServices from "services/event";
import authServices from "services/auth";
import { saveDeviceSettings } from "reducers/device";
import { deleteUserToken } from "reducers/user";
import asyncStore from "utils/asyncstorage";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 20
  },
  content: {
    padding: 20
  },
  button: {
    backgroundColor: colors.darkGray,
    marginTop: 20
  }
});

class SettingsPage extends Component {
  static navigationOptions = () => ({ title: "Settings" });

  handleLogout = async () => {
    let response;
    try {
      response = await authServices.logout();
      if (response instanceof Error) throw response;

      await this.props.deleteUserToken();
      this.props.navigation.navigate("ReporterLoginForm");
      Toast.show({
        buttonText: "OK",
        text: "User logout successful.",
        type: "success"
      });
    } catch (error) {
      Toast.show({
        buttonText: "OK",
        text: "Error logging out: " + (error.message || error),
        type: "danger"
      });
    }
  };

  render() {
    const { navigation, user, device } = this.props;

    const userBlock = (user && user.username) ? (
      <View style={styles.view}>
        <H3>User Settings</H3>
        <Text>{user.username}</Text>
        <Button
          style={styles.button}
          onPress={()=> navigation.navigate("ChangePassword")}
        >
          <Text>Change Password</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={this.handleLogout}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    ) : (<></>);

    return (
      <View style={styles.view}>
        <Content style={styles.content}>
          {userBlock}
          <View style={styles.view}>
            <Translate>
            {({ translate }) => (
              <H3>{translate("settings.device")}</H3>
            )}
            </Translate>
            <Form>
              <Item>
                <Label><Translate id="settings.language" /></Label>
                <Text>{this.props.currentLanguage}</Text>
              </Item>
              <Translate>
                {({ translate, activeLanguage, languages }) => (
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-dropdown" />}
                    onValueChange={(change) => this.props.setActiveLanguage(change)}
                    placeholder={translate("settings.select")}
                    selectedValue={activeLanguage.name}
                  >
                    {languages.map(language => (
                      <Picker.Item
                        key={language.code}
                        label={language.name}
                        value={language.code}
                      />
                    ))}
                  </Picker>
                )}
              </Translate>
            </Form>
          </View>
        </Content>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  device: state.device,
  user: state.user,
  errors: state.errors,
  languages: getLanguages(state.localize),
  currentLanguage: getActiveLanguage(state.localize).name
});

const mapDispatchToProps = dispatch => ({
  setActiveLanguage: (language) => dispatch(setActiveLanguage(language)),
  saveDeviceSettings: (settings) => dispatch(saveDeviceSettings(settings)),
  deleteUserToken: () => dispatch(deleteUserToken()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(SettingsPage));
