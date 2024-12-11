"use client";
import { Card, Typography } from "antd";
import { memo, useEffect, useRef } from "react";
import useSWR from "swr";
import { useFetchData } from "../../utils/fetcher";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";
import { Todo } from "./types";

export const Todos = memo(function Todos({ todos }: { todos: Todo[] }) {
  const { protectedFetcher } = useFetchData();
  const workerRef = useRef<Worker | null>(null);

  const { data: todoList, mutate } = useSWR<Todo[]>(
    "todos",
    protectedFetcher("todos", { method: "GET" }),
    {
      fallbackData: todos,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  useEffect(() => {
    const worker = new Worker(
      new URL("../../../workers/worker.ts", import.meta.url),
      {
        type: "module",
      }
    );

    workerRef.current = worker;

    return () => {
      worker.terminate();
    };
  }, []);

  const handleMutate = (data: Todo[]) => {
    workerRef.current!.postMessage("hello from main/dashboard");
    mutate(data);
  };

  return (
    <Card>
      <Typography style={{ marginBottom: "1rem" }}>Todo List</Typography>

      <div style={{ marginBottom: "1rem" }}>
        <AddTodo {...{ mutate: handleMutate }} />
      </div>

      <TodoList {...{ todoList, mutate: handleMutate }} />
    </Card>
  );
});
