import { getSSMParam } from "../../../utils/ssm/getParam";
import { getDataSourceInstance } from "../../../instances/dataSource";
import { getConnectionParams } from "../../../config";
import Bot from "../../../entities/bot";
const { BOT_PERSONALITY_PREAMBLE } = process.env;

export const personalityPreamble = async (botName?: string) => {
  if (botName) {
    const dataSource = await getDataSourceInstance(getConnectionParams());
    return (
      await dataSource.getRepository(Bot).findOne({
        where: {
          name: botName,
        },
      })
    )?.personal_preamble;
  }
  return getSSMParam(BOT_PERSONALITY_PREAMBLE);
};
export const responseFormat =
  "Return the answer more human readable, in a markdown formatted text.";
