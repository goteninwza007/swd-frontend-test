"use client";

import { Select } from "antd";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      <Select
        value={i18n.language}
        style={{ width: 140 }}
        onChange={(value) => i18n.changeLanguage(value)}
        options={[
          { value: "en", label: "English" },
          { value: "th", label: "ไทย" },
        ]}
      />
    </div>
  );
}
