import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { calculateBirthDate, createBase64JsonString } from "./helpers";
import axios from "axios";

const { EDE_SUBDOMANIN } = process.env;

export const healthInsurancePlans = new DynamicStructuredTool({
  name: "health-insurance-plan",
  description:
    "Call if it is users first message or question and this tool isn't already called",
  schema: z.object({
    age: z.number().describe("age of customer integer"),
    householdIncome: z
      .number()
      .describe("household income of customer decimal"),
    householdSize: z.number().describe("customer's household size integer"),
    effectiveDate: z
      .string()
      .describe("effective date customer format DateTime"),
    tobaccoUse: z
      .boolean()
      .describe("is customer using tobacco boolean true or false"),
  }),
  func: async ({
    age,
    householdIncome,
    householdSize,
    effectiveDate,
    tobaccoUse,
  }) => {
    if (EDE_SUBDOMANIN) {
      const params = {
        householdIncome: householdIncome,
        householdSize: householdSize,
        showPlans: true,
        effectiveDate: effectiveDate,
        zipCode: "44121",
        countyFips: "39035",
        product: "Medical",
        demographics: [
          {
            relationship: "Self",
            isTobaccoUser: tobaccoUse ? 1 : 0,
            person: {
              birthDate: calculateBirthDate(age),
            },
          },
        ],
      };

      // Create the Base64 encoded JSON string
      const base64JsonString = createBase64JsonString(params);

      // Construct the full URL
      const subdomain = EDE_SUBDOMANIN;
      const url = `https://${subdomain}.insxcloud.com/get-a-quote?q=${base64JsonString}`;
      const { data } = await axios.get(url);
      return `Received quote data: ${JSON.stringify(data, null, 2)}`;
    }
    return `tell something about health insurance plans`;
  },
});
