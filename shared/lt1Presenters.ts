export type Lt1Presenter = {
  id: string;
  name: string;
  title: string;
  status: "active" | "cancelled";
};

export const lt1Presenters: Lt1Presenter[] = [
  { id: "tbd-1", name: "Coming Soon", title: "TBD", status: "active" },
  { id: "tbd-2", name: "Coming Soon", title: "TBD", status: "active" },
];
