"use client";

import styles from "./test2.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";

import { setUsers } from "@/store/userSlice";
import type { UserData } from "@/store/userSlice";

import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "antd";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem("users");

    if (stored) {
      const users: UserData[] = JSON.parse(stored);
      dispatch(setUsers(users));
    }
  }, [dispatch]);

  return (
    <>
      <h1 className={styles["header-title"]}>{t("page-test-two-title")}</h1>
      <div className={styles.container}>
        <UserForm />
      </div>
      <div className={styles["container-table"]}>
        <UserTable />
      </div>
      <div className={styles["home-button"]}>
        <Link href="/">
          <Button>{t("page-test-two.home-button")}</Button>
        </Link>
      </div>
    </>
  );
}
