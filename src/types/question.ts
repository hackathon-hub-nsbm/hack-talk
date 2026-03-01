export interface Question {
  id: string;
  text: string;
  author: string;
  votes: number;
  votedBy: string[];
  answered: boolean;
  pinned: boolean;
  created_at: Date;
}
