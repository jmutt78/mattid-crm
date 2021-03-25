import React, { useState, useCallback } from "react";
import {
  Button,
  Box,
  Flex,
  useToast,
  Text,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
const { ExcelRenderer } = require("react-excel-renderer");
import { useDropzone } from "react-dropzone";
import DetailsDropDown from "./DetailsDropDown";
const parser = require("fast-xml-parser");
import { useCreateSubMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

export const DocImport: React.FC<{}> = ({}) => {
  const [createSub] = useCreateSubMutation();
  const [File, setFile] = useState([]);
  const [UploadFile, setUploadFile] = useState([] as any);
  const [rows, setrows] = useState([] as any);
  const [rows1, setrows1] = useState([]);
  const [xml, setxml] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [filename, setfilename] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Email, setEmail] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [RecordSize, setRecordSize] = useState("");

  const clear = () => {
    setFile([]);
    setxml([]);
    setfilename("");
    setrows([]);
    setrows1([]);
    setFirstname("");
    setEmail("");
    setRecordSize("");
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploadFile(acceptedFiles);
    setfilename(acceptedFiles[0].name);
    setFirstname("");
    setEmail("");
    setrows([]);
    setrows1([]);
    if (acceptedFiles[0].type === "text/xml") {
      const reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);
      reader.onloadend = (evt) => {
        const readerData: any = evt.target?.result;
        const xml = parser.parse(readerData);

        const val = xml[Object.keys(xml)[0]];
        const val1 = val[Object.keys(val)[0]];
        const val2 = val1[Object.keys(val1)[0]];
        const val3 = Object.keys(val2);
        setxml(val1);
        setrows(val3);
        setRecordSize(val1.length);
        setrows1([]);
        setFile([]);
      };
    } else {
      ExcelRenderer(acceptedFiles[0], (err: any, resp: any) => {
        if (err) {
          console.log(err);
        } else {
          let record = resp.rows.length - 1;
          setRecordSize(record.toString());
          setFile(acceptedFiles);
          setrows(resp.rows[0]);
          resp.rows.shift();
          setrows1(resp.rows);
          setxml([]);
        }
      });
    }
  }, []);

  const childHandler = async (valuesFromChild: any) => {
    let index = valuesFromChild.e.target.value;
    let values = valuesFromChild.name;
    if (UploadFile[0].type === "text/xml") {
      if (values === "Name") {
        const keyelement = rows[index];
        let arr: any = [];
        xml.map(async (item: any) => arr.push(item[keyelement]));
        await setFirstname(arr.toString());
      }
      if (values === "Email") {
        const keyelement = rows[index];
        let arr: any = [];
        xml.map((item: any) => arr.push(item[keyelement]));
        await setEmail(arr.toString());
      }
    } else {
      if (values === "Name") {
        let arr: any = [];
        rows1.map((item) => arr.push(item[index]));
        await setFirstname(arr.toString());
      }
      if (values === "Email") {
        let arr: any = [];
        rows1.map((item) => arr.push(item[index]));
        await setEmail(arr.toString());
      }
    }
  };

  const uploadData = () => {
    // if (Firstname === "" || Lastname === "" || Email === "") {
    if (Firstname === "" || Email === "") {
      toast({
        title: "Empty Feilds",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    } else {
      setLoader(true);
      const respones = createSub({
        variables: {
          input: {
            name: Firstname,
            email: Email,
            // FirstName: Firstname,
            // LastName: Lastname,
            // Email: Email,
            // MobileNumber: Contact,
          },
        },
        update: (cache, { data }) => {
          if (!data?.createSub.errors) {
            cache.evict({ fieldName: "subs:{}" });
          }
        },
      }).then((res) => {
        if (res) {
          setLoader(false);
          toast({
            title: "Success",
            status: "success",
            duration: 4000,
            isClosable: true,
            description: RecordSize + " records uploaded",
          });
        }
        if (res.data?.createSub.errors) {
          toErrorMap(res.data.createSub.errors);
          console.log(res.data.createSub.errors);
        } else if (res.data?.createSub.sub) {
        }
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <Button onClick={onOpen} ml="3">
        Import File
      </Button>

      <Modal
        size="4xl"
        colorScheme="whiteAlpha"
        isCentered
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import File</ModalHeader>

          {Loader === true ? (
            <div>
              <img className="loader" src="/static/Loader.gif" />
            </div>
          ) : (
            <>
              <ModalBody>
                <Flex>
                  <Box w="100%" p={4}>
                    <div
                      {...getRootProps()}
                      className="dropBox"
                      style={{
                        height: "100px",
                        borderColor: "lightgrey",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                      }}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <>
                          <p>
                            Drag 'n' drop file here, or click to select file
                          </p>
                          <br />
                          <p>First row should contain feilds name</p>
                        </>
                      )}
                    </div>

                    <Flex p="2">
                      {RecordSize === "" ? (
                        ""
                      ) : (
                        <Box p="2">
                          <Text>{filename}</Text>
                          <Text>Total Records: {RecordSize}</Text>
                        </Box>
                      )}
                      <Spacer />
                      <Box>
                        <Button onClick={clear} colorScheme="teal" mr="4">
                          Clear
                        </Button>
                      </Box>
                    </Flex>

                    <DetailsDropDown
                      name="Name"
                      options={rows}
                      action={childHandler}
                    />
                    <DetailsDropDown
                      name="Email"
                      options={rows}
                      action={childHandler}
                    />
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  mr={2}
                  type="submit"
                  background="blue"
                  color="white"
                  as="a"
                  href="/static/sampletest.zip"
                  download
                >
                  Download samples
                </Button>
                <Button
                  mr={2}
                  type="submit"
                  background="blue"
                  color="white"
                  onClick={uploadData}
                >
                  Upload
                </Button>

                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
