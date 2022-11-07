export interface IBookForm {
  titleForm: string;
  authorForm: string;
  editionForm: string;
  yearForm: string;
  editorialForm: string;
  countryForm: string;
  photoForm: string;
  categoryForm: string;
}

export interface ISignupForm {
  usernameSignup: string;
  emailSignup: string;
  passwordSignup: string;
}

export interface ILocalUser {
  id: string;
  username: string;
}
