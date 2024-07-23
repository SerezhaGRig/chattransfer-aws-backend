import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

export const healthInsurancePlans = new DynamicStructuredTool({
  name: "health-insurance-plan",
  description:
    "Call if it is users first message or question and this tool isn't already called",
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
