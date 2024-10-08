import { getSSMParam } from "../../../utils/ssm/getParam";
import { getBotConfigDynamic } from "../tools/botConfigDynamic";
const { BOT_PERSONALITY_PREAMBLE } = process.env;

export const personalityPreamble = async (botName?: string) => {
  if (botName) {
    return (await getBotConfigDynamic()).personal_preamble;
  }
  return getSSMParam(BOT_PERSONALITY_PREAMBLE);
};
export const responseFormat =
  "Return the answer more human readable, in a markdown formatted text.";
