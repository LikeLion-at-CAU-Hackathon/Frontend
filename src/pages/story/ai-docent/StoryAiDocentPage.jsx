import { useEffect, useRef, useState } from "react";
import sendIcon from "../../../assets/images/figma/story/ai-docent-send.svg";
import { askAiDocent } from "../../../api/productApi";

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const normalizeFaqs = (faqs) =>
  (faqs ?? [])
    .map((faq) => ({
      question: typeof faq === "string" ? faq : faq?.question ?? faq?.title ?? "",
    }))
    .filter((faq) => faq.question.trim());

function TypingDots() {
  return (
    <span className="flex h-[21.45px] items-center gap-[4px]" aria-label="답변 작성 중">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="loading-dot size-[5px] rounded-full bg-[#8a8078]"
          style={{ animationDelay: `${index * 0.14}s` }}
        />
      ))}
    </span>
  );
}

function ChatBubble({ children, variant = "assistant", isLoading = false, messageRef }) {
  const isUser = variant === "user";

  return (
    <div ref={messageRef} className={`flex w-full scroll-mt-[72px] ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`chat-bubble-pop max-w-[304px] whitespace-pre-line rounded-[14px] px-[15px] py-[11px] text-[13px] leading-[21.45px] ${
          isUser
            ? "bg-[#0a0908] text-white"
            : "bg-[#faf8f5] text-[#0a0908]"
        }`}
      >
        {isLoading ? <TypingDots /> : children}
      </p>
    </div>
  );
}

function SuggestedQuestion({ disabled = false, question, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(question)}
      className="flex min-h-[43px] w-full items-center rounded-[14px] border border-[#d5b38b] bg-white px-[15px] py-[10px] text-left text-[13px] leading-[19.5px] text-[#0a0908] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {question}
    </button>
  );
}

function StoryAiDocentPage({ faqs = [], product }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isResponding, setIsResponding] = useState(false);
  const [selectedFaqQuestions, setSelectedFaqQuestions] = useState([]);
  const latestMessageRef = useRef(null);
  const hasConversation = messages.length > 0;
  const visibleFaqs = normalizeFaqs(faqs).filter((faq) => !selectedFaqQuestions.includes(faq.question.trim()));
  const greeting = `안녕하세요. ${product?.name ?? "이 제품"}에 대한 검증된 정보를 안내해 드립니다. 소재, 관리 방법, 특징 등을 질문해 보세요.`;

  useEffect(() => {
    const scrollTimer = window.setTimeout(() => {
      latestMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);

    return () => window.clearTimeout(scrollTimer);
  }, [messages]);

  const handleAsk = async (question) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isResponding) {
      return;
    }

    setInputValue("");
    const messageId = `ai-docent-${Date.now()}`;
    const loadingMessageId = `${messageId}-loading`;

    setIsResponding(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: `${messageId}-question`, role: "user", content: trimmedQuestion },
      { id: loadingMessageId, role: "assistant", content: "", isLoading: true },
    ]);

    try {
      const response = await askAiDocent(product?.id, trimmedQuestion);

      await wait(450);
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === loadingMessageId
            ? {
                id: `${messageId}-answer`,
                role: "assistant",
                content: response.answer,
                isLoading: false,
              }
            : message,
        ),
      );
    } catch {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === loadingMessageId
            ? {
                ...message,
                content: "답변을 불러오지 못했습니다. 잠시 후 다시 질문해 주세요.",
                isLoading: false,
              }
            : message,
        ),
      );
    } finally {
      setIsResponding(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAsk(inputValue);
  };

  const handleSuggestedQuestionClick = (question) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isResponding) {
      return;
    }

    setSelectedFaqQuestions((prevQuestions) =>
      prevQuestions.includes(trimmedQuestion) ? prevQuestions : [...prevQuestions, trimmedQuestion],
    );
    handleAsk(trimmedQuestion);
  };

  return (
    <section className="flex min-h-[calc(100dvh-107px)] flex-col bg-[#fafaf8] text-left">
      <header className="border-b border-[#e5e0da] bg-[#fafaf8] px-5 py-[14px]">
        <p className="text-[10px] uppercase leading-[15px] tracking-[1.4px] text-[#6b3f1f]">
          AI DIGITAL CURATOR
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col bg-[rgba(232,230,226,0.7)]">
        <div className="flex-1 px-5 py-[14px]">
          <div className="space-y-4">
            <ChatBubble>{greeting}</ChatBubble>

            {messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                variant={message.role}
                isLoading={message.isLoading}
                messageRef={index === messages.length - 1 ? latestMessageRef : undefined}
              >
                {message.content}
              </ChatBubble>
            ))}
          </div>

          <section
            className={`mx-auto w-full max-w-[304px] ${
              hasConversation ? "mt-[13px]" : "mt-[14px]"
            }`}
          >
            {visibleFaqs.length > 0 && (
              <>
                <p className="text-[11px] leading-[16.5px] text-[#6f6f6f]">자주 묻는 질문</p>
                <div className="mt-1 flex flex-col gap-1">
                  {visibleFaqs.map((faq) => (
                    <SuggestedQuestion
                      key={faq.question}
                      disabled={isResponding}
                      question={faq.question}
                      onClick={handleSuggestedQuestionClick}
                    />
                  ))}
                </div>
              </>
            )}
            <p className="mt-3 text-[11px] leading-[18.7px] text-[#6f6f6f]">
              검증된 제품 정보만 안내합니다. 일반적인 대화는 지원하지 않습니다.
            </p>
          </section>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 flex gap-2 border-t border-[#e5e0da] bg-white px-4 pb-[10px] pt-[11px]"
        >
          <label className="flex h-[41.5px] min-w-0 flex-1 items-center rounded-[2px] border border-[#e5e0da] bg-[#fafaf8] px-[15px]">
            <span className="sr-only">AI 도슨트 질문</span>
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={isResponding}
              className="w-full bg-transparent text-[16px] leading-normal text-[#0a0908] outline-none placeholder:text-[rgba(10,9,8,0.5)]"
              placeholder="이 제품에 대해 질문하세요..."
            />
          </label>
          <button
            type="submit"
            aria-label="질문 보내기"
            disabled={!inputValue.trim() || isResponding}
            className="flex h-[41px] w-[38px] shrink-0 items-center justify-center rounded-[2px] bg-[#0a0908] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <img src={sendIcon} alt="" className="size-[14px]" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default StoryAiDocentPage;
