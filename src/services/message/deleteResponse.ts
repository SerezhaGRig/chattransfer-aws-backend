import { Repository } from "typeorm";
import MessageStream from "../../entities/messageStream";

type GetMessageResponseDeps = {
  streamRepo: Repository<MessageStream>;
};

export const buildDeleteMessageResponse =
  ({ streamRepo }: GetMessageResponseDeps) =>
  async (messageId: string) => {
    return streamRepo.delete({
      message_id: messageId,
    });
  };
