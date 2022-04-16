import styled from "styled-components";
import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import db from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export const MemoTable = () => {
  const [inputmemo, setInputmemo] = useState("");
  const [posmemo, setPosMemo] = useState([]);

  const onChangeInputMemo = (event) => setInputmemo(event.target.value);

  const onClickAdd = (e) => {
    if (inputmemo === "") return;
    const newPosmemo = [...posmemo, inputmemo];
    setPosMemo(newPosmemo);
    setInputmemo("");
    e.preventDefault();
    //const newMemoRef = doc(collection(db,"posts"));
    //setDoc(newMemoRef);
  };

  const onClickDelete = (index) => {
    const newPosmemo = [...posmemo];
    newPosmemo.splice(index, 1);
    setPosMemo(newPosmemo);
  };

  //modal
  const [Modal, open, close] = useModal("root", {
    preventScroll: true,
  });

  //firebase////////////////////////////////////////////////
  //const [posts, setPosts] = useState([]);
  //useEffect(() => {
  // const postData = collection(db, "posts");
  //getDocs(postData).then((snapShot) => {
  // setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
  //onSnapshot(postData, (post) => {
  //setPosts(post.docs.map((doc) => ({ ...doc.data() })));
  //});
  //});
  //}, []);
  //firebase////////////////////////////////////////////////
  //firebaseから取得するデータを定義

  return (
    <>
      <div>
        <ModalButton onClick={open}>Make</ModalButton>
        <Modal>
          <Modalform>
            <ModalTitle>Enter Memo</ModalTitle>
            <Stextarea
              name="memo"
              placeholder="enter memo"
              value={inputmemo}
              onChange={onChangeInputMemo}
            />
            <Sbutton
              type="submit"
              name="submit"
              onClick={() => {
                close();
                onClickAdd();
              }}
            >
              enter
            </Sbutton>
          </Modalform>
        </Modal>
      </div>

      <Sdiv>
        {posmemo.map((text, index) => {
          return (
            <SPos key={text} drag>
              <Delete>
                　
                <FontAwesomeIcon
                  icon={faBan}
                  size="lg"
                  onClick={() => onClickDelete()}
                />
              </Delete>
              <p>{text}</p>
            </SPos>
          );
        })}
      </Sdiv>
    </>
  );
};

const Sdiv = styled.div`
  background-color: white;
`;

const Modalform = styled.form`
  background-color: white;
  width: 600px;
  height: 500px;
  padding: 30px;
  margin: 15px;
  box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.2),
    0px 0px 0px 1px rgba(10, 10, 10, 0.02);
  border-radius: 6px;
`;

const ModalTitle = styled.h1`
  font-size: 25px;
  color: teal;
`;

const ModalButton = styled.button`
  border-radius: 6px;
  background-color: teal;
  color: white;
  padding: 7px;
  box-shadow: 0px 0px 16px -6px rgba(0, 0, 0, 0.6);
`;

const Stextarea = styled.textarea`
  border: 1px solid LightGray;
  background-color: white;
  border-radius: 6px;
  margin-top: 20px;
  height: 350px;
  width: 100%;
  padding: 10px;
  font-size: 30px;
`;

const Sbutton = styled.button`
  border-radius: 6px;
  background-color: teal;
  color: white;
  padding: 7px;
  width: 300px;
  text-align: center;
  margin: 20px 120px;
  box-shadow: 0px 0px 12px -6px rgba(0, 0, 0, 0.6);
`;

const SPos = styled(motion.div)`
  background-color: lightyellow;
  width: 300px;
  border: 1px solid white;
  height: 250px;
  padding: 10px;
  margin: 15px;
  box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.2),
    0px 0px 0px 1px rgba(10, 10, 10, 0.02);
  white-space: pre-wrap;
  potision: absolute;
`;

const Delete = styled.div`
  color: teal;
  display: flex;
  position: relative;
  left: 260px;
  bottom: 15px;
  border-radius: 999px;
  &:hover {
    color: red;
  }
`;
