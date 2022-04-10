import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
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
  useColorMode,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addItem } from "../redux/actions";

const days = ["日", "一", "二", "三", "四", "五", "六"];

const NoteScreen = ({ navigation }) => {
  const { categoryList } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState("");

  const [theItem, setTheItem] = useState({});
  const createItem = () => {
    let newItem = {
      title: title,
      note: note,
      time: timeText,
      category: category,
      divide: divide,
    };
    dispatch(addItem(newItem));
  };
  // Date Time Picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // Native Base Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  // Title
  const [title, setTitle] = useState("");
  const [titleIsError, setTitleIsError] = useState(true);
  // Note
  const [note, setNote] = useState("");
  // Date and Time
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [timeIsError, setTimeIsError] = useState(true);
  // Category
  const [category, setCategory] = useState("");
  const [categoryIsError, setCategoryIsError] = useState(true);
  // Divide
  const [divide, setDevide] = useState("low");
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
    setTimeText(dateText + fTime);
  };
  // Date Time Picker Display (set date then time)
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

  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  // Check Input Value
  const [isCheck, setIsCheck] = useState(false);
  const checkInputValues = () => {
    title.length == 0 ? setTitleIsError(true) : setTitleIsError(false);
    timeText.length == 0 ? setTimeIsError(true) : setTimeIsError(false);
    category.length == 0 ? setCategoryIsError(true) : setCategoryIsError(false);
    setIsCheck(true);
    submitItem();
  };
  const submitItem = () => {
    if (!titleIsError && !timeIsError && !categoryIsError) {
      console.log("DONE!!!!");
      createItem();
    } else {
      console.log("FAIL");
    }
  };

  useEffect(() => {
    if (title.length != 0) setTitleIsError(false);
    if (timeText.length != 0) setTimeIsError(false);
    if (category.length != 0) setCategoryIsError(false);
  }, [title, timeText, category]);

  return (
    <Box _light={{ bgColor: colors.light100 }}>
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
            placeholder={"輸入標題"}
            fontSize={"md"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            請輸入標題!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt={4}>
          <TextArea placeholder={"添加備註..."} fontSize={"md"} minH={130} />
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
                      {categoryList.categorys.length == 0 ? (
                        <Text>請先新增一個類別</Text>
                      ) : (
                        categoryList.categorys.map((value, index) => (
                          <Radio
                            key={value + index}
                            value={value}
                            mx={1}
                            _text={{ color: colors.dark700, fontSize: "md" }}
                          >
                            {value}
                          </Radio>
                        ))
                      )}
                    </Radio.Group>
                    <FormControl.ErrorMessage>
                      Something is wrong.
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Modal.Body>
              </ScrollView>

              <Modal.Footer>
                <Button
                  flex="1"
                  onPress={() => {
                    setModalVisible(false);
                    setSecondModalVisible(!secondModalVisible);
                    // setNewCategory("");
                    // dispatch(addCategory(newCategory));
                  }}
                >
                  新增
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Modal
            isOpen={secondModalVisible}
            onClose={() => setSecondModalVisible(false)}
            avoidKeyboard
            // justifyContent="flex-end"
            bottom="4"
            size="lg"
          >
            <Modal.Content>
              <Modal.Body>
                <FormControl isRequired>
                  <FormControl.Label
                    _text={{
                      fontSize: "md",
                      color:
                        colorMode == "light"
                          ? colors.primary700
                          : colors.primary700,
                    }}
                    mt={16}
                  >
                    新增一個類別
                  </FormControl.Label>
                  <Input
                    placeholder={"輸入類別名稱"}
                    fontSize={"md"}
                    value={newCategory}
                    onChangeText={(text) => setNewCategory(text)}
                  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  flex="1"
                  onPress={() => {
                    setSecondModalVisible(false);
                    setCategory(newCategory);
                    setNewCategory("");
                    // setModalVisible(!modalVisible);
                    dispatch(addCategory(newCategory));
                  }}
                >
                  新增
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            請選擇一項類別!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt={4} isRequired>
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
            value={divide}
            onChange={(nextValue) => {
              setDevide(nextValue);
            }}
          >
            <Radio
              value="high"
              mx={1}
              _text={{
                color: colors.dark700,
                fontSize: "md",
              }}
              colorScheme="red"
              // color={"#D27373"}
            >
              優先
            </Radio>
            <Radio
              value="medium"
              mx={1}
              _text={{ color: colors.dark700, fontSize: "md" }}
              colorScheme="yellow"
              // color={colors.medium700}
            >
              重要
            </Radio>
            <Radio
              value="low"
              mx={1}
              _text={{ color: colors.dark700, fontSize: "md" }}
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
          <Button
            bgColor={colors.green700}
            _text={{ color: colors.primary700, fontSize: "md" }}
            h={12}
            w={"50%"}
            mt={16}
            mb={24}
            shadow={4}
            rounded={5}
            onPress={() => {
              // console.log(theItem.itemCategory);
              // createItem();
              // navigation.navigate("HomeTabs");
              checkInputValues();
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
