import * as css from "../Styles/CodeAreaStyles";
import BtnCustom from "./BtnCustom";
import SelectCustom from "./SelectCustom";
import { Context, CODE_INP_CHANGE } from "../Data/Context";
import EditorComponent, { EditorThemes } from "./EditorComponent";
import {
  SetLsData,
  GetLsData,
  handleCopy,
  DebugReq,
  ConvertReq,
  CheckQualityReq,
  GetStoredLanguage,
  GetStoredFontSize,
  GetStoredEditorTheme,
  CalculateWidthFromPercentage,
} from "../Data/Action";

import { BallTriangle } from "react-loader-spinner";
import { useResizable } from "react-resizable-layout";
import { useState, useEffect, useContext } from "react";
import { Box, Image, Text, useToast, Spinner, Center } from "@chakra-ui/react";
import {
  BiPlus as IncIcon,
  BiMinus as DecIcon,
  BiFontSize as FontSizeIcon,
} from "react-icons/bi";
import {
  MdContentCopy as Copy,
} from "react-icons/md";
import {
  LiaExchangeAltSolid as ConvertIcon,
  LiaClipboardCheckSolid as QualityIcon,
} from "react-icons/lia";
import {
  SiPhp as PHP,
  SiRust as Rust,
  SiSwift as Swift,
  SiKotlin as Kotlin,
  SiPython as Python,
  SiCplusplus as CSharp,
  SiCplusplus as CPlusPlus,
  SiTypescript as TypeScript,
  SiJavascript as JavaScript,
} from "react-icons/si";
import { DiRuby as Ruby } from "react-icons/di";
import { FaJava as Java } from "react-icons/fa6";
import { VscDebug as DebugIcon } from "react-icons/vsc";

