export { preparedSignals as signals } from "./prepared-signals.js";
export { signalShelves } from "./signal-shelves.js";

export const identities = [
  {
    id: "student",
    name: "学生",
    en: "Student",
    label: "看见今天该更新的能力。",
  },
  {
    id: "builder",
    name: "构建者",
    en: "Builder",
    label: "看见它如何改变做东西的方式。",
  },
  {
    id: "designer",
    name: "设计师",
    en: "Designer",
    label: "看见它如何改变表达与判断。",
  },
  {
    id: "founder",
    name: "创业者",
    en: "Founder",
    label: "看见它能否变成产品机会。",
  },
  {
    id: "vc",
    name: "投资人",
    en: "VC",
    label: "看见它是否值得投入。",
  },
  {
    id: "everyday",
    name: "普通人",
    en: "Everyday Person",
    label: "看见它和日常生活的关系。",
  },
];

export const valueRewrites = {
  student: {
    title: "能力更新比答案本身更重要",
    todayChange: "当答案越来越容易得到，学习的重点会转向提问、验证和解释过程。",
    whyImportant: "学生需要判断什么值得学，哪些能力会因为 AI 变得更稀缺。",
    relationToYou: "关注该学什么、什么能力会变重要。",
    focusNow: "看这条信号背后需要练习的提问、验证或判断能力。",
    keywords: ["Learning", "Skill", "Judgment"],
    coreLine: "答案变便宜后，判断力开始变贵。",
  },
  builder: {
    title: "构建方式正在被流程重新定义",
    todayChange: "代码、工具链和 Agent 正在把单点工具连接成连续交付流程。",
    whyImportant: "构建者要判断哪些步骤能自动化，哪些边界仍需要人工控制。",
    relationToYou: "关注构建产品、写代码、工具链、交付方式。",
    focusNow: "找出这条信号会改变的一个产品流程、代码边界或交付环节。",
    keywords: ["Build", "Workflow", "Delivery"],
    coreLine: "会安排工具，正在比会使用工具更重要。",
  },
  designer: {
    title: "表达速度提高后，判断更稀缺",
    todayChange: "生成工具让表达更快，但审美、结构和取舍仍决定作品是否成立。",
    whyImportant: "设计师需要看见工具改变了哪些创作流程，以及哪些判断不能外包。",
    relationToYou: "关注表达、审美、创作流程和判断。",
    focusNow: "比较这条信号里自动生成的部分和仍需人工判断的部分。",
    keywords: ["Design", "Taste", "Creation"],
    coreLine: "生成变快之后，取舍变得更重要。",
  },
  founder: {
    title: "信号需要被翻译成机会",
    todayChange: "新的技术和行为变化可能变成用户需求、产品入口或团队效率差。",
    whyImportant: "创业者要判断变化是否足够具体，能否进入产品、商业模式或组织流程。",
    relationToYou: "关注产品机会、用户需求、团队效率、商业模式。",
    focusNow: "判断这条信号是否对应一个明确用户、一个高频痛点或一段可产品化流程。",
    keywords: ["Opportunity", "User Need", "Leverage"],
    coreLine: "能被产品承接的变化，才是真机会。",
  },
  vc: {
    title: "市场信号需要区分机会和噪音",
    todayChange: "公司动态、资本情绪和用户行为会共同暴露新的风险与投入窗口。",
    whyImportant: "投资人要判断这条信号是否代表市场变化、真实需求或可持续投入价值。",
    relationToYou: "关注市场信号、机会、风险、投入价值。",
    focusNow: "看这条信号是否有需求增长、成本下降、风险暴露或资本流向变化。",
    keywords: ["Market", "Risk", "Capital"],
    coreLine: "不是每个热点都是机会，先看信号质量。",
  },
  everyday: {
    title: "日常判断正在被系统影响",
    todayChange: "AI 和平台系统正在进入消费、学习、工作和家庭决策的入口。",
    whyImportant: "普通人需要知道自己是在被帮助，还是被系统推着做选择。",
    relationToYou: "关注日常生活、消费、工作、学习、家庭判断。",
    focusNow: "看这条信号会影响你今天的哪一个选择、成本或判断依据。",
    keywords: ["Daily Life", "Choice", "Trust"],
    coreLine: "便利增加后，判断不能消失。",
  },
};
