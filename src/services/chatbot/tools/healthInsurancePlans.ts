import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

export const healthInsurancePlans = new DynamicStructuredTool({
  name: "health-insurance-plan",
  description:
    "Call if the user is interested in health insurance plans or wants to buy a plane.",
  schema: z.object({
    age: z.string().describe("age of customer"),
    householdIncome: z.string().describe("household income of customer"),
    householdSize: z.string().describe("customer's household size"),
    effectiveDate: z.string().describe("effective date customer"),
  }),
  func: async () => {
    // api call
    return `tell something about health insurance plans`;
  },
});
