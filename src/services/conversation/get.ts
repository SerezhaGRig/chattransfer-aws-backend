import { QueryRunner } from "typeorm";
import {
  ConversationMessage,
  ConversationMetadata,
  isAgentMessage,
  isHumanMessage,
} from "./types";

type GetConversationByIdDeps = {
  queryRunner: QueryRunner;
};

const transformMetadata = (
  metadata: ConversationMetadata,
): ConversationMessage | undefined => {
  if (isHumanMessage(metadata)) {
    const content = metadata?.writes?.__start__?.messages?.[0]?.kwargs?.content;
    if (content) {
      return {
        content,
        type: "HumanMessage",
      };
    }
  } else if (isAgentMessage(metadata)) {
    const content = metadata?.writes?.agent?.messages?.[0]?.kwargs?.content;
    if (content) {
      return {
        content: metadata.writes.agent.messages[0].kwargs.content,
        type: "AIMessage",
      };
    }
  }
  return undefined;
};
export const buildGetConversationById =
  ({ queryRunner }: GetConversationByIdDeps) =>
  async (conversationId: string): Promise<ConversationMessage[]> => {
    // Find faq with passed id and all necessary relations
    const checkpoints = await queryRunner.query(
      `SELECT metadata FROM checkpoints WHERE thread_id = '${conversationId}'`,
    );
    console.info("checkpoints", { checkpoints });

    const conversation = checkpoints
      .map((checkpoint: { metadata: string }) => {
        return transformMetadata(JSON.parse(checkpoint.metadata));
      })
      .filter(
        (convMessage: ConversationMessage | undefined) =>
          convMessage !== undefined,
      );
    return conversation;
  };
