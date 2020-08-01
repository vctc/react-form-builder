import { notification } from "antd";
export const openNotification = (message, description) => {
  const args = {
    message,
    description,
    duration: 3,
  };
  notification.open(args);
};
