import { DynamicStructuredTool } from "@langchain/core/tools";
import { connectWithAgentToolDescription } from "./toolDescriptions";
import Contact from "../../../entities/contact";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";

export const connectWithAgent = async ()=>{
  const connectWithAgentToolParams = await connectWithAgentToolDescription();
  return new DynamicStructuredTool({
    name: "connect-with-agent",
    description: connectWithAgentToolParams.description,
    schema: connectWithAgentToolParams.schema,
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
      return connectWithAgentToolParams.response;
    },
  })
};
