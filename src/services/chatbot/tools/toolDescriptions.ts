import { z } from "zod";

const esToolDescriptions = [
  {
    source: "Notice of Benefit and Payment Parameters for 2025 Final Rule",
    name: "notice-of-benefit-and-payment-parameters-for-2025-final-rule",
    description:
      "La Ley Pública 111-148 exige que el resumen de beneficios y cobertura de los planes de salud se presente en un formato uniforme, que no exceda las 4 páginas y utilice una fuente de al menos 12 puntos, y de manera cultural y lingüísticamente apropiada para el afiliado promedio del plan. El resumen debe incluir elementos clave como definiciones uniformes de términos de seguros, descripciones de cobertura y costos compartidos, excepciones y limitaciones, disposiciones de renovabilidad, etiquetas de hechos de cobertura e información de contacto para más consultas.",
  },
  {
    source: "ACA Law act",
    name: "aca-law-act",
    description:
      "Esta publicación explica cómo reclamar la deducción detallada por gastos médicos y dentales en el Anexo A (Formulario 1040), incluyendo qué gastos califican, cómo manejar los reembolsos y cómo reportar la deducción. También proporciona orientación sobre temas relacionados, como gastos laborales relacionados con discapacidades, primas de seguro de salud para autónomos y cómo buscar más asistencia tributaria.",
  },
  {
    source: "Medicaid & Dental benefits",
    name: "medicaid-dental-benefits",
    description:
      "La atención médica preventiva, incluidas las evaluaciones, chequeos y asesoramiento, es esencial para prevenir y detectar enfermedades temprano cuando el tratamiento es más efectivo, y para promover el bienestar general a través de elecciones de estilo de vida saludables. Tener un proveedor de confianza puede ayudarlo a obtener los servicios preventivos adecuados, mejorar su salud mental y emocional, y alcanzar sus objetivos de bienestar, mientras que mantener su información de salud organizada y segura también es crucial.",
  },
  {
    source: "From coverage to Care",
    name: "coverage-to-care",
    description:
      'Una red de proveedores es una lista de médicos, proveedores de atención médica y hospitales con los que un plan de salud tiene contratos para ofrecer atención médica a sus miembros, conocidos como "proveedores de red" o "proveedores dentro de la red". Para ver si su médico está en la red de un plan antes de elegir un plan del Mercado de Seguros de Salud®, haga una lista de sus proveedores, busque la red de proveedores para cada plan específico o llame al servicio al cliente de la compañía de seguros y compare planes en HealthCare.gov.',
  },
  {
    source: "What you should know about providers",
    name: "provider-info",
    description:
      "El contenido de este documento está destinado a proporcionar claridad sobre los requisitos legales existentes y no tiene fuerza de ley a menos que se incorpore en un contrato, y no reemplazará ningún requisito estatal o de emisores de QHP para pagos de comisiones. Los agentes y corredores que asisten a los consumidores con la cobertura del Mercado deben documentar el consentimiento del consumidor antes de acceder a su información, con varios formatos aceptables para la documentación, y este modelo de formulario de consentimiento sirve como ejemplo para la documentación física con firmas autógrafas.",
  },
  {
    source:
      "Patient Protection and Affordable Care Act, HHS Notice of Benefit and Payment Parameters for 2024",
    name: "aca-hhs-2024",
    description:
      "El Aviso de HHS sobre Parámetros de Beneficios y Pagos para la regla final de 2025, publicado por CMS, establece nuevos estándares para emisores y Mercados e incluye políticas que impactan Medicaid, CHIP y el Programa de Salud Básica. Estos cambios tienen como objetivo avanzar en la equidad en salud al aumentar el acceso a los servicios de salud, simplificar la elección, mejorar la selección de planes y mejorar las protecciones al consumidor.",
  },
  {
    source: "regs to implement equal employemnt provision",
    name: "equal-employment-regs",
    description:
      "La EEOC ha emitido regulaciones finales revisadas y orientación interpretativa para implementar la Ley de Enmiendas de ADA de 2008, que mejora la aplicación del título I de la ADA que prohíbe la discriminación laboral basada en discapacidades. Estas regulaciones entrarán en vigor el 24 de mayo de 2011, y se puede obtener más información contactando a la Oficina de Asesoría Legal de la EEOC.",
  },
];

