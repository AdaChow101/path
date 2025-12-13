import { Question, QuestionType } from './types';

export const QUESTIONS: Question[] = [
  // 1. Environment
  {
    id: 'q1_environment',
    text: '您理想的工作环境是怎样的？',
    subText: '请选择最让您感到舒适的一项',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '结构化且稳定：明确的层级、流程和晋升路径（如政府、大型国企）',
      '快速且灵活：充满变化、挑战和不确定性（如初创公司、互联网）',
      '独立且自由：自主安排时间，远程协作（如自由职业、数字游民）',
      '创意且开放：扁平化管理，强调灵感与碰撞（如设计工作室、广告公司）'
    ]
  },
  // 2. Team Role
  {
    id: 'q2_team_role',
    text: '在团队协作中，您通常倾向于扮演什么角色？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '核心领导者：设定目标，掌控进度，做最终决策',
      '协调润滑剂：关注成员情绪，化解冲突，凝聚团队',
      '专业执行者：专注于自己的领域，高质量完成具体任务',
      '创意发动机：不断提出新点子，打破常规，但不一定负责落地'
    ]
  },
  // 3. Achievement
  {
    id: 'q3_achievement',
    text: '在工作中，什么能给您带来最大的成就感？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '助人：直接帮助他人解决困难或提升幸福感',
      '攻坚：解决复杂的技术难题或逻辑谜题',
      '影响力：领导团队达成高难度的商业目标',
      '创造：通过作品（代码、设计、文章）表达自我'
    ]
  },
  // 4. Problem Solving
  {
    id: 'q4_problem_solving',
    text: '面对一个从未遇到过的棘手问题，您的第一反应是？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '逻辑拆解：搜集数据，分析根本原因，制定步骤',
      '行动优先：先试错，在实践中寻找解决方案',
      '寻求外援：寻找专家或查阅类似案例',
      '头脑风暴：召集团队，集思广益'
    ]
  },
  // 5. Skills
  {
    id: 'q5_skills',
    text: '您认为自己最擅长的 3-5 项能力是什么？',
    subText: '请选择您的核心竞争力',
    type: QuestionType.MULTI_CHOICE,
    maxSelections: 5,
    options: [
      '逻辑分析', '沟通协调', '创意设计', '编程开发', 
      '项目管理', '公开演讲', '数据处理', '共情倾听', 
      '销售谈判', '战略规划', '动手操作', '快速学习',
      '资源整合', '细节把控', '文字写作', '跨界思维'
    ]
  },
  // 6. Learning
  {
    id: 'q6_learning',
    text: '掌握一项新技能时，哪种方式对您最有效？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '实战摸索：直接上手做项目，遇到问题再查',
      '系统学习：阅读书籍、文档或参加完整课程',
      '观察模仿：看别人怎么做，照猫画虎',
      '交流讨论：通过向人提问和讨论来理解'
    ]
  },
  // 7. Values
  {
    id: 'q7_values',
    text: '在职业生涯中，您最看重什么？',
    subText: '这是您选择工作的核心驱动力',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '高薪资与财务回报',
      '工作与生活的平衡 (WLB)',
      '社会价值与改变世界',
      '专业领域的深度与声望',
      '创造力与自我表达的自由'
    ]
  },
  // 8. Decision Style
  {
    id: 'q8_decision_style',
    text: '做重要决策时，您的风格偏向？',
    subText: '1 = 纯理性数据分析，5 = 纯直觉感受',
    type: QuestionType.RATING,
    minLabel: '绝对理性',
    maxLabel: '依赖直觉'
  },
  // 9. Risk
  {
    id: 'q9_risk',
    text: '您对职业风险的承受能力如何？',
    subText: '1 = 追求铁饭碗，5 = 愿意为了高回报承担高风险',
    type: QuestionType.RATING,
    minLabel: '极度保守',
    maxLabel: '极度冒险'
  },
  // 10. Stress Response
  {
    id: 'q10_stress',
    text: '在高压和快节奏环境下，您的表现通常如何？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '兴奋：压力让我更专注，效率倍增',
      '冷静：能够屏蔽干扰，按部就班处理',
      '焦虑：容易感到紧张，需要更多时间调整',
      '混乱：容易不知所措，需要他人指引'
    ]
  },
  // --- New Questions Start ---
  // 11. Cognitive Focus (RIASEC proxy)
  {
    id: 'q11_work_focus',
    text: '工作中，您更喜欢处理哪类对象？',
    subText: '这决定了您日常工作的核心内容',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '数据与逻辑：图表、算法、财务报表、流程',
      '人与情感：客户、团队、学生、用户体验',
      '实物与工具：机械、硬件、手工模型、设备',
      '抽象概念：理论、创意、战略、宏观趋势'
    ]
  },
  // 12. Project Lifecycle
  {
    id: 'q12_project_stage',
    text: '您更倾向于参与产品的哪个阶段？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '0到1：从无到有的创造，充满未知与探索（如创业、研发）',
      '1到10：快速扩张，追求增长与市场占有（如销售、增长）',
      '10到N：优化流程，追求效率与稳定（如运营、财务、维护）'
    ]
  },
  // 13. Detail Orientation
  {
    id: 'q13_detail_orientation',
    text: '在处理任务时，您的注意力更倾向于？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '宏观战略：关注大方向和整体架构，不拘小节',
      '完美执行：关注每一个像素或代码的缩进，追求完美',
      '务实平衡：在保证进度前提下，抓大放小'
    ]
  },
  // 14. Communication Style
  {
    id: 'q14_communication_style',
    text: '您最擅长或喜欢的沟通方式是？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '书面异步：通过文档、邮件条理清晰地表达',
      '口头即时：面对面或电话会议，快速碰撞火花',
      '情感共鸣：一对一深度交流，善于倾听弦外之音'
    ]
  },
  // 15. Motivation (Driver)
  {
    id: 'q15_motivation',
    text: '通常是什么在驱动您前进？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '竞争获胜：击败对手、达成指标或获得排名',
      '深度钻研：搞懂一个复杂的原理，成为领域专家',
      '外部认可：获得上级、客户或公众的夸奖与尊重',
      '社会责任：帮助他人，或为某个愿景做贡献'
    ]
  },
  // 16. Routine vs Novelty
  {
    id: 'q16_predictability',
    text: '对于工作内容的变化频率，您的态度是？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '喜欢高度确定：职责清晰，按部就班，井井有条',
      '需要适度变化：在现有框架内有发挥和改良的空间',
      '拥抱不确定：厌恶重复，喜欢每天都有全新的挑战'
    ]
  },
  // 17. Conflict Handling
  {
    id: 'q17_conflict_style',
    text: '当团队出现意见分歧时，您通常会？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '据理力争：为了正确的结果，不惜进行激烈的辩论',
      '折衷妥协：寻找大家都能接受的中间点，推进事情向前',
      '回避冲突：暂缓讨论，避免破坏关系，等待时机',
      '整合视角：尝试跳出当前对立，寻找涵盖各方利益的第三条路'
    ]
  },
  // 18. Feedback Preference
  {
    id: 'q18_feedback_preference',
    text: '您更希望上级如何给您反馈？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '单刀直入：效率优先，直接指出问题和改进点',
      '三明治式：先肯定优点，再温和建议，最后鼓励',
      '教练引导：通过提问引导我自己发现问题，而不是直接给答案'
    ]
  },
  // 19. Energy Source (Introvert/Extrovert context)
  {
    id: 'q19_energy_source',
    text: '高强度工作后，哪种方式让您“回血”最快？',
    type: QuestionType.SINGLE_CHOICE,
    options: [
      '独处：一个人静静、阅读或做自己的事（内向型特质）',
      '社交：和朋友聚餐、吐槽或参加活动（外向型特质）'
    ]
  },
  // 20. Interests (Text) - Moved to end
  {
    id: 'q20_interests',
    text: '最后，请告诉我们要结合哪些个人兴趣？',
    subText: '例如：科幻电影、心理学、烹饪、户外徒步、电子游戏...',
    type: QuestionType.TEXT
  }
];