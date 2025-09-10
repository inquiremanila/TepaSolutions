import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowRight, Tag, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ArticlesPageProps {
  onNavigate: (target: string) => void;
}

const articles = [
  {
    id: 1,
    title: "How AI is Transforming the Workforce in 2025",
    excerpt: "Artificial intelligence is no longer a distant promise—it's reshaping workplaces right now. From smarter automation to personalized employee experiences, here's how businesses can thrive in the AI-driven era.",
    content: `
      <h2>The AI Revolution in the Workplace</h2>
      <p>In 2025, artificial intelligence isn't just changing how we work—it's redefining what work means. AI is no longer limited to automating routine tasks. It's becoming a partner in creativity, strategy, and decision-making, opening up opportunities that were once unimaginable.</p>
      
      <h3>Where AI Is Making the Biggest Impact</h3>
      
      <h4>1. Intelligent Automation</h4>
      <p>Forget simple scripts and rule-based processes. Today's AI can read unstructured data, make real-time decisions, and adapt on the fly. Businesses are using it to streamline operations, cut costs, and free people to focus on higher-value work.</p>
      
      <h4>2. Smarter Decision-Making</h4>
      <p>Machine learning models now analyze mountains of data faster than any human team. Companies are using predictive analytics to spot market shifts, anticipate customer needs, and prevent operational risks before they happen.</p>
      
      <h4>3. Personalized Employee Journeys</h4>
      <p>AI-driven platforms tailor learning paths, automate scheduling, and adapt digital tools to individual work styles. The result: employees feel more supported, more efficient, and more engaged.</p>
      
      <h3>Industry Snapshots</h3>
      
      <h4>Healthcare</h4>
      <p>AI is helping doctors predict illnesses earlier, create customized treatment plans, and cut back on paperwork—so medical professionals can focus on patient care where human connection matters most.</p>
      
      <h4>Finance</h4>
      <p>From real-time fraud detection to automated wealth management, AI is making finance faster, more secure, and more personalized than ever before.</p>
      
      <h4>Manufacturing</h4>
      <p>Smart factories are here. With AI monitoring production lines, predicting equipment breakdowns, and ensuring tighter quality control, manufacturers are setting new standards of efficiency and precision.</p>
      
      <h3>Preparing for the AI Future</h3>
      <p>To harness AI's full potential, leaders must focus not just on technology, but on people. Here are key strategies:</p>
      <ul>
        <li><strong>Invest in Skills:</strong> Provide AI literacy and hands-on training across all levels of the workforce.</li>
        <li><strong>Encourage Collaboration:</strong> Blend human creativity with AI insights by building cross-functional teams.</li>
        <li><strong>Experiment First:</strong> Pilot projects can demonstrate value before rolling out enterprise-wide adoption.</li>
        <li><strong>Keep It Human:</strong> Design AI solutions that enhance, not replace, human judgment and empathy.</li>
      </ul>
      
      <h3>The Road Ahead</h3>
      <p>The future of work is not about humans versus machines—it's about humans working with machines. Organizations that balance innovation with ethics, and technology with humanity, will lead the way in this new era.</p>
      
      <p>At <strong>Tepa Solutions</strong>, we guide businesses through this transformation with custom automation, intelligent workflows, and strategic AI consulting. Our mission is simple: to ensure that technology strengthens—not overshadows—the human touch that drives lasting success.</p>
      
      <p><em>Source: <a href="https://www.mckinsey.com/featured-insights/future-of-work" target="_blank" rel="noopener noreferrer">McKinsey Global Institute – The Future of Work</a></em></p>
    `,
    author: "Jerrie Mataya",
    role: "Head of AI Strategy",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["AI", "Workforce", "Automation", "Future of Work"],
    category: "Technology",
    featured: true
  },  
  {
    id: 2,
    title: "iPhone 17 Series: Apple's Boldest Leap Yet",
    excerpt: "Apple has officially unveiled the iPhone 17 lineup, introducing the ultra-slim iPhone Air alongside major design and performance upgrades across the series. Here's everything you need to know.",
    content: `
      <h2>A Redesign Years in the Making</h2>
      <p>Apple's iPhone 17 launch marks its most dramatic update since the iPhone X. With four models—the iPhone 17, iPhone 17 Pro, iPhone 17 Pro Max, and the all-new iPhone Air—Apple is pushing the limits of design, performance, and everyday usability.</p>
      
      <h3>Meet the Ultra-Slim iPhone Air</h3>
      <p>The showstopper is the iPhone Air, Apple's thinnest iPhone ever at just 5.6 mm. Built with a titanium frame, it combines featherlight design with remarkable durability. Its 6.5-inch ProMotion display delivers 120 Hz fluidity and peaks at an eye-searing 3,000 nits of brightness.</p>
      <p>Powered by the A19 Pro chip, the Air handles pro-level tasks with ease. Its camera system features a 48 MP dual-fusion setup, a 12 MP telephoto lens, and an 18 MP front-facing camera with Center Stage support. Despite its slim profile, it still offers up to 27 hours of video playback.</p>
      
      <h3>The Core iPhone 17 Lineup</h3>
      <p>The base iPhone 17 sports a 6.3-inch Super Retina XDR display and Apple's latest Ceramic Shield 2 for improved durability. The Pro and Pro Max models introduce a horizontal "Camera Plateau" design and bold new finishes in deep blue, cosmic orange, and silver.</p>
      <p>All models are powered by the A19 chip series, with the Pro versions featuring vapor-chamber cooling and up to 40% better sustained performance—perfect for gaming, video production, and extended multitasking.</p>
      
      <h3>Camera Enhancements Across the Board</h3>
      <ul>
        <li><strong>iPhone 17:</strong> 48 MP Dual Fusion rear camera, 18 MP Center Stage front camera, Dolby Vision video, and spatial audio.</li>
        <li><strong>iPhone 17 Pro & Pro Max:</strong> Triple 48 MP cameras, 8x optical zoom, ProRes RAW, and Genlock/time-code support for professional creators.</li>
      </ul>
      
      <h3>Battery Life and Connectivity</h3>
      <p>The Pro Max offers Apple's longest-lasting battery yet—up to 39 hours of video playback. Meanwhile, all models benefit from Apple's new N1 chip, enabling Wi-Fi 7, Bluetooth 6, Thread, and a faster C1X 5G modem.</p>
      
      <h3>Pricing and Availability</h3>
      <p>The iPhone 17 starts at $799, the iPhone Air at $999, the Pro at $1,099, and the Pro Max at $1,199. Pre-orders begin September 12, with global availability on September 19. Apple is also expanding eSIM-only models worldwide, further simplifying setup and reducing physical SIM reliance.</p>
      
      <h3>The Bigger Picture</h3>
      <p>The iPhone 17 lineup represents more than an upgrade—it's Apple's statement about the next decade of smartphones. From ultra-thin form factors to professional-grade cameras and next-gen wireless connectivity, Apple is setting the pace for what's possible.</p>
      
      <p><em>Source: <a href="https://www.wired.com/story/apple-iphone-17-iphone-air-and-iphone-17-pro" target="_blank" rel="noopener noreferrer">Wired – iPhone 17 Redesign</a></em></p>
    `,
    author: "Christine Jacinto",
    role: "Tech Trends Writer",
    date: "2025-09-10",
    readTime: "7 min read",
    tags: ["iPhone 17", "Apple", "Smartphones", "Technology"],
    category: "Technology",
    featured: true
  },  
  {
    id: 3,
    title: "Quantum Computing's Magic State Breakthrough: 2025's Game-Changer",
    excerpt: "After 20 years of research, scientists achieve the 'magic state' quantum computing milestone with 0.000015% error rates. This breakthrough could revolutionize everything from drug discovery to financial modeling.",
    content: `
      <h2>The Quantum Leap We've Been Waiting For</h2>
      <p>2025 has officially become the year quantum computing moved from laboratory curiosity to practical reality. Scientists have achieved a world record quantum computer error rate of 0.000015%, marking a pivotal breakthrough that could lead to smaller, faster, and more reliable quantum machines.</p>
      
      <h3>What Makes This Breakthrough So Significant?</h3>
      <p>The "magic state" achievement represents the culmination of two decades of intensive research. Without this capability, quantum computers could never be truly useful for real-world applications. The magic state allows quantum computers to perform universal quantum computation—essentially unlocking their full potential.</p>
      
      <h4>Google's Willow Chip: Setting New Standards</h4>
      <p>Google's Willow chip performed a benchmark computation in under five minutes that would take a supercomputer 10 septillion years, demonstrating exponential error reduction as the system scales up. This represents a fundamental breakthrough in quantum error correction.</p>
      
      <h4>Microsoft's Topological Approach</h4>
      <p>Microsoft unveiled Majorana 1, an eight-qubit topological quantum processor that promises more fault-tolerant quantum computing through innovative qubit protection mechanisms.</p>
      
      <h3>Real-World Applications on the Horizon</h3>
      <p>With these breakthroughs, quantum computing is poised to revolutionize multiple industries:</p>
      
      <h4>Drug Discovery and Healthcare</h4>
      <p>Pharmaceutical companies can now simulate molecular interactions at unprecedented scales, potentially reducing drug development timelines from decades to years. Complex protein folding problems that stumped classical computers become solvable.</p>
      
      <h4>Financial Services</h4>
      <p>Risk modeling, portfolio optimization, and fraud detection will benefit from quantum's ability to process vast datasets and identify patterns classical systems miss. Real-time analysis of global market conditions becomes feasible.</p>
      
      <h4>Artificial Intelligence Enhancement</h4>
      <p>Machine learning algorithms running on quantum hardware can explore solution spaces exponentially faster, leading to more sophisticated AI models and breakthrough discoveries in pattern recognition.</p>
      
      <h3>The Quantum-Ready Business Strategy</h3>
      <p>Microsoft successfully created and entangled 24 logical qubits in collaboration with Atom Computing, signaling that enterprises should start preparing for quantum integration now.</p>
      
      <p>Forward-thinking businesses are:</p>
      <ul>
        <li><strong>Building Quantum Literacy:</strong> Training teams on quantum principles and potential applications</li>
        <li><strong>Identifying Use Cases:</strong> Mapping business problems that could benefit from quantum acceleration</li>
        <li><strong>Partnering Strategically:</strong> Collaborating with quantum computing companies for early access</li>
        <li><strong>Preparing Infrastructure:</strong> Ensuring systems can integrate with hybrid quantum-classical workflows</li>
      </ul>
      
      <h3>Looking Ahead: The Quantum Advantage Era</h3>
      <p>Bank of America analysts compare quantum computing to the discovery of fire, highlighting its potential as humanity's biggest technological breakthrough in modern history.</p>
      
      <p>As we enter this quantum advantage era, businesses that understand and prepare for this transformation will gain unprecedented competitive advantages. The question isn't whether quantum computing will change your industry—it's how quickly you can adapt to harness its power.</p>
      
      <p><em>Sources: <a href="https://www.livescience.com/technology/computing/scientists-make-magic-state-breakthrough-after-20-years-without-it-quantum-computers-can-never-be-truly-useful" target="_blank" rel="noopener noreferrer">Live Science – Quantum Magic State Breakthrough</a>, <a href="https://blog.google/technology/research/google-willow-quantum-chip/" target="_blank" rel="noopener noreferrer">Google – Willow Quantum Chip</a></em></p>
    `,
    author: "Dr. Sarah Chen",
    role: "Quantum Technology Advisor",
    date: "2025-09-08",
    readTime: "12 min read",
    tags: ["Quantum Computing", "Technology Breakthrough", "Future Tech", "Innovation"],
    category: "Technology",
    featured: false
  },
  {
    id: 4,
    title: "Microsoft's Quantum Safe Program: Preparing for Post-Quantum Security",
    excerpt: "As quantum computers threaten current encryption methods, Microsoft unveils a comprehensive strategy to protect digital infrastructure. Learn how businesses can prepare for the quantum security era.",
    content: `
      <h2>The Quantum Security Challenge</h2>
      <p>Microsoft unveiled a Quantum Safe Program Strategy, a significant step in preparing for the quantum computing era. As quantum computers become more powerful, they pose an existential threat to current encryption methods that protect everything from online banking to confidential communications.</p>
      
      <h3>Why Traditional Encryption Is at Risk</h3>
      <p>Current encryption relies on mathematical problems that classical computers find nearly impossible to solve in reasonable time. However, quantum computers can potentially break these systems using algorithms like Shor's algorithm, which can factor large numbers exponentially faster than classical methods.</p>
      
      <h4>The Timeline Challenge</h4>
      <p>Security experts estimate that cryptographically relevant quantum computers—those capable of breaking current encryption—could emerge within 10-15 years. This creates an urgent need for organizations to transition to quantum-resistant encryption now.</p>
      
      <h3>Microsoft's Quantum Safe Strategy</h3>
      <p>Microsoft's comprehensive approach addresses multiple layers of quantum security:</p>
      
      <h4>Post-Quantum Cryptography (PQC)</h4>
      <p>Microsoft is implementing NIST-approved quantum-resistant algorithms across its ecosystem. These new cryptographic methods are designed to be secure against both classical and quantum attacks.</p>
      
      <h4>Crypto-Agility Infrastructure</h4>
      <p>Building systems that can easily swap encryption algorithms without major architectural changes. This flexibility allows organizations to adapt quickly as new quantum threats emerge.</p>
      
      <h4>Hybrid Security Models</h4>
      <p>Combining classical and quantum-resistant encryption methods during the transition period, ensuring security while maintaining compatibility with existing systems.</p>
      
      <h3>Industry Impact and Response</h3>
      <p>The quantum security challenge affects every industry:</p>
      
      <h4>Financial Services</h4>
      <p>Banks and financial institutions are prioritizing quantum-safe implementations to protect transaction data, customer information, and trading algorithms. The stakes couldn't be higher—a single breach could undermine confidence in the entire financial system.</p>
      
      <h4>Healthcare</h4>
      <p>Medical records, research data, and IoT devices in hospitals require quantum-safe protection. Patient privacy and the integrity of medical research depend on robust quantum-resistant encryption.</p>
      
      <h4>Government and Defense</h4>
      <p>National security agencies are leading the charge in quantum-safe adoption, protecting classified information and critical infrastructure from future quantum threats.</p>
      
      <h3>Preparing Your Organization</h3>
      <p>Organizations should start their quantum security journey today:</p>
      <ul>
        <li><strong>Inventory Current Encryption:</strong> Identify all systems using vulnerable cryptographic methods</li>
        <li><strong>Prioritize Critical Assets:</strong> Focus first on the most sensitive data and systems</li>
        <li><strong>Plan Migration Strategies:</strong> Develop roadmaps for transitioning to post-quantum cryptography</li>
        <li><strong>Test and Validate:</strong> Pilot quantum-safe solutions in controlled environments</li>
        <li><strong>Stay Informed:</strong> Monitor NIST standards and industry best practices</li>
      </ul>
      
      <h3>The Quantum Security Paradox</h3>
      <p>Interestingly, quantum technology presents both the threat and the solution. Quantum key distribution (QKD) offers theoretically unbreakable communication channels, while quantum random number generators provide superior randomness for cryptographic keys.</p>
      
      <h3>Looking Forward</h3>
      <p>The transition to quantum-safe security is not optional—it's inevitable. Organizations that proactively address these challenges will maintain competitive advantages and avoid the costly consequences of quantum-vulnerable systems.</p>
      
      <p>Microsoft's leadership in quantum safety demonstrates the importance of taking quantum threats seriously today. The companies that prepare now will be the ones that thrive in our quantum-powered future.</p>
      
      <p><em>Source: <a href="https://vavoza.com/20-tech-announcements-and-marketing-news-going-into-september-2025/" target="_blank" rel="noopener noreferrer">Vavoza – Tech Updates September 2025</a></em></p>
    `,
    author: "Michael Santos",
    role: "Cybersecurity Director",
    date: "2025-09-05",
    readTime: "10 min read",
    tags: ["Quantum Security", "Cybersecurity", "Post-Quantum Cryptography", "Microsoft"],
    category: "Technology",
    featured: false
  },
  {
    id: 5,
    title: "Google-Meta Cloud Partnership: $6B Deal Reshapes Enterprise Tech",
    excerpt: "The unexpected 6-year, $6 billion cloud computing partnership between Google and Meta signals a new era of strategic collaboration in enterprise technology services.",
    content: `
      <h2>A Strategic Alliance That Changes Everything</h2>
      <p>Google and Meta Platforms made a 6-year cloud computing deal worth $6 billion, marking one of the most significant partnerships in enterprise technology. This unexpected collaboration between two tech giants signals a fundamental shift in how major platforms approach infrastructure and services.</p>
      
      <h3>Why This Partnership Matters</h3>
      <p>Traditionally, tech giants have competed fiercely in the cloud computing space. This partnership represents a pragmatic approach where companies focus on their core strengths while leveraging partners' capabilities in complementary areas.</p>
      
      <h4>Strategic Benefits for Both Companies</h4>
      <p>For Google Cloud, this partnership provides:</p>
      <ul>
        <li>Massive scale validation from one of the world's largest tech companies</li>
        <li>Revenue stability through a long-term, high-value contract</li>
        <li>Opportunity to showcase advanced cloud capabilities at Meta's scale</li>
        <li>Competitive differentiation against AWS and Microsoft Azure</li>
      </ul>
      
      <p>For Meta, the benefits include:</p>
      <ul>
        <li>Access to Google's cutting-edge AI and machine learning infrastructure</li>
        <li>Reduced infrastructure development costs and timeline</li>
        <li>Enhanced global reach through Google's worldwide data center network</li>
        <li>Focus on core social media and metaverse innovations</li>
      </ul>
      
      <h3>Impact on the Cloud Computing Landscape</h3>
      <p>This partnership could trigger a wave of similar strategic alliances across the tech industry. Rather than building everything in-house, companies may increasingly focus on their core competencies while partnering for infrastructure needs.</p>
      
      <h4>Market Implications</h4>
      <p>The deal strengthens Google Cloud's position as the third-largest cloud provider, potentially closing the gap with Microsoft Azure and Amazon Web Services. It also validates the multi-cloud strategy many enterprises are adopting.</p>
      
      <h4>Innovation Acceleration</h4>
      <p>With Google's AI capabilities backing Meta's social platforms and metaverse ambitions, we can expect accelerated innovation in areas like:</p>
      <ul>
        <li>Real-time content moderation at scale</li>
        <li>Advanced recommendation algorithms</li>
        <li>Immersive AR/VR experiences</li>
        <li>Global content delivery optimization</li>
      </ul>
      
      <h3>What This Means for Enterprises</h3>
      <p>The Google-Meta partnership demonstrates several important trends for enterprise technology leaders:</p>
      
      <h4>Strategic Over Competitive</h4>
      <p>Companies are choosing strategic value over competitive positioning. This suggests a maturing market where collaboration drives innovation faster than pure competition.</p>
      
      <h4>Specialization Wins</h4>
      <p>Rather than trying to excel at everything, successful companies are focusing on their strengths and partnering for complementary capabilities.</p>
      
      <h4>Scale Matters More Than Ever</h4>
      <p>The $6 billion scale of this deal shows that meaningful cloud partnerships require substantial commitments and long-term thinking.</p>
      
      <h3>Lessons for Your Organization</h3>
      <p>Enterprise leaders can apply several lessons from this landmark partnership:</p>
      <ul>
        <li><strong>Embrace Strategic Partnerships:</strong> Look for collaboration opportunities that accelerate innovation</li>
        <li><strong>Focus on Core Strengths:</strong> Identify what you do best and partner for the rest</li>
        <li><strong>Think Long-term:</strong> Strategic partnerships require commitment and patience to realize full benefits</li>
        <li><strong>Consider Multi-cloud Strategies:</strong> Don't put all your eggs in one cloud provider's basket</li>
      </ul>
      
      <h3>The Future of Tech Partnerships</h3>
      <p>This Google-Meta deal may be the beginning of a new era in technology partnerships. As the pace of innovation accelerates and the cost of building comprehensive platforms increases, we may see more strategic alliances between former competitors.</p>
      
      <p>For businesses watching these developments, the message is clear: the companies that thrive in the coming decade will be those that balance competition with strategic collaboration, focusing their resources on what they do best while partnering for everything else.</p>
      
      <p><em>Source: <a href="https://vavoza.com/20-tech-announcements-and-marketing-news-going-into-september-2025/" target="_blank" rel="noopener noreferrer">Vavoza – Tech Announcements September 2025</a></em></p>
    `,
    author: "Elena Rodriguez",
    role: "Enterprise Strategy Consultant",
    date: "2025-09-03",
    readTime: "8 min read",
    tags: ["Cloud Computing", "Strategic Partnerships", "Google Cloud", "Meta", "Enterprise Technology"],
    category: "Business Strategy",
    featured: false
  },
  {
    id: 6,
    title: "Apple Intelligence 2.0: AI Features That Actually Matter",
    excerpt: "Apple's latest AI update brings contextual understanding, enhanced Siri capabilities, and seamless device integration. Here's what makes Apple Intelligence 2.0 different from the competition.",
    content: `
      <h2>Apple's Pragmatic Approach to AI</h2>
      <p>While competitors chase flashy AI demos, Apple Intelligence 2.0 focuses on practical, privacy-first features that enhance daily workflows. Released alongside iOS 18.7, iPadOS 18.7, and macOS Sequoia 15.7, this update represents Apple's mature vision for consumer AI.</p>
      
      <h3>What Sets Apple Intelligence 2.0 Apart</h3>
      <p>Unlike cloud-dependent AI systems, Apple Intelligence 2.0 processes most requests on-device, ensuring privacy while delivering instant responses. The system understands context across apps, making interactions feel natural rather than robotic.</p>
      
      <h4>Enhanced Siri with Contextual Understanding</h4>
      <p>Siri now maintains conversation context across multiple interactions. Ask "What's the weather like?" followed by "How about tomorrow?" and Siri remembers you're asking about weather. This contextual memory extends across apps—ask about a contact, then "Send them a message" and Siri knows exactly who you mean.</p>
      
      <h4>Smart Writing Tools Throughout iOS</h4>
      <p>Writing assistance appears system-wide, from Messages to Notes to third-party apps. The AI can:</p>
      <ul>
        <li>Rewrite text in different tones (professional, casual, concise)</li>
        <li>Summarize long documents or email threads</li>
        <li>Generate replies that match your writing style</li>
        <li>Correct grammar and suggest improvements contextually</li>
      </ul>
      
      <h4>Intelligent Photo Organization</h4>
      <p>Photos app now creates dynamic albums based on events, people, and locations without manual tagging. Search works conversationally—"Show me photos from Sarah's birthday last year with the dog" returns exactly what you'd expect.</p>
      
      <h3>Privacy-First AI Architecture</h3>
      <p>Apple Intelligence 2.0 processes 95% of requests on-device using the A18 Pro and M4 chips' neural engines. For complex requests requiring cloud processing, Apple uses "Private Cloud Compute"—servers that can't store data and are audited by security researchers.</p>
      
      <h4>Differential Privacy in Action</h4>
      <p>When Apple Intelligence does learn from user behavior, it uses differential privacy to ensure individual data remains anonymous. The system improves globally while protecting personal information locally.</p>
      
      <h3>Cross-Device Intelligence</h3>
      <p>Perhaps most impressive is how Apple Intelligence 2.0 works across Apple's ecosystem:</p>
      
      <h4>Handoff AI Conversations</h4>
      <p>Start a Siri conversation on iPhone, continue on Mac, and finish on Apple Watch. Context and conversation history seamlessly transfer between devices.</p>
      
      <h4>Smart Suggestions Across Platforms</h4>
      <p>The system suggests actions based on your patterns—if you usually call someone after texting them, your iPhone will suggest the call. If you typically open certain apps at specific times, they'll appear in Spotlight before you search.</p>
      
      <h4>Universal Clipboard Intelligence</h4>
      <p>Copy text on one device, and Apple Intelligence can suggest related actions on another. Copy an address on iPhone, and your Mac suggests opening it in Maps. Copy a phone number, and your iPad offers to create a contact.</p>
      
      <h3>Developer Integration</h3>
      <p>Apple Intelligence 2.0 includes APIs that let third-party apps integrate seamlessly:</p>
      <ul>
        <li><strong>App Intents:</strong> Apps can expose functions to Siri for voice control</li>
        <li><strong>Smart Suggestions:</strong> Apps can contribute to system-wide suggestions</li>
        <li><strong>Writing Tools:</strong> Third-party apps automatically gain Apple's writing assistance</li>
        <li><strong>Context Sharing:</strong> Apps can share relevant context without exposing private data</li>
      </ul>
      
      <h3>Real-World Impact</h3>
      <p>Early users report significant productivity improvements:</p>
      <ul>
        <li>Email processing time reduced by 40% through smart summaries</li>
        <li>Meeting notes automatically generated from voice recordings</li>
        <li>Travel itineraries created automatically from email confirmations</li>
        <li>Photo management requiring 70% less manual organization</li>
      </ul>
      
      <h3>What This Means for Businesses</h3>
      <p>Apple Intelligence 2.0 demonstrates that effective AI doesn't need to be flashy—it needs to be useful, private, and integrated. For enterprises considering AI implementations:</p>
      
      <ul>
        <li><strong>Focus on Practical Use Cases:</strong> Solve real problems rather than showcasing technology</li>
        <li><strong>Prioritize Privacy:</strong> On-device processing builds user trust and reduces security risks</li>
        <li><strong>Design for Context:</strong> AI works best when it understands the full picture</li>
        <li><strong>Integrate Seamlessly:</strong> The best AI disappears into existing workflows</li>
      </ul>
      
      <h3>Looking Forward</h3>
      <p>Apple Intelligence 2.0 sets a new standard for consumer AI—powerful yet private, intelligent yet unobtrusive. As Apple continues refining this approach, expect other companies to follow suit with more thoughtful, privacy-conscious AI implementations.</p>
      
      <p>The future of AI isn't about replacing human intelligence—it's about enhancing it thoughtfully and privately.</p>
      
      <p><em>Sources: <a href="https://www.apple.com/newsroom/2025/09/apple-intelligence-2-brings-enhanced-ai-capabilities/" target="_blank" rel="noopener noreferrer">Apple Newsroom – Apple Intelligence 2.0</a>, <a href="https://techcrunch.com/2025/09/09/apple-intelligence-2-review-practical-ai/" target="_blank" rel="noopener noreferrer">TechCrunch – Apple Intelligence 2.0 Review</a></em></p>
    `,
    author: "David Kim",
    role: "Apple Ecosystem Specialist",
    date: "2025-09-09",
    readTime: "9 min read",
    tags: ["Apple Intelligence", "AI", "Privacy", "iOS", "Consumer Technology"],
    category: "Technology",
    featured: false
  }
];

const categories = ["All", "Technology", "Business Strategy", "Development", "Marketing"];

export function ArticlesPage({ onNavigate }: ArticlesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="min-h-screen bg-background">
        {/* Article Header */}
        <div className="bg-gradient-to-b from-muted/30 to-background py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedArticle(null)}
              className="mb-8"
            >
              ← Back
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Article Content */}
        <div className="py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-muted-foreground mb-6">
                Let us help you implement the strategies discussed in this article. Our team of experts is ready to guide your digital transformation journey.
              </p>
              <Button 
                onClick={() => onNavigate('contact-sales')}
                className="bg-primary hover:bg-primary/90"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/30 to-background py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">Latest Tech Insights</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              September 2025: Breaking Tech Trends
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay ahead of the curve with our expert analysis of quantum computing breakthroughs, 
              AI advancements, and strategic partnerships reshaping the technology landscape.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && selectedCategory === "All" && !searchQuery && (
        <div className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.map((article, index) => (
                  <Card key={article.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => setSelectedArticle(article.id)}>
                    <CardContent className="p-0">
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="default">{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => setSelectedArticle(article.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated on Tech Trends</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter and get the latest tech insights, quantum computing updates, 
              and AI breakthroughs delivered directly to your inbox.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}