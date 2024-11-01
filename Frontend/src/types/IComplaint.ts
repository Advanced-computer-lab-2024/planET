export interface IComplaint {
  complaint_id: string;
  tourist_name: {
    _id: string;
    user_id: {
      _id: string;
      name: string;
    };
  };
  title: string;
  body: string;
  reply: string;
  date: Date;
  status: string;
}