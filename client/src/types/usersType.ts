export type usersState = {
  loading: boolean;
  usersData: userData;
  error: string;
  getUsers: (params: { searchTerm: string; page: string }) => Promise<void>;
  deleteAlternativeContact: (params: {
    id: string;
    type: string;
  }) => Promise<void>;
  addUsers: (newUser: user) => Promise<void>;
  updateUser: (user: user) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
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
  date_of_birth: string;
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
  user: user;
  setShowDetailView: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeleteBoxProps = {
  user: user;
  searchTerm: string;
  page: string;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeleteAdditional = {
  deleteTarget: string;
  user: user;
  setDeleteAdditionalInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetailView: React.Dispatch<React.SetStateAction<boolean>>;
};

export type updateProps = {
  user: user;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
