import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY가 설정되지 않았습니다.");
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}

interface CallOpts {
  model: string;
  system: string;
  user: string;
  maxTokens?: number;
}

function stripFences(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("```")) {
    return trimmed.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  }
  return trimmed;
}

function extractText(resp: Anthropic.Messages.Message): string {
  return resp.content
    .filter((b): b is Anthropic.Messages.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

export function callClaudeStream(opts: CallOpts) {
  const { model, system, user, maxTokens = 4096 } = opts;
  const anthropic = getClient();

  return anthropic.messages.stream({
    model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: user }],
  });
}

export async function callClaude<T>(opts: CallOpts): Promise<T> {
  const { model, system, user, maxTokens = 4096 } = opts;
  const anthropic = getClient();

  const makeRequest = (extraUser?: string) =>
    anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      system,
      messages: [
        {
          role: "user",
          content: extraUser ? `${user}\n\n${extraUser}` : user,
        },
      ],
    });

  let resp = await makeRequest();
  let text = extractText(resp);

  try {
    return JSON.parse(stripFences(text)) as T;
  } catch {
    resp = await makeRequest(
      "이전 응답이 유효한 JSON이 아니었습니다. 설명이나 코드 펜스 없이 오직 JSON 객체만 다시 반환하세요."
    );
    text = extractText(resp);
    return JSON.parse(stripFences(text)) as T;
  }
}
