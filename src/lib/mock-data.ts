export interface Model {
  id: string;
  name: string;
  owner: string;
  description: string;
  tags: string[];
  task: string;
  framework: string;
  likes: number;
  downloads: number;
  updatedAt: string;
  isPrivate: boolean;
}

export interface Dataset {
  id: string;
  name: string;
  owner: string;
  description: string;
  tags: string[];
  task: string;
  likes: number;
  downloads: number;
  updatedAt: string;
  isPrivate: boolean;
}

export interface Space {
  id: string;
  name: string;
  owner: string;
  description: string;
  tags: string[];
  sdk: string;
  likes: number;
  status: "running" | "building" | "stopped";
  updatedAt: string;
}

export const TASKS = [
  "Text Generation", "Text Classification", "Token Classification", "Translation",
  "Summarization", "Question Answering", "Fill-Mask", "Text-to-Image",
  "Image Classification", "Object Detection", "Audio Classification",
  "Automatic Speech Recognition", "Conversational", "Feature Extraction",
];

export const FRAMEWORKS = ["PyTorch", "TensorFlow", "JAX", "ONNX", "Safetensors"];
export const LANGUAGES = ["English", "Chinese", "French", "Spanish", "German", "Japanese", "Korean", "Arabic"];
export const SDKS = ["Gradio", "Streamlit", "Docker", "Static"];

function randomDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * days));
  return d.toISOString();
}

export const mockModels: Model[] = [
  { id: "1", name: "llama-3-70b", owner: "meta-llama", description: "Meta's latest large language model with 70B parameters", tags: ["llama", "text-generation", "conversational"], task: "Text Generation", framework: "PyTorch", likes: 15420, downloads: 2840000, updatedAt: randomDate(2), isPrivate: false },
  { id: "2", name: "gpt2", owner: "openai-community", description: "OpenAI GPT-2 language model", tags: ["gpt2", "text-generation", "english"], task: "Text Generation", framework: "PyTorch", likes: 8930, downloads: 45000000, updatedAt: randomDate(30), isPrivate: false },
  { id: "3", name: "stable-diffusion-xl-base-1.0", owner: "stabilityai", description: "Stable Diffusion XL base model for high-quality image generation", tags: ["stable-diffusion", "text-to-image", "diffusers"], task: "Text-to-Image", framework: "PyTorch", likes: 12100, downloads: 8900000, updatedAt: randomDate(10), isPrivate: false },
  { id: "4", name: "whisper-large-v3", owner: "openai", description: "Whisper large-v3 automatic speech recognition model", tags: ["whisper", "speech-recognition", "multilingual"], task: "Automatic Speech Recognition", framework: "PyTorch", likes: 6780, downloads: 3200000, updatedAt: randomDate(5), isPrivate: false },
  { id: "5", name: "bert-base-uncased", owner: "google-bert", description: "BERT base model (uncased) for NLP tasks", tags: ["bert", "fill-mask", "english"], task: "Fill-Mask", framework: "PyTorch", likes: 5430, downloads: 78000000, updatedAt: randomDate(60), isPrivate: false },
  { id: "6", name: "mistral-7b-instruct-v0.3", owner: "mistralai", description: "Mistral 7B Instruct v0.3 for instruction following", tags: ["mistral", "text-generation", "instruct"], task: "Text Generation", framework: "PyTorch", likes: 9200, downloads: 5600000, updatedAt: randomDate(3), isPrivate: false },
  { id: "7", name: "clip-vit-large-patch14", owner: "openai", description: "CLIP ViT-L/14 for zero-shot image classification", tags: ["clip", "image-classification", "zero-shot"], task: "Image Classification", framework: "PyTorch", likes: 3200, downloads: 12000000, updatedAt: randomDate(45), isPrivate: false },
  { id: "8", name: "roberta-large-mnli", owner: "FacebookAI", description: "RoBERTa large model fine-tuned on MNLI", tags: ["roberta", "text-classification", "nli"], task: "Text Classification", framework: "PyTorch", likes: 1890, downloads: 9800000, updatedAt: randomDate(90), isPrivate: false },
  { id: "9", name: "gemma-2-9b-it", owner: "google", description: "Gemma 2 9B instruction-tuned model", tags: ["gemma", "text-generation", "conversational"], task: "Text Generation", framework: "PyTorch", likes: 7600, downloads: 4100000, updatedAt: randomDate(1), isPrivate: false },
  { id: "10", name: "phi-3-mini-4k-instruct", owner: "microsoft", description: "Phi-3 Mini 4K Instruct - small but powerful LLM", tags: ["phi", "text-generation", "instruct"], task: "Text Generation", framework: "PyTorch", likes: 5100, downloads: 2900000, updatedAt: randomDate(7), isPrivate: false },
  { id: "11", name: "detr-resnet-50", owner: "facebook", description: "DETR model with ResNet-50 backbone for object detection", tags: ["detr", "object-detection", "coco"], task: "Object Detection", framework: "PyTorch", likes: 1200, downloads: 3400000, updatedAt: randomDate(120), isPrivate: false },
  { id: "12", name: "t5-base", owner: "google-t5", description: "T5 Base model for text-to-text generation", tags: ["t5", "translation", "summarization"], task: "Translation", framework: "PyTorch", likes: 2100, downloads: 15000000, updatedAt: randomDate(100), isPrivate: false },
];

