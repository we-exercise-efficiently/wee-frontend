import { AxiosResponse } from "axios";

interface ILogProps {
  text: string;
  type: ILogTypes;
  error?: Error;
  response?: AxiosResponse;
}

export enum ILogTypes {
  WARNNING = "red",
  ALERT = "blue",
  SUCCESS = "green",
  NORMAL = "yellow",
}

export function logHandler({ text, type, error, response }: ILogProps) {
  if (!error) {
    // 에러가 없는 경우

    if (response) {
      console.log(
        `%c${text}`,
        `background-color: ${type}; padding: 2px 8px; border-radius: 16px;`,
        response
      );
    } else if (type === ILogTypes.NORMAL) {
      return console.log(
        `%c${text}`,
        `background-color: ${type}; padding: 2px 8px; border-radius: 16px; color: black`,
        response ?? ""
      );
    } else {
      console.log(
        `%c${text}`,
        `background-color: ${type}; padding: 2px 8px; border-radius: 16px;`
      );
    }
  } else {
    // 에러가 있는 경우
    console.error(
      `%c${text}`,
      `background-color: ${type}; padding: 2px 8px; border-radius: 16px;`,
      error
    );
  }
}
