export type LocalizationType = MainPageOptionType &
  PageTestOneType &
  PageTestTwoType;

type MainPageOptionType = {
  "main-page-option": {
    "header-title": string;
    "test-1-title": string;
    "test-1-description": string;
    "test-2-title": string;
    "test-2-description": string;
  };
};

type PageTestOneType = {
  "page-test-one-title": string;
  "page-test-one": {
    "move-position": string;
    "change-position": string;
  };
};

type PageTestTwoType = {
  "page-test-two-title": string;
  "page-test-two": {
    form: {
      title: {
        label: string;
        mr: string;
        mrs: string;
        ms: string;
        placeholder: string;
      };
      "first-name": {
        label: string;
      };
      "last-name": {
        label: string;
      };
      birthday: {
        label: string;
        placeholder: string;
      };
      nationality: {
        label: string;
        placeholder: string;
        thai: string;
        french: string;
        american: string;
      };
      citizenID: {
        label: string;
      };
      gender: {
        label: string;
        male: string;
        female: string;
        unsex: string;
      };
      phone: {
        label: string;
      };
      passport: {
        label: string;
      };
      salary: {
        label: string;
      };
      "reset-button": {
        label: string;
      };
      "submit-button": {
        label: string;
      };
    };
    "home-button": string;
    table: {
      header: {
        name: string;
        gender: string;
        phone: string;
        nationality: string;
        manage: string;
      };
      "select-all": string;
      "delete-button": string;
      "edit-button": string;
      "previous-button": string;
      "next-button": string;
    };
  };
};
