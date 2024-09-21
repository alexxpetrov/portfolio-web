"use client";
import useSWR from "swr";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";
import { useFetchData } from "../../utils/fetcher";
import { Todo } from "./types";
import { memo } from "react";

import { Card, Typography } from "antd";

export const Todos = memo(function Todos({ todos }: { todos: Todo[] }) {
  const { protectedFetcher } = useFetchData();

  const { data: todoList, mutate } = useSWR<Todo[]>(
    "todos",
    protectedFetcher("todos", { method: "POST" }),
    {
      fallbackData: todos,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  return (
    <Card>
      <Typography style={{ marginBottom: "1rem" }}>Todo List</Typography>

      <div style={{ marginBottom: "1rem" }}>
        <AddTodo {...{ mutate }} />
      </div>

      <TodoList {...{ todoList, mutate }} />
    </Card>
  );
});
