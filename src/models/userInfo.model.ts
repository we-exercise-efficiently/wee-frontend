interface IAuthoritiesProps {
  authority: string;
}

export interface IUserInfoProps {
  authorities: IAuthoritiesProps[];
  commentList: [];
  communityList: [];
  email: string;
  info: IInfoProps;
  likeList: [];
  nickname: string;
  routineList: [];
  todoList: [];
  userId: number;
}

interface IInfoProps {
  bodyFat: number;
  gender: boolean;
  goal: string;
  height: number;
  interest: string;
  level: null | string;
  weight: number;
}
