export type User = {
  username: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
}

export type Interest = {
  id: string;
  title: string;
}

export type UserInterest = {
  interest_id: string;
  interest_title: string;
  rating: number;
}

export type PutUserInterestRequest = {
  id: string;
  rating: number;
}

export type OtherUser = {
  first_name: string,
  last_name: string,
  username: string,
  id: string,
  photo_url: string | null,
  attraction_percentage: number,
  relation: number
}

export type PutRelationRequest = {
  other_id: string,
  rating: number
}

export type HobbyAssessment = {
  interest_id: string;
  interest_title: string;
  rating: number | null;
};

export type CardProps = {
  hobby: HobbyAssessment;
};
