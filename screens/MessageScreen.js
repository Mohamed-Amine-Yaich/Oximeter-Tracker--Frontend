/*  import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
const { width, height } = Dimensions.get("window");
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      messages: [
        {
          id: 1,
          sent: true,
          msg: "Lorem ipsum dolor",
          image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
        },
        {
          id: 2,
          sent: true,
          msg: "sit amet, consectetuer",
          image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
        },
        {
          id: 3,
          sent: false,
          msg: "adipiscing elit. Aenean ",
          image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
        },
        {
          id: 4,
          sent: true,
          msg: "commodo ligula eget dolor.",
          image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
        },
        {
          id: 5,
          sent: false,
          msg: "Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes",
          image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
        },
        {
          id: 6,
          sent: true,
          msg: "nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo",
          image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
        },
        {
          id: 7,
          sent: false,
          msg: "rhoncus ut, imperdiet",
          image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
        },
        {
          id: 8,
          sent: false,
          msg: "a, venenatis vitae",
          image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
        },
      ],
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
    this.renderItem = this._renderItem.bind(this);
  }

  reply() {
    var messages = this.state.messages;
    messages.push({
      id: Math.floor(Math.random() * 99999999999999999 + 1),
      sent: false,
      msg: this.state.msg,
      image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    });
    this.setState({ msg: "", messages: messages });
  }

  send() {
    if (this.state.msg.length > 0) {
      var messages = this.state.messages;
      messages.push({
        id: Math.floor(Math.random() * 99999999999999999 + 1),
        sent: true,
        msg: this.state.msg,
        image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
      });
      this.setState({ messages: messages });
      setTimeout(() => {
        this.reply();
      }, 2000);
    }
  }

  _renderItem = ({ item }) => {
    if (item.sent === false) {
      return (
        <View style={styles.eachMsg}>
          <Image source={{ uri: item.image }} style={styles.userPic} />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rightMsg}>
          <View style={styles.rightBlock}>
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.userPic} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
          <FlatList
            style={styles.list}
            extraData={this.state}
            data={this.state.messages}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={this.renderItem}
          />
          <View style={styles.input}>
            <TextInput
              style={{ flex: 1 }}
              value={this.state.msg}
              placeholderTextColor="#696969"
              onChangeText={msg => this.setState({ msg })}
              blurOnSubmit={false}
              onSubmitEditing={() => this.send()}
              placeholder="Type a message"
              returnKeyType="send"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#075e54",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
  },
  chatTitle: {
    color: "#fff",
    fontWeight: "600",
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: "#fff",
    margin: 10,
    shadowColor: "#3d3d3d",
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor: "#696969",
    borderWidth: 1,
  },
  eachMsg: {
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 5,
  },
  rightMsg: {
    flexDirection: "row",
    alignItems: "flex-end",
    margin: 5,
    alignSelf: "flex-end",
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    padding: 10,
    shadowColor: "#3d3d3d",
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: "#97c163",
    padding: 10,
    shadowColor: "#3d3d3d",
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: "#555",
    fontWeight: "600",
  },
  rightTxt: {
    fontSize: 15,
    color: "#202020",
    fontWeight: "600",
  },
});
  */
import Icon from "react-native-vector-icons/Ionicons";

import {
  getMessages,
  getMessagesForPatient,
  postMessage,
} from "./../api/service";

import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
} from "react-native";

const MessageScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");

  const [data, setData] = useState([]);

  /* get all messages  */
  useEffect(async () => {
    /* console.log("receiver :" + route.params.item.id); */

    if (route.params.currentUser.role === "doctor") {
      let receiver = route.params.item.id;
      const data = await getMessages(route.params.token, receiver);
      setData(data);
    } else if (route.params.currentUser.role === "patient") {
      const data = await getMessagesForPatient(route.params.token, null);
      setData(data);
    }

    console.log("use effect messsagescreen :" + data);
  }, []);

  const renderDate = date => {
    /* convert the date */
    return <Text style={styles.time}>{date}</Text>;
  };

  const send = async () => {
    if (message.length > 0) {
      var messages = data;
      /*     sender :current user      
        receiver : /*depend of current user  
        content  : /* message text 
 */
      messages.push({
        id: Math.floor(Math.random() * 99999999999999999 + 1),
        /* sender: route.params.currentUser.id,
        receiver: !route.params.item
          ? route.params.currentUser.doctor
          : route.params.item.id, */
        content: message,
        createdAt: Date.now() /* .toPrecision() */,
      });
      console.log(messages);
      /* this will update the tab of messages called data (will be set to the messages var that contain new message) */

      /* post this message to db 
create method to post to database*/

      const postReturn = await postMessage(
        route.params.token,
        !route.params.item
          ? route.params.currentUser.doctor
          : route.params.item.id,
        { content: message }
      );

      setData(messages);
    }
    /* send a replay */
    /*  setTimeout(() => {
        this.reply();
      }, 2000); */
  };

  return (
    <View style={styles.container}>
      {/*    {route.params.currentUser.role === "patient" ? (
        <Icon.Button
          borderRadius={0}
          name="ios-menu"
          size={25}
          color="#111"
          backgroundColor="#009387"
          onPress={() => navigation.openDrawer()}
        ></Icon.Button>
      ) : null} */}

      <FlatList
        /*  inverted={-1} */
        style={styles.list}
        data={data}
        keyExtractor={item => {
          return item.id;
        }}
       /*  initialScrollIndex={0}
        scrollToOffset={-1} */
        key={item => {
          item.id;
        }}
        renderItem={({ item }) => {
          /* in message is received message that current user (current user is sender) */
          let inMessage = route.params.currentUser.id === item.receiver;
          let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
          return (
            /* key solve the error each child should have a unique key prop */
            <View style={[styles.item, itemStyle]}>
              {!inMessage && renderDate(item.createdAt)}
              <View style={[styles.balloon]}>
                <Text>{item.content}</Text>
              </View>
              {inMessage && renderDate(item.createdAt)}
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            value={message}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            onSubmitEditing={() => send()}
            onChangeText={message => setMessage(message)}
          />
        </View>

        <TouchableOpacity style={styles.btnSend} onPress={() => send()}>
          <Image
            source={{
              uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png",
            }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: "flex-start",
  },
  itemOut: {
    alignSelf: "flex-end",
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 10,
    color: "#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    borderRadius: 300,
    padding: 5,
  },
});
