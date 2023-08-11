export interface Card {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  delivery_date: Date;

  comment: {
    id: number;
    userId: number;
    comment_text: string;
    created_at: Date;
  };
}
