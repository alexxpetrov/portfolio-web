import { Layout, List, Card, Typography, Input, Button } from "antd";
import {
  PlusOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

import { Todo } from "./types";
import { useFetchData } from "../../utils/fetcher";

const { Header, Content } = Layout;
const { Title } = Typography;

type TodoListProps = {
  todoList?: Todo[];
  mutate: (data: Todo[]) => void;
};
export const TodoList: React.FC<TodoListProps> = ({ todoList, mutate }) => {
  const { protectedFetcher } = useFetchData();

  const handleStatusUpdate = async (id: number) => {
    const { data: newTodos } = await protectedFetcher(`todos/${id}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })();

    await mutate(newTodos);
  };

  if (!todoList?.length) {
    return <div>No todos</div>;
  }

  return (
    <Layout>
      <Header style={{ background: "#001529", padding: "0 20px" }}>
        <Title level={3} style={{ color: "#fff" }}>
          Todo List
        </Title>
      </Header>
      <Content style={{ padding: "20px 50px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Input
            placeholder="Add new task"
            suffix={
              <Button icon={<PlusOutlined />} type="primary">
                Add
              </Button>
            }
          />
        </div>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={todoList}
          renderItem={(item) => (
            <List.Item>
              <Button
                onClick={() => handleStatusUpdate(item.id)}
                icon={
                  item.done ? <CheckCircleOutlined /> : <CheckCircleFilled />
                }
              />
              <Card hoverable>
                <Title level={4}>{item.title}</Title>
                <Title level={4}>{item.body}</Title>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};