const CodeArea = ({ isBelow768px, isBelow480px }: any) => {
  const {
    dispatch,
    outputVal,
    reqActive,
    codeInpVal,
    DebugLoading,
    QualityLoading,
    ConvertLoading,
  } = useContext(Context);
  const chakraToast = useToast();
  // Keep theme in state but don't provide UI to change it
  const [currentTheme, setTheme] = useState<string>(
    GetStoredEditorTheme(EditorThemes)
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    GetStoredLanguage(LanguagesArr)
  );
  let initialDivWidth =
    Math.floor(CalculateWidthFromPercentage(97.5) / 2) - 7.5;
  const [messages, setMessages] = useState<string[]>([]);
  const [currImg, setCurrImg] = useState(LanguagesArr[0]?.img);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(GetStoredFontSize());

  const {
    isDragging: HorizontalDragging,
    position: HorizontalPosition,
    separatorProps: HorizontalSeperatorProps,
  } = useResizable({
    axis: "x",
    initial: initialDivWidth,
  });
  const {
    isDragging: VerticalDragging,
    position: VerticalPosition,
    separatorProps: VerticalSeperatorProps,
  } = useResizable({
    axis: "y",
    initial: isBelow480px ? 400 : 500,
  });

  // useEffect for showing processing messages in output editor while a request is made.
  useEffect(() => {
    let messageTimer: any;
    const startProcessing = async () => {
      let messageArray: string[] = [];
      if (reqActive == "convert") {
        messageArray = ConversionMessages;
      } else if (reqActive == "debug") {
        messageArray = DebuggingMessages;
      } else if (reqActive == "quality") {
        messageArray = QualityCheckMessages;
      } else if (reqActive == "ConnectingToServer") {
        messageArray = ConnectingMessages;
      }
      setMessages(messageArray);
      setMessageIndex(0);
      messageTimer = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messageArray.length);
      }, 2500);
    };
    if (reqActive) {
      startProcessing();
    } else {
      clearInterval(messageTimer);
    }
    return () => {
      clearInterval(messageTimer);
    };
  }, [reqActive]);

  // useEffect for changing current language icon in language select menu.
  useEffect(() => {
    let selectedImg = LanguagesArr.filter((item: any) => {
      if (item?.name == selectedLanguage) {
        return item?.img;
      }
    });
    setCurrImg(selectedImg[0]?.img);
  }, [selectedLanguage]);

  // useEffect for handling imported files
  useEffect(() => {
    console.log("Setting up window.handleFileImport function");
    
    // Create a global function for handling imported files
    window.handleFileImport = (fileData) => {
      console.log("handleFileImport called with:", fileData.name);
      
      if (fileData && fileData.content) {
        console.log("Updating editor with imported content");
        
        // Update the editor content with the imported file
        dispatch({
          type: CODE_INP_CHANGE,
          payload: fileData.content,
        });
      }
    };

    return () => {
      // Clean up the global function when component unmounts
      console.log("Cleaning up window.handleFileImport");
      delete window.handleFileImport;
    };
  }, [dispatch]);

  // Change Input Code Editor value
  const handleInputEditorChange = (inpVal: string | undefined) => {
    if (inpVal !== undefined) {
      dispatch({ type: CODE_INP_CHANGE, payload: inpVal });
    }
  };

  // ConvertReq Language Change
  const handleLanguageChange = (e: any) => {
    const LsData = GetLsData() || {};
    const DataToBeSaved = { ...LsData, convertLanguage: e.target.value };
    SetLsData(DataToBeSaved);
    setSelectedLanguage(e.target.value);
  };

  // Font Size Change
  const handleFontSizeChange = (value: number) => {
    chakraToast.closeAll();
    const newFontSize = fontSize + value;
    if (newFontSize < 12)
      return chakraToast({
        title: "Font size can't be under 12.",
        status: "warning",
        position: "top",
      });
    if (newFontSize > 42)
      return chakraToast({
        title: "Font size can't exceed 42.",
        status: "warning",
        position: "top",
      });
    const LsData = GetLsData() || {};
    const DataToBeSaved = { ...LsData, fontSize: newFontSize };
    SetLsData(DataToBeSaved);
    setFontSize(newFontSize);
  };

  return (
    <Box css={css.Outer}>
      {/* Control Panel */}
      <Box 
        css={css.InputBtnsContainer}
        background="rgba(30, 30, 30, 0.7)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        borderRadius="10px"
      >
        {/* Group the action buttons */}
        <div className="code-actions-group">
          <BtnCustom
            onClick={() => DebugReq(dispatch, reqActive, chakraToast, codeInpVal)}
          >
            {DebugLoading ? <Spinner /> : <Image as={DebugIcon} />}
            <Text>Debug</Text>
          </BtnCustom>
          <BtnCustom
            onClick={() =>
              CheckQualityReq(dispatch, reqActive, chakraToast, codeInpVal)
            }
          >
            {QualityLoading ? <Spinner /> : <Image as={QualityIcon} />}
            <Text>Check Quality</Text>
          </BtnCustom>
          <BtnCustom
            onClick={() =>
              ConvertReq(
                dispatch,
                reqActive,
                chakraToast,
                codeInpVal,
                selectedLanguage
              )
            }
          >
            {ConvertLoading ? <Spinner /> : <ConvertIcon />}
            <Text>Convert</Text>
          </BtnCustom>
        </div>
        
        {/* Keep remaining elements */}
        <SelectCustom
          leftImage={currImg}
          value={selectedLanguage}
          array={LanguagesArr}
          keyName="name"
          onChange={handleLanguageChange}
        />
        <Box css={css.FontBtnOuterBox}>
          <Image as={FontSizeIcon} />
          <Box>
            <Image
              onClick={() => handleFontSizeChange(-1)}
              as={DecIcon}
              color={fontSize <= 14 ? "blackB" : "blackA"}
            />
            <Text>{fontSize}</Text>
            <Image
              onClick={() => handleFontSizeChange(1)}
              as={IncIcon}
              color={fontSize >= 42 ? "blackB" : "blackA"}
            />
          </Box>
        </Box>
        <BtnCustom onClick={() => handleCopy(chakraToast, outputVal)}>
          <Image as={Copy} />
        </BtnCustom>
      </Box>
      <Box className="wrapper" flexGrow={1} css={css.BothEditorContainers}>
        {/* Input Editor */}
        <Box
          width={isBelow768px ? "100%" : HorizontalPosition}
          h={isBelow768px ? VerticalPosition : "100%"}
          className="left-block"
        >
          <EditorComponent
            name="Input Code Editor"
            width="100%"
            height="100%"
            readOnly={false}
            mode="javascript"
            value={codeInpVal}
            fontSize={fontSize}
            showNumberLines={true}
            currentTheme={currentTheme}
            handleOnChange={handleInputEditorChange}
          />
        </Box>

        {/* Splitter */}
        <Box
          bg={
            HorizontalDragging || VerticalDragging
              ? "var(--greyC)"
              : "var(--bgC)"
          }
          {...(isBelow768px
            ? VerticalSeperatorProps
            : HorizontalSeperatorProps)}
          className="splitter"
        ></Box>

        {/* Output Editor */}
        <Box
          h={isBelow768px ? VerticalPosition : "100%"}
          w={isBelow768px ? "100%" : VerticalPosition}
          flex={1}
          className="right-block"
        >
          {DebugLoading ||
          ConvertLoading ||
          QualityLoading ? (
            <Center css={css.ConnectionOuterBox}>
              <Box>
                <BallTriangle
                  radius={5}
                  visible={true}
                  color="var(--bgD)"
                  wrapperClass="ConnectionSpinner"
                  ariaLabel="ball-triangle-loading"
                />
                <Text>{messages[messageIndex]}</Text>
              </Box>
            </Center>
          ) : (
            <EditorComponent
              name="Output Editor"
              width="100%"
              height="100%"
              readOnly={true}
              fontSize={fontSize}
              showNumberLines={false}
              mode="markdown"
              currentTheme={currentTheme}
              placeholder="Your Output Will Come here..."
              value={reqActive ? messages[messageIndex] : outputVal}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CodeArea;

const ConnectingMessages = [
  "Installing Dependencies...",
  "Establishing Connection...",
  "Connecting to Server...",
];

const ConversionMessages = [
  "Processing your code for conversion...",
  "Code magic in progress... Be patient!",
  "Code conversion in progress... Please wait!",
  "Hold tight! Code transformation underway.",
  "Your code is off to the conversion factory!",
  "Modified code's on its way!",
];

const DebuggingMessages = [
  "Debugging mode activated... Stand by!",
  "Your code is entering debugging phase...",
  "Analyzing your code for debugging insights...",
  "Your code is under the debugging microscope.",
  "Hold tight! Code analysis for debugging ongoing.",
  "Processing your code for debugging...",
];

const QualityCheckMessages = [
  "Processing your code for quality check...",
  "Quality check initiated for your code...",
  "Quality check engines at work...",
  "Code quality assessment in progress...",
  "Evaluating your code's quality...",
  "Hold on! Code quality report is underway.",
];

// LanguagesArr Array
const LanguagesArr = [
  {
    img: <JavaScript />,
    name: "JavaScript",
  },
  {
    img: <Python />,
    name: "Python",
  },
  {
    img: <Java />,
    name: "Java",
  },
  {
    img: <CPlusPlus />,
    name: "C++",
  },
  {
    img: <CSharp />,
    name: "C#",
  },
  {
    img: <Ruby />,
    name: "Ruby",
  },
  {
    img: <Swift />,
    name: "Swift",
  },
  {
    img: <TypeScript />,
    name: "TypeScript",
  },
  {
    img: <PHP />,
    name: "PHP",
  },
  {
    img: <Kotlin />,
    name: "Kotlin",
  },
  {
    img: <Rust />,
    name: "Rust",
  },
];

declare global {
  interface Window {
    handleFileImport?: (fileData: any) => void;
  }
}
