import { DynamicStructuredTool } from "@langchain/core/tools";
import { healthInsurancePlansToolDescription } from "./toolDescriptions";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import User from "../../../entities/user";

export const healthInsurancePlans = new DynamicStructuredTool({
  name: "health-insurance-plan",
  description: healthInsurancePlansToolDescription.description,
  schema: healthInsurancePlansToolDescription.schema,
  func: async (input, runManager, config) => {
    try {
      const conversationId = config.metadata.thread_id;
      if (typeof conversationId === "string") {
        const dataSource = await getDataSourceInstance(getConnectionParams());
        await dataSource.getRepository(User).save({
          conversation_id: conversationId,
          household_size: input.householdSize,
          household_income: input.householdIncome,
          age: input.age,
          tobacco_use: input.tobaccoUse,
          zipcode: input.zipcode,
          effective_date: input.effectiveDate,
        });
      }
    } catch (e) {
      console.error(e);
    }
    return healthInsurancePlansToolDescription.response;
  },
});