export const mockDatasets: Dataset[] = [
  { id: "1", name: "common_voice", owner: "mozilla-foundation", description: "Common Voice is Mozilla's initiative to help teach machines how real people speak", tags: ["speech", "multilingual", "audio"], task: "Automatic Speech Recognition", likes: 890, downloads: 2300000, updatedAt: randomDate(5), isPrivate: false },
  { id: "2", name: "imagenet-1k", owner: "ILSVRC", description: "ImageNet Large Scale Visual Recognition Challenge dataset", tags: ["image-classification", "computer-vision"], task: "Image Classification", likes: 2100, downloads: 8900000, updatedAt: randomDate(30), isPrivate: false },
  { id: "3", name: "squad_v2", owner: "rajpurkar", description: "Stanford Question Answering Dataset v2.0", tags: ["question-answering", "english", "nlp"], task: "Question Answering", likes: 1560, downloads: 5600000, updatedAt: randomDate(60), isPrivate: false },
  { id: "4", name: "wikitext", owner: "Salesforce", description: "WikiText language modeling dataset", tags: ["language-modeling", "english"], task: "Text Generation", likes: 780, downloads: 12000000, updatedAt: randomDate(90), isPrivate: false },
  { id: "5", name: "openwebtext", owner: "Skylion007", description: "An open-source replication of the WebText dataset", tags: ["language-modeling", "english", "web"], task: "Text Generation", likes: 1200, downloads: 3400000, updatedAt: randomDate(45), isPrivate: false },
  { id: "6", name: "coco", owner: "detection-datasets", description: "COCO is a large-scale object detection, segmentation, and captioning dataset", tags: ["object-detection", "segmentation", "captioning"], task: "Object Detection", likes: 1890, downloads: 7800000, updatedAt: randomDate(15), isPrivate: false },
];

export const mockSpaces: Space[] = [
  { id: "1", name: "chat-with-llama", owner: "meta-llama", description: "Chat with Meta's LLaMA model in real time", tags: ["chatbot", "llm", "conversational"], sdk: "Gradio", likes: 4500, status: "running", updatedAt: randomDate(1) },
  { id: "2", name: "stable-diffusion-xl", owner: "stabilityai", description: "Generate images with Stable Diffusion XL", tags: ["image-generation", "diffusion"], sdk: "Gradio", likes: 8900, status: "running", updatedAt: randomDate(3) },
  { id: "3", name: "whisper-demo", owner: "openai", description: "Transcribe audio with OpenAI Whisper", tags: ["speech-to-text", "transcription"], sdk: "Gradio", likes: 3200, status: "running", updatedAt: randomDate(7) },
  { id: "4", name: "text-classification-app", owner: "huggingface", description: "Classify text sentiment with transformers", tags: ["nlp", "sentiment", "classification"], sdk: "Streamlit", likes: 1200, status: "running", updatedAt: randomDate(14) },
  { id: "5", name: "image-captioning", owner: "Salesforce", description: "Generate captions for images using BLIP-2", tags: ["image-captioning", "vision-language"], sdk: "Gradio", likes: 2800, status: "building", updatedAt: randomDate(2) },
  { id: "6", name: "code-llama-playground", owner: "codellama", description: "Try Code Llama for code generation", tags: ["code-generation", "llm"], sdk: "Gradio", likes: 5600, status: "running", updatedAt: randomDate(5) },
];

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}
