export interface Profile {
    id: string;
    created_at: string;
    username: string;
    avatar_url: string | null;
    status: string | null;
    last_seen: string | null;
  }
  
  export interface Message {
    id: string;
    created_at: string;
    content: string;
    sender_id: string;
    receiver_id: string;
    read: boolean;
    image_url: string | null;
  }