const enToolDescriptions = [
  {
    source: "Notice of Benefit and Payment Parameters for 2025 Final Rule",
    name: "notice-of-benefit-and-payment-parameters-for-2025-final-rule",
    description:
      "Public Law 111-148 mandates that the summary of benefits and coverage for health plans be presented in a uniform format, not exceeding 4 pages and using at least 12-point font, and in a manner that is culturally and linguistically appropriate for the average plan enrollee. The summary must include key elements such as uniform definitions of insurance terms, descriptions of coverage and cost-sharing, exceptions and limitations, renewability provisions, coverage facts labels, and contact information for further inquiries.",
  },
  {
    source: "ACA Law act",
    name: "aca-law-act",
    description:
      "This publication explains how to claim the itemized deduction for medical and dental expenses on Schedule A (Form 1040), including which expenses qualify, how to handle reimbursements, and how to report the deduction. It also provides guidance on related topics such as impairment-related work expenses, health insurance premiums for the self-employed, and how to seek further tax assistance.",
  },
  {
    source: "Medicaid & Dental benefits",
    name: "medicaid-dental-benefits",
    description:
      "Preventive health care, including screenings, check-ups, and counseling, is essential for preventing and detecting illnesses early when treatment is most effective, and for promoting overall well-being through healthy lifestyle choices. Having a trusted provider can help you get the right preventive services, improve your mental and emotional health, and achieve your wellness goals, while keeping your health information organized and secure is also crucial.",
  },
  {
    source: "From coverage to Care",
    name: "coverage-to-care",
    description:
      'A provider network is a list of doctors, health care providers, and hospitals that a health plan contracts with to offer medical care to its members, known as "network providers" or "in-network providers." To see if your doctor is in a plan’s network before choosing a Health Insurance Marketplace® plan, make a list of your providers, search the provider network for each specific plan, or call the insurance company’s customer service, and compare plans on HealthCare.gov.',
  },
  {
    source: "What you should know about providers",
    name: "provider-info",
    description:
      "The contents of this document are intended to provide clarity regarding existing legal requirements and do not have the force of law unless incorporated into a contract, and it will not supersede any state or QHP issuer requirements for commission payments. Agents and brokers assisting consumers with Marketplace coverage must document consumer consent before accessing their information, with various acceptable formats for documentation, and this model consent form serves as an example for physical documentation with wet signatures.",
  },
  {
    source:
      "Patient Protection and Affordable Care Act, HHS Notice of Benefit and Payment Parameters for 2024",
    name: "aca-hhs-2024",
    description:
      "The HHS Notice of Benefit and Payment Parameters for 2025 final rule, released by CMS, sets new standards for issuers and Marketplaces and includes policies impacting Medicaid, CHIP, and the Basic Health Program. These changes aim to advance health equity by increasing access to healthcare services, simplifying choice, improving plan selection, and enhancing consumer protections.",
  },
  {
    source: "regs to implement equal employemnt provision",
    name: "equal-employment-regs",
    description:
      "The EEOC has issued final revised regulations and interpretive guidance to implement the ADA Amendments Act of 2008, which enhances the enforcement of title I of the ADA prohibiting employment discrimination based on disability. These regulations will become effective on May 24, 2011, and further information can be obtained by contacting the EEOC's Office of Legal Counsel.",
  },
];

export const toolDescriptions: {
  source: string;
  description: string;
  name: string;
}[] =
  process.env.BOT_NLANGUAGE === "es" ? esToolDescriptions : enToolDescriptions;

