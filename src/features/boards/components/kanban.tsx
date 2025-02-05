"use client";

import React from "react";
import { useListStore } from "../stores/list";
import ListItem from "./list-item";
import AddNewList from "./add-new-list";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Kanban() {
  const lists = useListStore((state) => state.lists);
  return (
    <ScrollArea className="w-96 whitespace-nowrap">
      <div className="flex w-max space-x-4 p-2">
        {lists.map((list) => (
          <ListItem key={list.id} list={list} />
        ))}
        <AddNewList />
      </div>
    </ScrollArea>
  );
}
