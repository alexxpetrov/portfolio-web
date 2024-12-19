export type ChatRoom = {id: string, name: string}

export type Message = {
    id: string;
    content: string;
    user_id: string;
    nickname: string;
    room_id: string;
    time_created: string;
    type: "recv" | "self";
  };
  