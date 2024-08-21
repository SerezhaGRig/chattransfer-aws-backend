import { MoreThan, Repository } from "typeorm";
import MessageStream from "../../entities/messageStream";

type GetMessageResponseDeps = {
  streamRepo: Repository<MessageStream>;
};

export const buildGetMessageResponse =
  ({ streamRepo }: GetMessageResponseDeps) =>
  async (p: { messageId: string; from: number }) => {
    const messages = streamRepo.find({
      where: {
        message_id: p.messageId,
        timestamp: p.from && MoreThan(p.from),
      },
      order: {
        timestamp: "ASC",
      },
    });
    return messages;
  };
