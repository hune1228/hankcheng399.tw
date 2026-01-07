import { ResumeData } from './types';

const contact = {
  name: "鄭弘易 (Hank Cheng)",
  email: "hi@hankcheng399.tw",
  linkedin: "linkedin.com/in/hankcheng399",
  github: "github.com/hune1228",
  phone: "+886902336128"
};

const educationZh = [
  {
    period: "2022年8月 ~ 2025年7月",
    school: "國立彰化師範大學",
    department: "資訊工程學系",
    degree: "碩士",
    status: "休學"
  },
  {
    period: "2018年8月 ~ 2022年7月",
    school: "國立彰化師範大學",
    department: "資訊工程學系",
    degree: "學士",
    status: "畢業"
  }
];

const educationEn = [
  {
    period: "August 2022 ~ July 2025",
    school: "National Changhua University of Education",
    department: "Department of Computer Science and Information Engineering",
    degree: "Master's Degree",
    status: "Suspended"
  },
  {
    period: "August 2018 ~ July 2022",
    school: "National Changhua University of Education",
    department: "Department of Computer Science and Information Engineering",
    degree: "Bachelor's Degree",
    status: "Graduated"
  }
];

const experienceZh = [
  {
    period: "2025",
    organization: "TWNOG 6 Conference Network",
    position: "網路架構與 IDC 管理",
    description: [
      "協調現場活動網路技術維運",
      "參與設計與部署基於 AS18248 基礎設施的現場 Wi-Fi 網路",
      "協調多家廠商建立跨區域資料中心 10G 對等互連 (Peering)"
    ],
    techStack: ["Aruba AP535", "Cisco 3850", "BGP", "Dark Fiber", "Wi-Fi Deployment"]
  },
  {
    period: "2023年2月1日 ~ 2025年7月31日",
    organization: "國立彰化師範大學 性別平等教育委員會",
    position: "第 10 屆學生委員",
    description: [
      "參與校園性別平等政策討論與制定"
    ]
  },
  {
    period: "2021年8月 ~ 2024年7月",
    organization: "國立彰化師範大學 第十宿舍",
    position: "樓長 / 監控網路整合",
    description: [
      "規劃並協助部署進德與寶山校區宿舍 IP 監控與網路系統 (涵蓋約 3000 名學生)",
      "整合多個監控攝影機節點至統一監控介面",
      "與行政人員合作排除網路不穩與影像傳輸問題"
    ],
    techStack: ["IP Surveillance", "Network Integration", "Troubleshooting"]
  },
  {
    period: "2020年10月22日 ~ 2021年2月28日",
    organization: "國立彰化師範大學 資訊工程學系",
    position: "電腦教室維護管理",
    description: [
      "重新設計並優化兩間電腦教室 (約 100 台 PC) 的網路拓樸",
      "使用 Cisco Route-map 與防火牆 NAT 策略整合網路路由"
    ],
    techStack: ["Network Topology", "Cisco Route-map", "Firewall", "NAT"]
  },
  {
    period: "2020年7月 ~ 現在",
    organization: "國立彰化師範大學學生會",
    position: "網路與服務基礎設施負責人",
    description: [
      "建立校內 IP 基礎網路與防火牆 (FortiGate)，上行頻寬 2Gbps",
      "協調取得 Public IPv4 /29網段，解決對外連線問題",
      "建置 Hyper-V & Proxmox VE 虛擬化環境及內部服務 (差勤、預約系統)",
      "透過 Google Sheets API 開發財務透明化與流程追蹤工具",
      "部署 Cloudflare CDN 與 NGINX Reverse Proxy 建立安全 CI/CD 管道",
      "管理 DNS 紀錄與 Google Workspace 部署"
    ],
    techStack: ["FortiGate", "Hyper-V", "Proxmox VE", "Cloudflare", "NGINX", "Google Workspace", "Google Sheets API"]
  },
  {
    period: "2019年8月1日 ~ 2025年6月15日",
    organization: "國立彰化師範大學 圖書與資訊處",
    department: "網路與資訊系統管理組",
    position: "電腦維修 / 資訊助理",
    description: [
      "協助維護與排除校園網路基礎設施故障，尖峰時段頻寬約 2 ~ 2.5 Gbps",
      "支援交換器安裝、DNS/SSL 憑證管理及 IP 路由策略",
      "協助學生活動中心骨幹網路升級 (100Mbps -> 20Gbps)",
      "系所電腦教室網路架構優化，總頻寬由 300Mbps 提升至 2Gbps"
    ],
    techStack: ["Cisco Switch", "Network Troubleshooting", "DNS", "SSL", "IP Routing"]
  }
];

