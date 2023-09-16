export interface Card {
  desktopId: any;
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

  membersCard: {
    created_at: string;
    email: string;
    id: number;
    primary_name: string;
    second_name: string;
  };

  listTask: {
    id: number,
    title: string,
    created_at: string,
    task: {
      id: number;
      title: any;
      listId: number;
      done: boolean;
      created_at: string;
      delivery_date: string;
    }
  }[]
}
