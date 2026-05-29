\# Time Slice Coffee / 时代信息切片咖啡 项目状态



\## 当前项目定位



Time Slice Coffee 是一个 AI 驱动的时代信息切片系统。



它不是新闻聚合，不是 AI SaaS，不是 ChatGPT 套壳。



核心逻辑：

真实热点原料 → AI 萃取时代切片 → 身份价值重构 → 信息浓度 → Hot/Iced 上杯方式 → 生成今日时代切片标签。



核心叙事：

过去，人们买水是为了解渴。

后来，人们购买品牌。

而 AI 时代，人们开始购买“对这个时代的理解”。

于是，我们把今天真正重要的一则变化，装进一杯咖啡里。



\---



\## 当前已完成流程



1\. Signal Shelves / 信息货架

2\. Raw Signals / 今日热点原料

3\. Selected Raw Signal / 已选原始信号

4\. Extracted Slice / 已萃取时代切片

5\. Lens / 身份选择

6\. Information Intensity / 信息浓度

7\. Served Hot / Served Iced / 上杯方式

8\. Label Preview / 标签预览

9\. Print Label / 打印标签基础功能



\---



\## 当前信息货架方向



信息货架计划调整为 6 个更适合黑客松现场用户的专业 FOMO 类别：



1\. AI Frontier / AI 前沿

2\. Build \& Workflow / 构建工作流

3\. Design \& Creation / 设计创作

4\. Market \& Capital / 市场资本

5\. Self Upgrade / 自我升级

6\. Life Signals / 生活信号



页面应保持 3 × 2 排列。



\---



\## 当前身份层方向



身份层计划使用 6 个简单直接的身份：



1\. Student / 学生

2\. Builder / 构建者

3\. Designer / 设计师

4\. Founder / 创业者

5\. VC / 投资人

6\. Everyday Person / 普通人



身份选择要轻，不要复杂解释。像点咖啡一样，一眼能选。



\---



\## 当前 Hot / Iced 逻辑



Hot / Paper Cup：

把今天的理解带在手里。

适合打印、贴杯、通勤、带走。



Iced / Clear Cup：

把今天的变化看得更清楚。

适合展示、观察、看见信号。



Hot / Iced 必须保留咖啡直觉，不要改成过度抽象概念。



\---



\## 当前标签输出方向



最终要生成一张“今日时代切片标签”。



标签应该包含：



\- TIME SLICE COFFEE

\- TODAY’S INFORMATION SLICE

\- labelNo

\- shelf

\- source

\- date

\- sourceSignal

\- sliceTitle

\- identity

\- identityValue

\- todayFocus

\- intensity

\- serveStyle

\- signalMark



标签不是普通 AI 总结，而是一张可打印、可贴杯、可带走的信息商品标签。



\---



\## 当前最近一次本地 commit



commit:

3c1adb8



message:

refine raw signal layout and label structure



当前本地 Git 状态：

working tree clean



注意：

GitHub push 当前因为网络/代理失败，本地比 origin/master ahead 2 commits。

不要因为 GitHub 没同步就以为代码没保存。本地 commit 已成功。



\---



\## 当前最需要修的问题



1\. Raw Signal 卡片和 Selected Raw Signal / Extracted Slice 详情区排版需要统一。

2\. 编号、日期、source、section label 需要对齐。

3\. meta 信息要弱化，URL 不要太抢眼。

4\. 字体层级需要收敛，避免太多粗体和全大写破坏美感。

5\. 最终 Label Preview 框架还需要继续优化。

6\. 打印工作流后续再逐步做，不要现在一次性接打印机 SDK。



\---



\## 当前不要做的事情



不要大改首页主视觉。

不要继续做 CodeCupVisual 动画。

不要一次性接真实 Grok API。

不要一次性做 PNG、PDF、打印机 SDK。

不要大范围重构项目。

每次只做一个小模块。

