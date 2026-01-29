"use client";

import { useTranslation } from "react-i18next";
import styles from "./test1.module.scss";
import { Col, Row } from "antd";
import { useState } from "react";

type ShapeType =
  | "square"
  | "circle"
  | "ellipse"
  | "trapezoid"
  | "rectangle"
  | "rhombus";

export default function Page() {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<ShapeType[]>([
    "square",
    "circle",
    "ellipse",
    "trapezoid",
    "rectangle",
    "rhombus",
  ]);
  const [isMovePosition, setIsMovePosition] = useState<boolean>(false);

  const moveLeft = () => {
    setShapes((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      if (first) copy.push(first);
      return copy;
    });
  };

  const moveRight = () => {
    setShapes((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) copy.unshift(last);
      return copy;
    });
  };

  const onMovePosition = () => {
    setIsMovePosition((prev) => !prev);
  };

  const shuffleShapes = () => {
    setShapes((prev) => {
      const copy = [...prev];

      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }

      return copy;
    });
  };

  return (
    <>
      <h1 className={styles["header-title"]}>{t("page-test-one-title")}</h1>
      <div className={styles.container}>
        <Row gutter={16}>
          <Col span={6}>
            <div className={styles.card} onClick={moveLeft}>
              <div className={styles.shapeWrapper}>
                <div className={styles["triangle-left"]} />
              </div>
              <div className={styles.tag}>
                {t("page-test-one.move-position")}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.card} onClick={onMovePosition}>
              <div className={styles.shapeWrapper}>
                <div className={styles["triangle-up"]}></div>
              </div>
              <div className={styles.shapeWrapper}>
                <div className={styles["triangle-down"]}></div>
              </div>
              <div className={styles.tag}>
                {t("page-test-one.change-position")}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.card} onClick={moveRight}>
              <div className={styles.shapeWrapper}>
                <div className={styles["triangle-right"]} />
              </div>
              <div className={styles.tag}>
                {t("page-test-one.move-position")}
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.divider} />
        <Row gutter={16}>
          <Col span={isMovePosition ? 3 : 6} />
          {shapes.slice(0, 3).map((shape, index) => (
            <Col span={6} key={index}>
              <div className={styles.card} onClick={shuffleShapes}>
                <div className={styles.shapeWrapper}>
                  <div className={styles[shape]} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row gutter={16}>
          <Col span={isMovePosition ? 6 : 3} />
          {shapes.slice(3, 6).map((shape, index) => (
            <Col span={6} key={index + 3}>
              <div className={styles.card} onClick={shuffleShapes}>
                <div className={styles.shapeWrapper}>
                  <div className={styles[shape]} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