const experienceEn = [
  {
    period: "2025",
    organization: "TWNOG 6 Conference Network",
    position: "Networking, IDC Management, Stakeholder",
    description: [
      "Coordinated technical operations for live event coverage",
      "Contributed to the design and deployment of an on-site WiFi network using TWNOG’s self-managed AS18248 infrastructure",
      "Implemented Aruba AP535 Access Points and Cisco 3850 switches to ensure seamless Wi-Fi coverage, fault tolerance, and high network throughput",
      "Coordinated with multiple vendors to establish 10G peering for inter-region datacenter connectivity through last-mile (dark fiber) and local loop connections"
    ],
    techStack: ["Aruba AP535", "Cisco 3850", "BGP", "Dark Fiber", "Wi-Fi Deployment"]
  },
  {
    period: "February 2023 ~ July 2025",
    organization: "NCUE Gender Equity Education Committee",
    position: "10th Student Commissioner",
    description: [
      "Participated in the discussion and formulation of campus gender equality policies"
    ]
  },
  {
    period: "July 2021 – July 2024",
    organization: "NCUE Dormitory 10",
    position: "Floor Manager / Surveillance Network Integration",
    description: [
      "Planned and deployed IP surveillance and network systems for Jinde and Baoshan campuses (approx. 3000 students)",
      "Integrated multiple surveillance nodes into a unified monitoring interface",
      "Troubleshot network stability and video transmission reliability alongside administrative staff"
    ],
    techStack: ["IP Surveillance", "Network Integration", "Troubleshooting"]
  },
  {
    period: "October 2020 – February 2021",
    organization: "NCUE Dept of CSIE",
    position: "Computer Lab Administrator",
    description: [
      "Redesigned and optimized network topology for two computer labs (~100 PCs)",
      "Consolidated internet routing with firewall-based NAT policies using Cisco route-map"
    ],
    techStack: ["Network Topology", "Cisco Route-map", "Firewall", "NAT"]
  },
  {
    period: "July 2020 – Present",
    organization: "NCUE Student Association",
    position: "Network and Service Infrastructure Lead",
    description: [
      "Established on-campus IP-based network and firewall (FortiGate) with 2 Gbps upstream bandwidth",
      "Acquired Public IPv4 /29 block for external connectivity via cross-departmental communication",
      "Set up Hyper-V & Proxmox VE VMs and internal services (attendance, booking systems) on GPU workstations and bare metal servers",
      "Built Google Sheets API-integrated tools for financial transparency",
      "Implemented secure pipeline using Cloudflare CDN and NGINX Reverse Proxy",
      "Managed DNS via Cloudflare and deployed Google Workspace"
    ],
    techStack: ["FortiGate", "Hyper-V", "Proxmox VE", "Cloudflare", "NGINX", "Google Workspace", "Google Sheets API"]
  },
  {
    period: "August 2019 – June 2025",
    organization: "NCUE Library and Information Services",
    department: "Network and Information System Management Division",
    position: "IT Intern / Computer Technician",
    description: [
      "Assist in maintain and troubleshoot campus-wide network infrastructure. Average peak bandwidth: 2-2.5 Gbps",
      "Support switch installations, DNS/SSL issues, and IP routing policies",
      "Upgraded Student Activity Center backbone from 100 Mbps to 20 Gbps; Layer 2 bandwidth to terminals increased to 1 Gbps",
      "Optimized department computer labs network, increasing total bandwidth from 300 Mbps to 2 Gbps"
    ],
    techStack: ["Cisco Switch", "Network Troubleshooting", "DNS", "SSL", "IP Routing"]
  }
];

const projectsZh = [
  {
    title: "智慧圖書搜尋系統",
    team: ["范姜沂妘", "林婉婷", "王景弘", "鄭弘易", "陳俊傑"],
    date: "2021年7月",
    description: [
      "指導教授：陳伯岳教授",
      "開發一套整合圖書館藏查詢與室內導航的系統"
    ],
    awards: [
      "國立彰化師範大學 資訊工程學系 109學年度專題競賽 第三名",
      "國立彰化師範大學 智慧校園系統實作競賽 指定題目組 佳作"
    ]
  }
];

