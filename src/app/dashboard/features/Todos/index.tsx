"use client";
import useSWR from "swr";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";
import { useFetchData } from "../../utils/fetcher";
import { Todo } from "./types";
import { memo, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import { Card, Typography } from "antd";
import { redirect } from "next/navigation";

export const Todos = memo(function Todos() {
  const { user } = useContext(UserContext);
  const { protectedFetcher } = useFetchData();
  console.log(user);

  const { data, mutate, error } = useSWR<Todo[]>(
    [user, "todos"],
    protectedFetcher({ url: "todos", token: user?.accessToken }),
    {
      revalidateOnFocus: false,
    }
  );

  if (error) {
    redirect("/login");
  }

  return (
    <Card>
      <Typography style={{ marginBottom: "1rem" }}>Todo List</Typography>

      <div style={{ marginBottom: "1rem" }}>
        <AddTodo {...{ mutate }} />
      </div>

      <TodoList {...{ data, mutate }} />
    </Card>
  );
});
