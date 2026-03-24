import { useParams } from "react-router-dom";
import { useState } from "react";
import { Heart, Download, Copy, Check, GitBranch, MessageSquare, FileText, Code } from "lucide-react";
import { mockModels, formatNumber, timeAgo } from "@/lib/mock-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SAMPLE_README = `# Model Card

## Model Description
This model is a state-of-the-art language model trained on a large corpus of text data. It can be used for various NLP tasks including text generation, summarization, and more.

## Training Data
The model was trained on a diverse dataset including web pages, books, and academic papers.

## Usage

\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("model-name")
model = AutoModelForCausalLM.from_pretrained("model-name")

inputs = tokenizer("Hello, how are you?", return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=100)
print(tokenizer.decode(outputs[0]))
\`\`\`

## Limitations
- The model may generate biased or harmful content
- Not suitable for production use without additional safety measures
- Performance may vary across different languages

## License
Apache 2.0
`;

export default function ModelDetailPage() {
  const { owner, name } = useParams();
  const model = mockModels.find(m => m.owner === owner && m.name === name);
  const [activeTab, setActiveTab] = useState<"readme" | "files" | "community">("readme");
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!model) {
    return (
      <div className="hf-container py-16 text-center text-muted-foreground">
        <p className="text-xl">Model not found</p>
      </div>
    );
  }

  const repoId = `${model.owner}/${model.name}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(repoId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { key: "readme", label: "Model Card", icon: FileText },
    { key: "files", label: "Files and versions", icon: GitBranch },
    { key: "community", label: "Community", icon: MessageSquare },
  ] as const;

  return (
    <div className="hf-container py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            <span className="text-muted-foreground">{model.owner} / </span>
            {model.name}
          </h1>
          <p className="text-muted-foreground mt-1">{model.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setLiked(!liked)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg transition-colors ${liked ? 'bg-[hsl(var(--hf-red)/0.1)] border-hf-red text-hf-red' : 'border-border hover:bg-secondary'}`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            {formatNumber(model.likes + (liked ? 1 : 0))}
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="hf-tag">{model.task}</span>
        <span className="hf-tag">{model.framework}</span>
        {model.tags.map(tag => (
          <span key={tag} className="hf-tag">{tag}</span>
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-border text-sm text-muted-foreground">
        <span className="hf-stat"><Download className="h-4 w-4" /> {formatNumber(model.downloads)} downloads</span>
        <span className="hf-stat">Updated {timeAgo(model.updatedAt)}</span>
        <button onClick={handleCopy} className="hf-stat gap-1.5 hover:text-foreground transition-colors cursor-pointer ml-auto">
          {copied ? <Check className="h-4 w-4 text-hf-green" /> : <Copy className="h-4 w-4" />}
          {repoId}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab.key ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "readme" && (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-code:text-foreground prose-pre:bg-secondary prose-pre:text-foreground prose-a:text-hf-link">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{SAMPLE_README}</ReactMarkdown>
            </div>
          </div>
          <aside className="lg:w-72 shrink-0">
            <div className="border border-border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Use this model</h3>
              <div className="bg-secondary rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Transformers</span>
                </div>
                <pre className="text-xs text-foreground overflow-x-auto">
{`from transformers import pipeline
pipe = pipeline("${model.task.toLowerCase().replace(/ /g, '-')}", model="${repoId}")
`}
                </pre>
              </div>
            </div>
          </aside>
        </div>
      )}

      {activeTab === "files" && (
        <div className="border border-border rounded-lg divide-y divide-border">
          {["README.md", "config.json", "model.safetensors", "tokenizer.json", "tokenizer_config.json"].map(file => (
            <div key={file} className="flex items-center justify-between px-4 py-3 hover:bg-secondary transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{file}</span>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "community" && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg font-medium">No discussions yet</p>
          <p className="text-sm mt-1">Start a new discussion to share ideas or ask questions.</p>
          <button className="hf-btn-primary mt-4 text-sm">New Discussion</button>
        </div>
      )}
    </div>
  );
}
