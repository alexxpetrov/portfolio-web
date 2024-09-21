import { Todos } from "./features/Todos";
import { Todo } from "./features/Todos/types";
import { useSSRFetch } from "./utils/serverSideFetcher";

async function useTodoData(): Promise<Todo[]> {
  const response: Todo[] = await useSSRFetch().protectedFetcher("todos", {
    method: "GET",
    withCredentials: true,
  });

  return response;
}

async function Home() {
  const todos = await useTodoData();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Todos todos={todos} />
      </main>
    </div>
  );
}

export default Home;
