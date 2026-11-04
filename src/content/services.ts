import { Code2, Smartphone, Layers3, PenTool } from "lucide-react";
export const services = [
  {
    slug: "web-applications",
    name: "Web Application Development",
    shortName: "Web applications",
    icon: Code2,
    copy: "Scalable, responsive web applications designed around real business needs.",
    intro: "Build a web experience that works as hard as your business.",
    details:
      "From customer-facing platforms to internal tools, we shape web applications around the people using them and the problems they need to solve.",
    focus: [
      "Responsive, accessible experiences",
      "Thoughtful application architecture",
      "Business workflow integration",
      "Testing, refinement, and ongoing improvement",
    ],
  },
  {
    slug: "mobile-applications",
    name: "Mobile Application Development",
    shortName: "Mobile applications",
    icon: Smartphone,
    copy: "Modern mobile experiences for customers, teams, and businesses.",
    intro: "Your business, wherever people need it.",
    details:
      "We design and develop mobile products with clear interactions and practical workflows, keeping the user experience at the centre of every decision.",
    focus: [
      "Mobile-first product planning",
      "Intuitive navigation and interaction",
      "Connected customer and team workflows",
      "Testing across relevant devices",
    ],
  },
  {
    slug: "enterprise-software",
    name: "Enterprise Software Solutions",
    shortName: "Enterprise software",
    icon: Layers3,
    copy: "Software systems that improve workflows, operations, and business efficiency.",
    intro: "Make complex operations feel simpler.",
    details:
      "We work with businesses and institutions to understand their operations and build maintainable systems around their requirements.",
    focus: [
      "Workflow and requirements discovery",
      "Maintainable system design",
      "Integration planning",
      "Operational usability and testing",
    ],
  },
  {
    slug: "product-design",
    name: "UI/UX & Digital Product Engineering",
    shortName: "UI/UX & product engineering",
    icon: PenTool,
    copy: "Intuitive interfaces and thoughtful product experiences built for real users.",
    intro: "Thoughtful design. Purposeful engineering.",
    details:
      "We bring product thinking, interface design, and engineering together to turn a business problem into a coherent digital experience.",
    focus: [
      "User and business discovery",
      "Experience mapping and prototyping",
      "Interface design systems",
      "Design-to-development collaboration",
    ],
  },
];
export const findService = (slug: string) => services.find((s) => s.slug === slug);
