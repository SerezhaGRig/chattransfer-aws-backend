import { DynamicStructuredTool } from "@langchain/core/tools";
import { healthInsurancePlansToolDescription } from "./toolDescriptions";

export const healthInsurancePlans = async () => {
  const healthInsurancePlansToolParams =
    await healthInsurancePlansToolDescription();
  return new DynamicStructuredTool({
    name: "health-insurance-plan",
    description: healthInsurancePlansToolParams.description,
    schema: healthInsurancePlansToolParams.schema,
    func: async () => {
      // api call
      return healthInsurancePlansToolParams.response;
    },
  });
};
