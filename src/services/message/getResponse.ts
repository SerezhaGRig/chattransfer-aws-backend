import { Repository } from "typeorm";
import MessageStream from "../../entities/messageStream";

type GetMessageResponseDeps = {
  streamRepo: Repository<MessageStream>;
};

export const buildGetMessageResponse =
  ({ streamRepo }: GetMessageResponseDeps) =>
  async (messageId: string) => {
    const messages = streamRepo.find({
      where: { message_id: messageId },
      order: {
        timestamp: "DESC",
      },
    });
    return messages;
  };
