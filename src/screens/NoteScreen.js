import React, { useState } from "react";
import {
  Box,
  HStack,
  Text,
  Input,
  Heading,
  Image,
  FormControl,
  TextArea,
  Pressable,
  Button,
  WarningOutlineIcon,
  KeyboardAvoidingView,
  Center,
  ScrollView,
  VStack,
  Radio,
  Modal,
} from "native-base";

import { Platform } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { set } from "react-native-reanimated";

const days = ["日", "一", "二", "三", "四", "五", "六"];

const NoteScreen = ({ navigation }) => {
  const [theItem, setTheItem] = useState({});
  const createItem = () => {
    let newItem = {
      itemCategory: category,
      itemTitle: title,
      itemNote: note,
      itemDate: timeText,
      itemDivide: divide,
    };
    setTheItem(newItem);
  };
  // Title
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  // Date and Time
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");
  // Modal and Category
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("");
  // Divide
  const [divide, setDevide] = useState("low");

  const getDate = (currentDate) => {
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "/" +
      (tempDate.getMonth() < 10 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "/" +
      (tempDate.getDate() < 10 ? "0" : "") +
      tempDate.getDate();
    let fDay = "(" + days[tempDate.getDay()] + ")";
    setDateText(fDate + " " + fDay + " ");
  };

  const getTime = (currentDate) => {
    let tempDate = new Date(currentDate);
    let fTime =
      (tempDate.getHours() < 10 ? "0" : "") +
      tempDate.getHours() +
      ":" +
      (tempDate.getMinutes() < 10 ? "0" : "") +
      tempDate.getMinutes();

    setTimeText(dateText + fTime);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (event.type == "set") {
      if (mode == "date") {
        getDate(currentDate);
        setMode("time");
        setShow(Platform !== "ios");
      } else {
        getTime(currentDate);
        setMode("date");
      }
    } else {
      return null;
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <Box bgColor={"#F8FEFF"}>
      <ScrollView w={"100%"} px={4} pt={8}>
        <FormControl isRequired>
          <FormControl.Label _text={{ fontSize: "md", color: "#024D61" }}>
            標題
          </FormControl.Label>
          <Input placeholder={"輸入標題"} fontSize={"md"} />
        </FormControl>
        <FormControl mt={4}>
          <TextArea placeholder={"添加備註..."} fontSize={"md"} minH={130} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormControl.Label _text={{ fontSize: "md", color: "#024D61" }}>
            日期
          </FormControl.Label>
          <Pressable onPress={() => showMode("date")}>
            <Input
              isReadOnly={true}
              placeholder={"選擇日期"}
              InputRightElement={
                <Image
                  source={require("../icon/icon_calendar.png")}
                  alt={"calendar_icon"}
                  mr={2}
                />
              }
              fontSize={"md"}
              value={timeText}
            />
          </Pressable>
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormControl.Label _text={{ fontSize: "md", color: "#024D61" }}>
            類別
          </FormControl.Label>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Input
              isReadOnly={true}
              placeholder={"選擇一項類別"}
              InputRightElement={
                <Image
                  source={require("../icon/icon_dropdown.png")}
                  alt={"calendar_icon"}
                  mr={2}
                />
              }
              fontSize={"md"}
              value={category}
              // placeholderTextColor="#888"
            />
          </Pressable>
          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            avoidKeyboard
            // justifyContent="flex-end"
            bottom="4"
            size="lg"
          >
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>選擇哪個類別?</Modal.Header>
              <ScrollView>
                <Modal.Body>
                  <FormControl mt={4} isRequired>
                    <Radio.Group
                      name="exampleGroup2"
                      value={category}
                      onChange={(nextValue) => {
                        setCategory(nextValue);
                      }}
                    >
                      <Radio
                        value="作業"
                        mx={1}
                        _text={{ color: "#333333", fontSize: "md" }}
                      >
                        作業
                      </Radio>
                      <Radio
                        value="考試"
                        mx={1}
                        _text={{ color: "#333333", fontSize: "md" }}
                      >
                        考試
                      </Radio>
                    </Radio.Group>
                    <FormControl.ErrorMessage>
                      Something is wrong.
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl mt={16}>
                    <FormControl.Label>建立類別</FormControl.Label>
                    <Input />
                  </FormControl>
                </Modal.Body>
              </ScrollView>

              <Modal.Footer>
                <Button
                  flex="1"
                  onPress={() => {
                    // setModalVisible(false);
                  }}
                >
                  新增類別
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormControl.Label _text={{ fontSize: "md", color: "#024D61" }}>
            劃分
          </FormControl.Label>
          <Radio.Group
            defaultValue="low"
            name="exampleGroup"
            flexDir={"row"}
            value={divide}
            onChange={(nextValue) => {
              setDevide(nextValue);
            }}
          >
            <Radio
              value="high"
              mx={1}
              _text={{ color: "#333333", fontSize: "md" }}
              colorScheme="red"
              // color={"#D27373"}
            >
              優先
            </Radio>
            <Radio
              value="medium"
              mx={1}
              _text={{ color: "#333333", fontSize: "md" }}
              colorScheme="yellow"
              // color={"#DEB16D"}
            >
              重要
            </Radio>
            <Radio
              value="low"
              mx={1}
              _text={{ color: "#333333", fontSize: "md" }}
              colorScheme="blue"
              // color={"#73C1D2"}
            >
              普通
            </Radio>
          </Radio.Group>
          <FormControl.ErrorMessage>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <Center>
          <Button
            bgColor={"#D3F9E7"}
            _text={{ color: "#024D61", fontSize: "md" }}
            h={12}
            w={"60%"}
            mt={16}
            mb={24}
            shadow={4}
            rounded={16}
            onPress={() => {
              console.log(theItem.itemCategory);
              createItem();
              // navigation.navigate("HomeTabs");
            }}
          >
            新增
          </Button>
        </Center>
      </ScrollView>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Box>
  );
};

export default NoteScreen;
