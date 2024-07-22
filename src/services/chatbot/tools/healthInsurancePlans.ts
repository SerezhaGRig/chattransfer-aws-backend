import { DynamicTool } from "@langchain/core/tools";

export const healthInsurancePlans = new DynamicTool({
  name: "health-insurance-plan",
  description:
    "Call if user possibly is interested in medical insurance plans or insurance plans " +
    "or user question is out of medical insurance context or health care info",
  func: async () => {
    // api call
    return `tell something about health insurance plans`;
  },
});
