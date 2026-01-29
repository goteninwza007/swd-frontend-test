"use client";

import { Input, Row, Col } from "antd";
import type { InputRef } from "antd";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

import { updateField } from "@/store/userSlice";

import styles from "@/app/styles/CitizenIDInput.module.scss";
export default function CitizenIDInput() {
  const dispatch = useDispatch<AppDispatch>();

  const citizenID = useSelector(
    (state: RootState) => state.users.formData.citizenID,
  );

  const refs = useRef<Array<InputRef | null>>([]);
  const lengths = [1, 4, 5, 2, 1];
  const values: string[] = [];
  let start = 0;

  for (const len of lengths) {
    values.push(citizenID.slice(start, start + len));
    start += len;
  }

  const updatePart = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, "");

    const copy = [...values];
    copy[index] = cleaned;

    dispatch(
      updateField({
        field: "citizenID",
        value: copy.join(""),
      }),
    );

    if (cleaned.length === lengths[index]) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <Row gutter={12} align="middle" className={styles.row}>
      <Col>
        <Input
          ref={(el) => {
            refs.current[0] = el;
          }}
          value={values[0]}
          maxLength={1}
          className={styles.input1}
          onChange={(e) => updatePart(0, e.target.value)}
        />
      </Col>
      <Col className={styles.dash}>-</Col>
      <Col>
        <Input
          ref={(el) => {
            refs.current[1] = el;
          }}
          value={values[1]}
          maxLength={4}
          className={styles.input3}
          onChange={(e) => updatePart(1, e.target.value)}
        />
      </Col>
      <Col className={styles.dash}>-</Col>
      <Col>
        <Input
          ref={(el) => {
            refs.current[2] = el;
          }}
          value={values[2]}
          maxLength={5}
          className={styles.input3}
          onChange={(e) => updatePart(2, e.target.value)}
        />
      </Col>
      <Col className={styles.dash}>-</Col>
      <Col>
        <Input
          ref={(el) => {
            refs.current[3] = el;
          }}
          value={values[3]}
          maxLength={2}
          className={styles.input2}
          onChange={(e) => updatePart(3, e.target.value)}
        />
      </Col>
      <Col className={styles.dash}>-</Col>
      <Col>
        <Input
          ref={(el) => {
            refs.current[4] = el;
          }}
          value={values[4]}
          maxLength={1}
          className={styles.input1}
          onChange={(e) => updatePart(4, e.target.value)}
        />
      </Col>
    </Row>
  );
}
