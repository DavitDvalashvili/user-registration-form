export type usersState = {
  loading: boolean;
  usersData: userData;
  error: string;
  getUsers: (params: { search_term: string; page: string }) => Promise<void>;
};

export type userData = {
  users: user[];
  total: number;
  page: number;
  totalPage: number;
};

export type user = {
  id: string;
  first_name: string;
  last_name: string;
  personal_id: string;
  date_of_birth: Date;
  email: string;
  alternative_email: string;
  mobile_number: string;
  alternative_mobile_number: string;
  photo_url: string;
  position: string;
  gender: string;
};
