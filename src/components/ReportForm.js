// Setup
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

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
  Header,
  Icon,
  Item,
  Input,
  Label,
  Picker,
  Text,
  Title
} from "native-base";
import { Formik } from "formik";

// Redadalertas
import { colors } from "styles";

const types = [
  { label: "Action", value: "action" },
  { label: "Checkpoint", value: "checkpoint" },
  { label: "I9", value: "i9" },
  { label: "Other", value: "other" },
  { label: "Sweep", value: "sweep" },
  { label: "Targeted", value: "targeted" },
  { label: "Traffic", value: "traffic" }
];

export default class ReportForm extends Component {
  state = { agencyInputValue: "" };

  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { navigation } = this.props;
    const { agencyInputValue } = this.state;
    const initialValues = {
      expire: {
        at: null,
        deleteOnExpire: true
      },
      description: {
        en: "",
        es: ""
      },
      location: {
        address: "",
        latitude: "",
        longitude: ""
      },
      present: [],
      type: types[0].value
    };

    return (
      <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
        {props => (
          <Container>
            <Header>
              <Body>
                <Title>Report Event</Title>
              </Body>
            </Header>

            <Content>
              <Form>
                <Item style={{ marginLeft: 15 }} fixedLabel>
                  <Label>Type</Label>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    onValueChange={props.handleChange("type")}
                    placeholder="Select event type"
                    selectedValue={props.values.type}
                  >
                    {types.map(type => (
                      <Picker.Item
                        key={type.value}
                        label={type.label}
                        value={type.value}
                      />
                    ))}
                  </Picker>
                </Item>
                <Item>
                  <Label>Present Agencies</Label>
                  <Input
                    onChangeText={value => {
                      const agencies = value
                        .split(",")
                        .map(agency => ({ agency: agency.trim() }));
                      props.setFieldValue("present", agencies);
                      this.setState({ agencyInputValue: value });
                    }}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={agencyInputValue}
                  />
                </Item>
                <Item>
                  <Label>Description (EN)</Label>
                  <Input
                    multiline
                    onChangeText={props.handleChange("description.en")}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={props.values.description.en}
                  />
                </Item>
                <Item>
                  <Label>Description (ES)</Label>
                  <Input
                    multiline
                    onChangeText={props.handleChange("description.es")}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={props.values.description.es}
                  />
                </Item>
                <Item>
                  <Label>Location</Label>
                  <Input
                    multiline
                    editable={false}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                    value={props.values.location.address}
                  />
                  <View style={{ alignItems: "center" }}>
                    <Button
                      bordered
                      onPress={() =>
                        navigation.navigate("EditLocation", {
                          setLocation: location => {
                            const { address, latitude, longitude } = location;

                            props.setFieldValue("location.address", address);
                            props.setFieldValue("location.latitude", latitude);
                            props.setFieldValue(
                              "location.longitude",
                              longitude
                            );
                          }
                        })
                      }
                      small
                      style={{ marginRight: 10 }}
                    >
                      <Text>
                        {props.values.location.address ? "Edit" : "Add"}
                      </Text>
                    </Button>
                  </View>
                </Item>
                <Item>
                  <View>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row"
                      }}
                    >
                      <Label style={{ paddingTop: 15, paddingBottom: 15 }}>
                        Expires On
                      </Label>
                      <DatePicker
                        animationType="fade"
                        formatChosenDate={date => date.toString().substr(4, 12)}
                        onDateChange={date =>
                          props.setFieldValue("expire.at", date)
                        }
                      />
                    </View>
                    <Text style={{ color: colors.lightGray }}>
                      Expires at the end of selected day.
                    </Text>
                  </View>
                </Item>
                <Item fixedLabel style={{ marginTop: 15 }}>
                  <Label style={{ marginBottom: 15 }}>Delete on Expire?</Label>
                  <CheckBox
                    checked={props.values.expire.deleteOnExpire}
                    onPress={() =>
                      props.setFieldValue(
                        "expire.deleteOnExpire",
                        !props.values.expire.deleteOnExpire
                      )
                    }
                    style={{ marginRight: 25, marginBottom: 15 }}
                  />
                </Item>
              </Form>
            </Content>
            <Fab
              style={{ backgroundColor: colors.primary }}
              onPress={props.handleSubmit}
            >
              <Icon name="add" />
            </Fab>
          </Container>
        )}
      </Formik>
    );
  }
}
