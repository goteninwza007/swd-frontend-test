"use client";

import { Form, Input, Select, Radio, Button, DatePicker, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { updateField, addUser, updateUser, resetForm } from "@/store/userSlice";
import CitizenIDInput from "@/components/CitizenIDInput";
import MobileInput from "@/components/MobileInput";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import styles from "@/app/styles/UserForm.module.scss";

export default function UserForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { formData, editingUser } = useSelector(
    (state: RootState) => state.users,
  );

  const onSubmit = () => {
    if (!formData.title) {
      alert("Title is required");
      return;
    }

    if (!formData.firstname.trim()) {
      alert("First name is required");
      return;
    }

    if (!formData.lastname.trim()) {
      alert("Last name is required");
      return;
    }

    if (!formData.birthday) {
      alert("Birthday is required");
      return;
    }

    if (!formData.nationality) {
      alert("Nationality is required");
      return;
    }

    if (!formData.gender) {
      alert("Gender is required");
      return;
    }

    if (!formData.mobile.code || !formData.mobile.number) {
      alert("Phone number is required");
      return;
    }

    if (!formData.expectedSalary) {
      alert("Expected salary is required");
      return;
    }

    if (editingUser) dispatch(updateUser());
    else dispatch(addUser());

    alert("Save Success");
  };

  return (
    <div className={styles.form}>
      <Form layout="horizontal">
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item label={t("page-test-two.form.title.label")} required>
              <Select
                value={formData.title || undefined}
                placeholder={t("page-test-two.form.title.placeholder")}
                options={[
                  { value: "Mr.", label: t("page-test-two.form.title.mr") },
                  { value: "Mrs.", label: t("page-test-two.form.title.mrs") },
                  { value: "Ms.", label: t("page-test-two.form.title.ms") },
                ]}
                onChange={(val) =>
                  dispatch(updateField({ field: "title", value: val }))
                }
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label={t("page-test-two.form.first-name.label")}
              required
            >
              <Input
                value={formData.firstname}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "firstname",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label={t("page-test-two.form.last-name.label")} required>
              <Input
                value={formData.lastname}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "lastname",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label={t("page-test-two.form.birthday.label")} required>
              <DatePicker
                format=""
                placeholder={t("page-test-two.form.birthday.placeholder")}
                value={formData.birthday ? dayjs(formData.birthday) : null}
                onChange={(date) =>
                  dispatch(
                    updateField({
                      field: "birthday",
                      value: date ? date.toISOString() : "mm/dd/yy",
                    }),
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label={t("page-test-two.form.nationality.label")}
              required
            >
              <Select
                value={formData.nationality || undefined}
                placeholder={t("page-test-two.form.nationality.placeholder")}
                options={[
                  {
                    value: "Thai",
                    label: t("page-test-two.form.nationality.thai"),
                  },
                  {
                    value: "French",
                    label: t("page-test-two.form.nationality.french"),
                  },
                  {
                    value: "American",
                    label: t("page-test-two.form.nationality.american"),
                  },
                ]}
                onChange={(val) =>
                  dispatch(updateField({ field: "nationality", value: val }))
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={t("page-test-two.form.citizenID.label")}>
              <CitizenIDInput />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={t("page-test-two.form.gender.label")} required>
              <Radio.Group
                value={formData.gender}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "gender",
                      value: e.target.value,
                    }),
                  )
                }
              >
                <Radio value="Male">
                  {t("page-test-two.form.gender.male")}
                </Radio>
                <Radio value="Female">
                  {t("page-test-two.form.gender.female")}
                </Radio>
                <Radio value="Unsex">
                  {t("page-test-two.form.gender.unsex")}
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={t("page-test-two.form.phone.label")} required>
              <MobileInput />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item label={t("page-test-two.form.passport.label")}>
              <Input
                value={formData.passportNo}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "passportNo",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} align="top">
          <Col span={10}>
            <Form.Item label={t("page-test-two.form.salary.label")} required>
              <Input
                value={formData.expectedSalary}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "expectedSalary",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={14} className={styles["button-div"]}>
            <Button
              style={{ marginRight: 12 }}
              onClick={() => dispatch(resetForm())}
            >
              {t("page-test-two.form.reset-button.label")}
            </Button>
            <Button onClick={onSubmit}>
              {t("page-test-two.form.submit-button.label")}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
