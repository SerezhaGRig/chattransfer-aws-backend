import { DynamicStructuredTool } from "@langchain/core/tools";
import { connectWithAgentToolDescription } from "./toolDescriptions";
import Contact from "../../../entities/contact";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";

export const connectWithAgent = new DynamicStructuredTool({
  name: "connect-with-agent",
  description: connectWithAgentToolDescription.description,
  schema: connectWithAgentToolDescription.schema,
  func: async ({ email, name, phoneNumber, agreement }) => {
    if (agreement) {
      try {
        const dataSource = await getDataSourceInstance(getConnectionParams());
        await dataSource.getRepository(Contact).insert({
          email,
          name,
          phoneNumber,
        });
      } catch (e) {
        console.error(e);
      }
    }
    return connectWithAgentToolDescription.response;
  },
});