const esHealthInsurancePlansToolDescription = {
  description:
    "Llame si el usuario está interesado en planes de seguro de salud, necesita sugerencias relacionadas con planes de seguro de salud o desea comprar un avión. Pregunte los detalles uno por uno en preguntas separadas.",
  response: "Cuéntanos algo sobre los planes de seguro de salud",
  schema: z.object({
    age: z.string().describe("Edad de la cliente"),
    householdIncome: z.string().describe("Ingresos familiares de la cliente"),
    householdSize: z.string().describe("Tamaño del hogar del cliente"),
    effectiveDate: z.string().describe("Fecha de vigencia del cliente"),
  }),
};
const enHealthInsurancePlansToolDescription = {
  description:
    "Call if the user is interested in health insurance plans, need a suggestions related to health insurance plans or wants to buy a plane. Ask details one by one in separate questions.",
  response: "tell something about health insurance plans",
  schema: z.object({
    age: z.string().describe("age of customer"),
    householdIncome: z.string().describe("household income of customer"),
    householdSize: z.string().describe("customer's household size"),
    effectiveDate: z.string().describe("effective date customer"),
  }),
};

export const healthInsurancePlansToolDescription =
  process.env.BOT_NLANGUAGE === "es"
    ? esHealthInsurancePlansToolDescription
    : enHealthInsurancePlansToolDescription;

const esConnectWithAgentToolDescription = {
  description:
    "Llamar si el usuario desea comunicarse con el agente. Informar a los usuarios que se está desarrollando la próxima generación de servicios de seguros con inteligencia artificial y que estará disponible pronto, pero mientras tanto, podemos hacer que un agente de seguros autorizado de su área haga un seguimiento. Pregunte los detalles uno por uno en preguntas separadas.",
  response:
    "Informar a los usuarios de que se está desarrollando la próxima generación de servicios de seguros con inteligencia artificial y que estará disponible pronto, pero que, mientras tanto, podemos hacer que un agente de seguros autorizado de su zona haga un seguimiento. Informar al usuario de que un agente de seguros autorizado se pondrá en contacto con él en las próximas 24 a 48 horas.",
  schema: z.object({
    agreement: z
      .boolean()
      .describe(
        "Pide permiso para recopilar información de contacto para contactarlos más tarde. Es verdadero si el usuario da su consentimiento; de lo contrario, es falso.",
      ),
    name: z
      .string()
      .optional()
      .describe(
        "Solicitar el nombre del usuario si éste acepta recopilar información de contacto",
      ),
    email: z
      .string()
      .optional()
      .describe(
        "Solicitar al usuario su correo electrónico si el usuario da su consentimiento para recopilar información de contacto",
      ),
    phoneNumber: z
      .string()
      .optional()
      .describe(
        "Solicitar al usuario su número de teléfono si el usuario acepta recopilar información de contacto",
      ),
  }),
};
const enConnectWithAgentToolDescription = {
  description:
    "Call if the user wants to  connect with agent. Let users know that the next generation of AI Insurance services is being built and will be available soon but in the meantime we can have a licensed insurance agent in their area follow up. Ask details one by one in separate questions.",
  response:
    "Let users know that the next generation of AI Insurance services is being built and will be available soon but in the meantime we can have a licensed insurance agent in their area follow up. Inform the user that they will be contacted by a licensed insurance agent within the next ~24-48 hours.",
  schema: z.object({
    agreement: z
      .boolean()
      .describe(
        "Ask for permission to collect contact information to reach them back at a later time. Is true if user gives her agreement else is false",
      ),
    name: z
      .string()
      .describe(
        "ask user for name if user gives her agreement to collect contact information",
      ),
    email: z
      .string()
      .describe(
        "ask user for his/her email if user gives his/her agreement to collect contact information",
      ),
    phoneNumber: z
      .string()
      .describe(
        "ask user for his/her phone number if user gives his/her agreement to collect contact information",
      ),
  }),
};

export const connectWithAgentToolDescription =
  process.env.BOT_NLANGUAGE === "es"
    ? esConnectWithAgentToolDescription
    : enConnectWithAgentToolDescription;