const projectsEn = [
  {
    title: "Smart Library Search System",
    team: ["Fan-Chiang Yi-Yun", "Lin Wan-Ting", "Wang Jing-Hong", "Cheng Hung-Yi", "Chen Jun-Jie"],
    date: "July 2021",
    description: [
      "Advisor: Professor Chen Bo-Yue",
      "Developed a system integrating library catalog search with indoor navigation"
    ],
    awards: [
      "3rd Place, NCUE CSIE 109 Academic Year Project Competition",
      "Masterpiece Award, NCUE Smart Campus System Implementation Competition"
    ]
  }
];

const awardsZh = [
  {
    year: "114 年",
    title: "大專校院學生會成果展 - 卓越獎",
    organization: "國立彰化師範大學學生會 第 28 屆"
  },
  {
    year: "113 年",
    title: "大專校院學生會成果展 - 學治單冠獎",
    organization: "國立彰化師範大學學生會 第 27 屆"
  },
  {
    year: "112 年",
    title: "大專校院學生會成果展 - 學治單冠獎",
    organization: "國立彰化師範大學學生會 第 26 屆"
  },
  {
    year: "111 年",
    title: "彰化縣大專優秀青年",
    organization: "彰化縣政府"
  }
];

const awardsEn = [
  {
    year: "2025",
    title: "College Student Association Achievement Exhibition - Excellence Award",
    organization: "NCUE Student Association 28th Term"
  },
  {
    year: "2024",
    title: "College Student Association Achievement Exhibition - Governance Champion Award",
    organization: "NCUE Student Association 27th Term"
  },
  {
    year: "2023",
    title: "College Student Association Achievement Exhibition - Governance Champion Award",
    organization: "NCUE Student Association 26th Term"
  },
  {
    year: "2022",
    title: "Changhua County Outstanding College Youth",
    organization: "Changhua County Government"
  }
];

const communityZh = [
  {
    year: "2025",
    items: [
      { role: "行政中心 總務部資訊組校外顧問 (2025.06.23 ~ Current)", organization: "國立彰化師範大學學生會" },
      { role: "紀錄組組員", organization: "MOPCON 2025" },
      { role: "場務組組員", organization: "HITCON 2025" },
      { role: "製播組組長", organization: "COSCUP 2025" },
      { role: "Volunteer", organization: "TWNOG 6 BGP Workshop" },
      { role: "Image Team Lead & Infrastructure Team Member", organization: "TWNOG 6" },
      { role: "製播組組長", organization: "SITCON 2025" },
    ]
  },
  {
    year: "2024",
    items: [
      { role: "Core Team Member", organization: "GDG on Campus, NCUE" },
      { role: "學生議會 秘書長", organization: "國立彰化師範大學學生會 第 28 屆" },
      { role: "行政中心 總務部部長", organization: "國立彰化師範大學學生會 第 28 屆" },
      { role: "場務組組員", organization: "HITCON CMT 2024" },
      { role: "製播組組員", organization: "COSCUP 2024" },
      { role: "會眾", organization: "TWNOG 5" },
      { role: "製播組組員", organization: "SITCON 2024" },
    ]
  },
  {
    year: "2023",
    items: [
      { role: "學生議會 秘書長", organization: "國立彰化師範大學學生會 第 27 屆" },
      { role: "行政中心 總務部顧問 (2023.06.26 ~ 2023.12.22)", organization: "國立彰化師範大學學生會 第 27 屆" },
      { role: "會長 (2022.12.01 - 2024.01.31)", organization: "國立彰化師範大學 研究生聯合自治會" },
    ]
  },
  {
    year: "2022",
    items: [
      { role: "學生議會 秘書 (2023.06.07 ~ 2023.07.31)", organization: "國立彰化師範大學學生會 第 26 屆" },
      { role: "行政中心 總務部部長 (2023.02.01 ~ 2023.06.25)", organization: "國立彰化師範大學學生會 第 26 屆" },
      { role: "行政中心 財務部副部長 (2022.06.27 ~ 2023.01.31)", organization: "國立彰化師範大學學生會 第 26 屆" },
    ]
  },
  {
    year: "2021",
    items: [
      { role: "行政中心 財務部部長 (2021.06.28 ~ 2022.06.26)", organization: "國立彰化師範大學學生會 第 25 屆" },
    ]
  },
  {
    year: "2020",
    items: [
      { role: "會眾", organization: "MOPCON 2020" },
      { role: "Core Team Member (2020.08.01 – 2020.11.30)", organization: "Google DSC, NCUE" },
      { role: "行政中心 品管部部長 (2020.06.29 ~ 2021.06.27)", organization: "國立彰化師範大學學生會 第 24 屆" },
    ]
  }
];

