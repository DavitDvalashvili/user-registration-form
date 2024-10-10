export type usersState = {
  loading: boolean;
  usersData: userData;
  error: string;
  getUsers: (params: { searchTerm: string; page: string }) => Promise<void>;
  addUsers: (newUser: user) => Promise<void>;
};

export type userData = {
  users: user[];
  total: number;
  page: number;
  totalPages: number;
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

export type imageReview = {
  setImageReview: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  user: user;
};

export type SearchBoxProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export type DetailViewProps = {
  targetUser: user;
  setShowDetailView: React.Dispatch<React.SetStateAction<boolean>>;
};
