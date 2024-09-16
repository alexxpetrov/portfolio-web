import { Layout, List, Card, Typography, Input, Button } from "antd";
import {
  PlusOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

import { ENDPOINT } from "../../utils/fetcher";
import { KeyedMutator } from "swr";
import { Todo } from "./types";

const { Header, Content } = Layout;
const { Title } = Typography;

type TodoListProps = {
  data?: Todo[];
  mutate: KeyedMutator<Todo[]>;
};
export const TodoList: React.FC<TodoListProps> = ({ data, mutate }) => {
  const handleStatusUpdate = async (id: number) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      return r.json();
    });

    await mutate(updated);
  };

  if (!data?.length) {
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
          dataSource={data}
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
