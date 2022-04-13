import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  Box,
  Text,
  Input,
  Image,
  FormControl,
  TextArea,
  Pressable,
  Button,
  WarningOutlineIcon,
  KeyboardAvoidingView,
  Center,
  ScrollView,
  Radio,
  Modal,
  useColorMode,
  Divider,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  addCategory,
  updateItem,
  updateEditItemTitle,
  updateEditItemNote,
  updateEditItemTime,
  updateEditItemCategory,
  updateEditItemDivide,
} from "../redux/actions";

const days = ["日", "一", "二", "三", "四", "五", "六"];

const EditScreen = ({ navigation, route: { params } }) => {
  // State
  const { categoryList, itemList, currentEditItem } = useSelector(
    (state) => state.item
  );
  const dispatch = useDispatch();
  // Initial Item
  const { title, note, time, category, divide, done } = params;
  // compare time
  const timePattern = /\//g;
  // Edit Item
  const editItem = () => {
    let editedItem = {
      title: currentEditItem.title,
      note: currentEditItem.note,
      time: currentEditItem.time,
      category: currentEditItem.category,
      divide: currentEditItem.divide,
      done: done,
      compareTime: currentEditItem.time.replace(timePattern, "").slice(0, 8),
      selectTime: currentEditItem.time.replace(timePattern, "-").slice(0, 10),
    };
    const itemIndex = itemList.items.findIndex(
      (value) =>
        value.title == title &&
        value.time == time &&
        value.category == category &&
        value.divide == divide &&
        value.note == note
    );
    if (itemIndex == -1) {
      console.log("Error!! Can't find the item to edit!!");
    }
    dispatch(updateItem(editedItem, itemIndex));
  };
  // New Item Category
  const [newCategory, setNewCategory] = useState("");
  // Date Time Picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // Native Base Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  // Title
  const [titleIsError, setTitleIsError] = useState(true);
  // Date and Time
  const [dateText, setDateText] = useState("");
  const [timeIsError, setTimeIsError] = useState(true);
  // Category
  const [categoryIsError, setCategoryIsError] = useState(true);
  // 取得日期(設定日期文字)
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
  // 取得時間(設定最終時間文字)
  const getTime = (currentDate) => {
    let tempDate = new Date(currentDate);
    let fTime =
      (tempDate.getHours() < 10 ? "0" : "") +
      tempDate.getHours() +
      ":" +
      (tempDate.getMinutes() < 10 ? "0" : "") +
      tempDate.getMinutes();
    dispatch(updateEditItemTime(dateText + fTime));
  };
  // Date Time Picker Display (set date then set time)
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
  // Check Input Value
  const [isCheck, setIsCheck] = useState(false);
  const checkInputValues = () => {
    setIsCheck(true);
    submitItem();
  };
  // 提交輸入
  const submitItem = () => {
    if (!titleIsError && !timeIsError && !categoryIsError) {
      console.log("UPDATE ITEM !");
      editItem();
      resetForm();
    } else {
      console.log("FAIL TO UPDATE ITEM");
    }
  };
  useEffect(() => {
    currentEditItem.title.length != 0
      ? setTitleIsError(false)
      : setTitleIsError(true);
    currentEditItem.time.length != 0
      ? setTimeIsError(false)
      : setTimeIsError(true);
    currentEditItem.category.length != 0
      ? setCategoryIsError(false)
      : setCategoryIsError(true);
  }, [
    currentEditItem.title,
    currentEditItem.timeText,
    currentEditItem.category,
  ]);
  // 重設錯誤判斷並回到 HomeTabs
  const resetForm = () => {
    // 注意跟 note screen 不同
    setIsCheck(true);
    setTitleIsError(false);
    setTimeIsError(false);
    setCategoryIsError(false);
    navigation.navigate("HomeTabs");
  };
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Box
      flex={1}
      _light={{ bgColor: colors.light100 }}
      _dark={{ bgColor: colors.light400 }}
    >
      <ScrollView w={"100%"} px={4} pt={8}>
        <FormControl isRequired isInvalid={titleIsError && isCheck}>
          <FormControl.Label
            _text={{
              fontSize: "md",
              color:
                colorMode == "light" ? colors.primary700 : colors.primary700,
            }}
          >
            標題
          </FormControl.Label>
          <Input
            placeholder={"更改標題"}
            fontSize={"md"}
            defaultValue={currentEditItem.title}
            value={currentEditItem.title}
            onChangeText={(text) => dispatch(updateEditItemTitle(text))}
            bgColor={colors.light100}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            請輸入標題!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt={4}>
          <TextArea
            placeholder={"添加備註..."}
            defaultValue={currentEditItem.note}
            value={currentEditItem.note}
            onChangeText={(text) => dispatch(updateEditItemNote(text))}
            fontSize={"md"}
            minH={130}
            bgColor={colors.light100}
          />
        </FormControl>
        <FormControl mt={4} isRequired isInvalid={timeIsError && isCheck}>
          <FormControl.Label
            _text={{
              fontSize: "md",
              color:
                colorMode == "light" ? colors.primary700 : colors.primary700,
            }}
          >
            日期
          </FormControl.Label>
          <Pressable onPress={() => showMode("date")}>
            {({ isHovered, isFocused, isPressed }) => (
              <Input
                bgColor={
                  isPressed
                    ? colors.light400
                    : isHovered
                    ? colors.light400
                    : colors.light100
                }
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
                value={currentEditItem.time}
                defaultValue={currentEditItem.time}
              />
            )}
          </Pressable>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            請選擇日期!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt={4} isRequired isInvalid={categoryIsError && isCheck}>
          <FormControl.Label
            _text={{
              fontSize: "md",
              color:
                colorMode == "light" ? colors.primary700 : colors.primary700,
            }}
          >
            類別
          </FormControl.Label>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            {({ isHovered, isFocused, isPressed }) => (
              <Input
                bgColor={
                  isPressed
                    ? colors.light400
                    : isHovered
                    ? colors.light400
                    : colors.light100
                }
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
                value={currentEditItem.category}
                defaultValue={currentEditItem.category}
              />
            )}
          </Pressable>
          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            avoidKeyboard
            bottom="4"
            size="lg"
          >
            <Modal.Content bgColor={colors.light100}>
              <Modal.Header _text={{ fontSize: "md", color: colors.dark700 }}>
                選擇類別
              </Modal.Header>
              <ScrollView>
                <Modal.Body>
                  <FormControl mt={4} isRequired>
                    <Radio.Group
                      name="selecCategory"
                      value={currentEditItem.category}
                      defaultValue={currentEditItem.category}
                      onChange={(nextValue) => {
                        dispatch(updateEditItemCategory(nextValue));
                      }}
                    >
                      {categoryList.categorys.length == 0 ? (
                        <Text fontSize={"md"} color={colors.dark700}>
                          請先建立一個類別
                        </Text>
                      ) : (
                        categoryList.categorys.map((value, index) => (
                          <Radio
                            key={value + index}
                            value={value}
                            mx={1}
                            my={1}
                            _text={{ color: colors.dark700, fontSize: "md" }}
                          >
                            {" "}
                            {value}
                          </Radio>
                        ))
                      )}
                    </Radio.Group>
                  </FormControl>
                  <Pressable
                    onPress={() => {
                      setModalVisible(false);
                      setSecondModalVisible(!secondModalVisible);
                    }}
                  >
                    {({ isHovered, isFocused, isPressed }) => (
                      <Box
                        color={colors.dark700}
                        bgColor={
                          isPressed
                            ? colors.light400
                            : isHovered
                            ? colors.light400
                            : colors.light100
                        }
                        borderRadius={5}
                        px={2}
                        py={1}
                        mt={4}
                      >
                        <Text
                          color={colors.primary700}
                          fontSize={"md"}
                          fontWeight={"medium"}
                        >
                          + 建立新類別
                        </Text>
                      </Box>
                    )}
                  </Pressable>
                </Modal.Body>
              </ScrollView>

              <Modal.Footer bgColor={colors.light100}>
                <Divider />
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setModalVisible(false);
                      dispatch(updateEditItemCategory(""));
                      setCategoryIsError(true);
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    _text={{ color: colors.primary700 }}
                    bgColor={colors.light100}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    isDisabled={category.length == 0}
                  >
                    確定
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Modal
            isOpen={secondModalVisible}
            onClose={() => setSecondModalVisible(false)}
            avoidKeyboard
            bottom="4"
            size="lg"
          >
            <Modal.Content bgColor={colors.light100}>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label
                    _text={{
                      fontSize: "md",
                      color:
                        colorMode == "light" ? colors.dark700 : colors.dark700,
                    }}
                    mt={4}
                  >
                    建立新類別
                  </FormControl.Label>
                  <Input
                    placeholder={"類別名稱"}
                    fontSize={"md"}
                    value={newCategory}
                    onChangeText={(text) => setNewCategory(text)}
                    color={colors.dark700}
                  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer bgColor={colors.light100}>
                <Divider />
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setSecondModalVisible(false);
                      setNewCategory("");
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    onPress={() => {
                      setSecondModalVisible(false);
                      setCurrentCategory(newCategory);
                      setNewCategory("");
                      dispatch(addCategory(newCategory));
                    }}
                    _text={{ color: colors.primary700 }}
                    bgColor={colors.light100}
                    isDisabled={
                      newCategory.length == 0 || newCategory[0] == " "
                    }
                  >
                    確定
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            請選擇一項類別!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt={4}>
          <FormControl.Label
            _text={{
              fontSize: "md",
              color:
                colorMode == "light" ? colors.primary700 : colors.primary700,
            }}
          >
            劃分
          </FormControl.Label>
          <Radio.Group
            defaultValue="low"
            name="exampleGroup"
            flexDir={"row"}
            value={currentEditItem.divide}
            onChange={(nextValue) => {
              dispatch(updateEditItemDivide(nextValue));
            }}
          >
            <Radio
              value="high"
              mx={1}
              ml={4}
              _text={{
                fontSize: "md",
              }}
              colorScheme="red"
              // color={colors.high700}
            >
              優先
            </Radio>
            <Radio
              value="medium"
              mx={2}
              _text={{ fontSize: "md" }}
              colorScheme="yellow"
              // color={colors.medium700}
            >
              重要
            </Radio>
            <Radio
              value="low"
              mx={1}
              _text={{ fontSize: "md" }}
              colorScheme="cyan"
              // color={colors.low700}
            >
              普通
            </Radio>
          </Radio.Group>
          <FormControl.ErrorMessage>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <Center>
          <Pressable
            w={"60%"}
            onPress={() => {
              checkInputValues();
            }}
          >
            {({ isHovered, isFocused, isPressed }) => (
              <Center
                h={12}
                mt={8}
                mb={24}
                shadow={1}
                rounded={5}
                bgColor={
                  isPressed
                    ? colors.light700
                    : isHovered
                    ? colors.light700
                    : colors.green700
                }
              >
                <Text color={colors.primary700} fontSize={"md"}>
                  確認
                </Text>
              </Center>
            )}
          </Pressable>
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

export default EditScreen;