const communityEn = [
  {
    year: "2025",
    items: [
      { role: "External Consultant, IT Section, General Affairs Dept (2025.06.23 ~ Current)", organization: "NCUE Student Association" },
      { role: "Documentation Team Member", organization: "MOPCON 2025" },
      { role: "General Affairs Team Member", organization: "HITCON 2025" },
      { role: "Broadcast Team Lead", organization: "COSCUP 2025" },
      { role: "Volunteer", organization: "TWNOG 6 BGP Workshop" },
      { role: "Image Team Lead & Infrastructure Team Member", organization: "TWNOG 6" },
      { role: "Broadcast Team Lead", organization: "SITCON 2025" },
    ]
  },
  {
    year: "2024",
    items: [
      { role: "Core Team Member", organization: "GDG on Campus, NCUE" },
      { role: "Secretary General, Student Parliament", organization: "NCUE Student Association 28th Term" },
      { role: "Minister of General Affairs", organization: "NCUE Student Association 28th Term" },
      { role: "General Affairs Team Member", organization: "HITCON CMT 2024" },
      { role: "Broadcast Team Member", organization: "COSCUP 2024" },
      { role: "Attendee", organization: "TWNOG 5" },
      { role: "Broadcast Team Member", organization: "SITCON 2024" },
    ]
  },
  {
    year: "2023",
    items: [
      { role: "Secretary General, Student Parliament", organization: "NCUE Student Association 27th Term" },
      { role: "Consultant, General Affairs Dept (2023.06.26 ~ 2023.12.22)", organization: "NCUE Student Association 27th Term" },
      { role: "President (2022.12.01 - 2024.01.31)", organization: "NCUE Graduate Student Association" },
    ]
  },
  {
    year: "2022",
    items: [
      { role: "Secretary, Student Parliament (2023.06.07 ~ 2023.07.31)", organization: "NCUE Student Association 26th Term" },
      { role: "Minister of General Affairs (2023.02.01 ~ 2023.06.25)", organization: "NCUE Student Association 26th Term" },
      { role: "Deputy Minister of Finance (2022.06.27 ~ 2023.01.31)", organization: "NCUE Student Association 26th Term" },
    ]
  },
  {
    year: "2021",
    items: [
      { role: "Minister of Finance (2021.06.28 ~ 2022.06.26)", organization: "NCUE Student Association 25th Term" },
    ]
  },
  {
    year: "2020",
    items: [
      { role: "Attendee", organization: "MOPCON 2020" },
      { role: "Core Team Member (2020.08.01 – 2020.11.30)", organization: "Google DSC, NCUE" },
      { role: "Minister of Quality Control (2020.06.29 ~ 2021.06.27)", organization: "NCUE Student Association 24th Term" },
    ]
  }
];

export const dataZh: ResumeData = {
  contact,
  education: educationZh,
  experience: experienceZh,
  projects: projectsZh,
  awards: awardsZh,
  community: communityZh,
  ui: {
    titles: {
      about: "關於我",
      education: "學歷",
      experience: "工作經歷",
      projects: "專案經驗",
      awards: "獎項",
      community: "社群參與",
      contact: "聯絡資訊"
    },
    actions: {
      toggleTheme: "切換主題",
      toggleLang: "切換語言"
    }
  }
};

export const dataEn: ResumeData = {
  contact,
  education: educationEn,
  experience: experienceEn,
  projects: projectsEn,
  awards: awardsEn,
  community: communityEn,
  ui: {
    titles: {
      about: "About Me",
      education: "Education",
      experience: "Work Experience",
      projects: "Projects",
      awards: "Awards",
      community: "Community Involvement",
      contact: "Contact"
    },
    actions: {
      toggleTheme: "Toggle Theme",
      toggleLang: "Switch Language"
    }
  }
};