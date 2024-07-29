import { DynamicStructuredTool } from "@langchain/core/tools";
import { healthInsurancePlansToolDescription } from "./toolDescriptions";

export const healthInsurancePlans = new DynamicStructuredTool({
  name: "health-insurance-plan",
  description: healthInsurancePlansToolDescription.description,
  schema: healthInsurancePlansToolDescription.schema,
  func: async () => {
    // api call
    return healthInsurancePlansToolDescription.response;
  },
});
