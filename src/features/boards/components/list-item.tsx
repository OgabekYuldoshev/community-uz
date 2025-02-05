import React from "react";
import { List } from "../stores/list";

export type ListItemProps = {
  list: List;
};
export default function ListItem({ list }: ListItemProps) {
  return <div className="border p-2 w-[200px] flex-shrink-0">{list.title}</div>;
}
