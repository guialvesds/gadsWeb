export interface Desktop {
  id?: number;
  name: string;
  user_id?: number;
  created_at: Date;
  link_access?: string;
  card?: [
    title: string,
    description: string,
    delivery_date: Date,
    creted_at: Date,
    desktopId: number,
    id: number
  ];
}
