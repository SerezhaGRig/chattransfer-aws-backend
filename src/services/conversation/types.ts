export type ConversationMessage = {
  type: "HumanMessage" | "AIMessage";
  content: string;
};
export type ConversationMetadata = {
  source: "loop" | "input";
  step: number;
  writes:
    | {
        agent: {
          messages: [
            {
              id: ["langchain_core", "messages", "AIMessage"];
              kwargs: {
                content: string;
              };
            },
          ];
        };
      }
    | {
        __start__: {
          messages: [
            {
              id: ["langchain_core", "messages", "HumanMessage"];
              kwargs: {
                content: "I want to buy an health insureance pachage, can you help ?";
              };
            },
          ];
        };
      };
};

export type ConversationMetadataAgent = {
  source: "loop";
  step: number;
  writes: {
    agent: {
      messages: [
        {
          id: ["langchain_core", "messages", "AIMessage"];
          kwargs: {
            content: string;
          };
        },
      ];
    };
  };
};

export type ConversationMetadataHuman = {
  source: "input";
  step: number;
  writes: {
    __start__: {
      messages: [
        {
          id: ["langchain_core", "messages", "HumanMessage"];
          kwargs: {
            content: "I want to buy an health insureance pachage, can you help ?";
          };
        },
      ];
    };
  };
};

export const isAgentMessage = (
  metadata: ConversationMetadata,
): metadata is ConversationMetadataAgent => {
  return "agent" in metadata;
};

export const isHumanMessage = (
  metadata: ConversationMetadata,
): metadata is ConversationMetadataHuman => {
  return "__start__" in metadata;
};
