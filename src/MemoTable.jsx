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
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import Draggable from "react-draggable";
import { useRef } from "react";

export const MemoTable = () => {
  //inputareaに入力する文字列
  const [inputmemo, setInputmemo] = useState("");

  //memoのデータ
  const [posmemo, setPosMemo] = useState([]);

  //inputarea入力時の変化
  const onChangeInputMemo = (event) => setInputmemo(event.target.value);

  // //データ取得
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp"));
    const unsub = onSnapshot(q, (Snapshot) =>
      setPosts(Snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsub;
  }, []);

  //データ追加
  const onClickAdd = async (e) => {
    await addDoc(collection(db, "posts"), {
      memo: inputmemo,
      timestamp: serverTimestamp(),
    });
    setInputmemo("");
  };

  //データ削除
  const onClickDelete = async (id) => {
    const postData = doc(db, "posts", id);
    await deleteDoc(postData);
  };

  //modal
  const [Modal, open, close] = useModal("root", {
    preventScroll: true,
  });

  //位置情報
  const [currentPosition, setCurrentPosition] = useState({
    xRate: 150,
    yRate: 150,
  });

  // const isDraggingRef = useRef(false);

  // const onDrag = (e: DraggableEvent, data: Draggabledata) => {
  //   setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
  //   // isDraggingRef.current = true;
  // };

  // const onStop = () => {
  //   if (!isDraggingRef.current) {
  //     setCurrentRotate(currentRotate + 90);
  //     isDraggingRef.current = false;
  //   }
  // };

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
        {posts.map((memo) => {
          return (
            // <Draggable
            //   position={{ x: currentPosition.xRate, y: currentPosition.yRate }}
            //   onDrag={onDrag}
            // >
            <SPos
              key={memo.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Delete>
                　
                <FontAwesomeIcon
                  icon={faBan}
                  size="lg"
                  onClick={(e) => onClickDelete(memo.id)}
                />
              </Delete>
              <p>{memo.memo}</p>
            </SPos>
            // </Draggable>
          );
        })}
      </Sdiv>
    </>
  );
};

const Sdiv = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
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
  margin-left: 10px;
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
  white-space: pre-wrap;
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
  width: 250px;
  border: 1px solid white;
  height: 200px;
  padding: 10px;
  margin: 15px;
  box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.2),
    0px 0px 0px 1px rgba(10, 10, 10, 0.02);
  white-space: pre-wrap;
`;

const Delete = styled.div`
  color: teal;
  display: flex;
  position: relative;
  left: 200px;
  bottom: 10px;
  border-radius: 999px;
  &:hover {
    color: red;
  }
`;
