"use client";

import { Select, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store/store";
import { updateMobile } from "@/store/userSlice";

import styles from "@/app/styles/MobileInput.module.scss";

const countries = [
  { label: "🇹🇭 +66", value: "+66" },
  { label: "🇫🇷 +33", value: "+33" },
  { label: "🇺🇸 +1", value: "+1" },
];

export default function MobileInput() {
  const dispatch = useDispatch<AppDispatch>();

  const mobile = useSelector((state: RootState) => state.users.formData.mobile);

  return (
    <Row gutter={16} className={styles.row}>
      <Col span={5}>
        <Select
          value={mobile.code}
          options={countries}
          className={styles.select}
          onChange={(val) => dispatch(updateMobile({ ...mobile, code: val }))}
        />
      </Col>
      <Col className={styles.dash}>-</Col>
      <Col span={8}>
        <Input
          value={mobile.number}
          placeholder="Phone Number"
          className={styles.input}
          onChange={(e) =>
            dispatch(
              updateMobile({
                ...mobile,
                number: e.target.value.replace(/\D/g, ""),
              }),
            )
          }
        />
      </Col>
    </Row>
  );
}
