"use client";

import styles from "@/app/styles/UserTable.module.scss";
import { useState } from "react";
import { Table, Button, Space, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

import { deleteUser, startEdit } from "@/store/userSlice";
import type { UserData } from "@/store/userSlice";
import { useTranslation } from "react-i18next";

export default function UserTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const users = useSelector((state: RootState) => state.users.list);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };
  const handleDeleteSelected = () => {
    if (selectedRowKeys) {
      selectedRowKeys.forEach((id) => {
        dispatch(deleteUser(String(id)));
      });
      setSelectedRowKeys([]);
    }
  };

  const columns: ColumnsType<UserData> = [
    {
      title: t("page-test-two.table.header.name"),
      key: "name",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
      width: "20%",
      sorter: (a, b) =>
        `${a.firstname} ${a.lastname}`.localeCompare(
          `${b.firstname} ${b.lastname}`,
        ),
    },
    {
      title: t("page-test-two.table.header.gender"),
      key: "gender",
      render: (_, record) =>
        t(`page-test-two.form.gender.${record.gender.toLowerCase()}`),
      width: "15%",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("page-test-two.table.header.phone"),
      key: "mobile",
      render: (_, record) => `${record.mobile.code}${record.mobile.number}`,
      width: "25%",
      sorter: (a, b) =>
        `${a.mobile.code}${a.mobile.number}`.localeCompare(
          `${b.mobile.code}${b.mobile.number}`,
        ),
    },
    {
      title: t("page-test-two.table.header.nationality"),
      key: "nationality",
      render: (_, record) =>
        t(`page-test-two.form.nationality.${record.nationality.toLowerCase()}`),
      width: "20%",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("page-test-two.table.header.nationality"),
      key: "manage",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className={styles["no-border"]}
            onClick={() => dispatch(startEdit(record))}
          >
            {t("page-test-two.table.edit-button")}
          </Button>
          <Button
            className={styles["no-border"]}
            onClick={() => {
              dispatch(deleteUser(record.id));
              alert("Delete Success");
            }}
          >
            {t("page-test-two.table.delete-button")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={styles["tab-select-all"]}>
        <Checkbox
          checked={selectedRowKeys.length === users.length && users.length > 0}
          indeterminate={
            selectedRowKeys.length > 0 && selectedRowKeys.length < users.length
          }
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(users.map((u) => u.id));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        >
          Select All
        </Checkbox>
        <Button onClick={handleDeleteSelected}>DELETE</Button>
      </div>
      <Table<UserData>
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        pagination={{
          position: ["topRight"],
          pageSize: 10,
          itemRender: (_, type, originalElement) => {
            if (type === "prev") {
              return (
                <a className={styles["page-link"]}>
                  {t("page-test-two.table.previous-button")}
                </a>
              );
            }
            if (type === "next") {
              return (
                <a className={styles["page-link"]}>
                  {t("page-test-two.table.next-button")}
                </a>
              );
            }
            return originalElement;
          },
        }}
        bordered={false}
      />
    </div>
  );
}
