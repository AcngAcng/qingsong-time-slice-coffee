export { preparedSignals as signals, signalShelves } from "./prepared-signals.js";

export const identities = [
  {
    id: "founder",
    name: "创业者",
    en: "Founder",
    label: "FOR FOUNDERS",
  },
  {
    id: "student",
    name: "学生",
    en: "Student",
    label: "FOR STUDENTS",
  },
  {
    id: "designer",
    name: "设计师",
    en: "Designer",
    label: "FOR DESIGNERS",
  },
  {
    id: "everyday",
    name: "普通人",
    en: "Everyday Person",
    label: "FOR EVERYDAY PEOPLE",
  },
];

export const valueRewrites = {
  founder: {
    title: "流程能力开始产品化",
    todayChange: "软件开始替人走完一段流程，研究、生成、整理和交付被连在一起。",
    whyImportant: "变化不在单点效率，而在小团队能否把重复动作做成稳定系统。",
    relationToYou: "创业者要判断哪些流程能被产品承接，哪些仍需要人建立信任。",
    focusNow: "关注可复用流程、交付质量、客户数据闭环和人工介入位置。",
    keywords: ["Workflow", "Delivery", "System"],
    coreLine: "流程正在成为新的产品单位。",
  },
  student: {
    title: "问题能力开始升值",
    todayChange: "答案变多之后，真正稀缺的是判断什么值得问、如何验证答案。",
    whyImportant: "学习不再只是找到资料，而是建立问题、证据和判断之间的关系。",
    relationToYou: "学生要练习提出好问题、拆解任务和识别低质量答案。",
    focusNow: "关注提问方式、验证路径、知识结构和独立判断。",
    keywords: ["Question", "Judgment", "Learning"],
    coreLine: "问题开始比答案更贵。",
  },
  designer: {
    title: "判断变成设计核心",
    todayChange: "界面生成变容易后，设计的重点从产出转向取舍、结构和审美判断。",
    whyImportant: "工具能快速给出版本，但不能替你决定什么应该被保留。",
    relationToYou: "设计师的价值会更集中在方向判断、信息结构和体验边界。",
    focusNow: "关注取舍标准、系统结构、审美一致性和真实使用场景。",
    keywords: ["Taste", "Structure", "Decision"],
    coreLine: "产出变快之后，取舍更重要。",
  },
  everyday: {
    title: "日常判断正在被外包",
    todayChange: "AI 让答案、建议和流程变多，普通人更常面对系统给出的选择。",
    whyImportant: "便利增加的同时，判断是否适合自己变得更关键。",
    relationToYou: "普通人要知道自己是在被帮助，还是被自动化流程推着走。",
    focusNow: "关注推荐理由、选择成本、隐私使用和最终判断权。",
    keywords: ["Decision", "Choice", "Trust"],
    coreLine: "便利增加后，判断不能消失。",
  },
};
