import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/SimpleChatbot.css';

const PUBLIC_PATHS = ['/onboarding', '/welcome', '/login', '/signup'];

const BASE_PROMPTS = [
  'What should I feed my baby?',
  'Show me vaccine guidance',
  'How do I track growth?',
  'Where are the documents?',
];

const PREGNANT_PROMPTS = [
  'What should I eat during pregnancy?',
  'Tell me about pregnancy vaccines',
  'Do I need an emergency contact?',
  'Show pregnancy health guidance',
];

function buildReply(text, userType) {
  const normalized = text.toLowerCase();

  if (normalized.includes('feed') || normalized.includes('formula') || normalized.includes('breast')) {
    return userType === 'pregnant'
      ? 'For pregnancy, use the Nutrition section for meal ideas and safe-food guidance. If you want baby feeding help later, the Feeding section and Feeding History page will help.'
      : 'Use Feeding for guidance and Feeding History to log bottle, breast, or solid meals. If you are unsure where to start, try age-based feeding tips and log one feeding at a time.';
  }

  if (normalized.includes('vaccine') || normalized.includes('shot') || normalized.includes('immunization')) {
    return userType === 'pregnant'
      ? 'Open Pregnant Vaccines for pregnancy-specific guidance, vaccine lists, and daily care resources.'
      : 'Open Vaccines to review the schedule and reminders. If you are tracking a baby, the app can help generate dose reminders from the baby profile.';
  }

  if (normalized.includes('growth') || normalized.includes('weight') || normalized.includes('height')) {
    return 'Open Growth to add measurements, then check the chart and history for progress over time.';
  }

  if (normalized.includes('document') || normalized.includes('card') || normalized.includes('paper')) {
    return 'Open the Documents section to manage discharge summaries, immunization cards, birth registration files, and medical records.';
  }

  if (normalized.includes('profile') || normalized.includes('contact') || normalized.includes('partner')) {
    return 'Use Profile to update your details, emergency contact, and partner invitations.';
  }

  if (normalized.includes('reminder') || normalized.includes('calendar') || normalized.includes('due')) {
    return 'Reminders and vaccine reminders are handled from the dashboard and vaccine screens. Complete or delete them when they are no longer needed.';
  }

  if (normalized.includes('nutrition') || normalized.includes('diet') || normalized.includes('food')) {
    return userType === 'pregnant'
      ? 'Open Nutrition for pregnancy meal guidance and the Foods library for recommended and avoid lists.'
      : 'Open Nutrition for baby and family nutrition guidance, and use Foods for pregnancy-specific recommendations.';
  }

  return userType === 'pregnant'
    ? 'I can help with pregnancy nutrition, vaccines, health guidance, reminders, and profile settings. Try one of the quick prompts below.'
    : 'I can help with feeding, growth, vaccines, documents, reminders, and profile settings. Try one of the quick prompts below.';
}

export default function SimpleChatbot() {
  const location = useLocation();
  const userType = localStorage.getItem('userType') || localStorage.getItem('selectedStage') || 'newParent';
  const inferredUserType = location.pathname.startsWith('/pregnant') || userType === 'pregnant' ? 'pregnant' : 'newParent';
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState(() => ({
    x: 20,
    y: 160,
  }));
  const dragging = useRef(false);
  const wasDragged = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e) => {
    dragging.current = true;
    wasDragged.current = false;
    dragOffset.current = { x: e.clientX - position.x, y: window.innerHeight - e.clientY - position.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [position]);

  const handlePointerMove = useCallback((e) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragOffset.current.x - position.x;
    const dy = (window.innerHeight - e.clientY - dragOffset.current.y) - position.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      wasDragged.current = true;
    }
    const newX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragOffset.current.x));
    const newY = Math.max(10, Math.min(window.innerHeight - 80, window.innerHeight - e.clientY - dragOffset.current.y));
    setPosition({ x: newX, y: newY });
  }, [position]);

  const panelH = 480;
  const fabH = 54;
  const opensUpward = !isOpen || position.y + panelH <= window.innerHeight;

  const containerStyle = useMemo(() => {
    const style = { left: position.x };
    if (!isOpen || opensUpward) {
      style.bottom = position.y;
    } else {
      const topY = Math.max(10, window.innerHeight - (position.y + fabH));
      style.top = Math.min(topY, Math.max(10, window.innerHeight - panelH - 10));
    }
    if (isOpen && !opensUpward) style.alignItems = 'flex-start';
    return style;
  }, [position, isOpen, opensUpward]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: inferredUserType === 'pregnant'
        ? 'Hi, I can point you to pregnancy nutrition, health, vaccines, reminders, and profile areas.'
        : 'Hi, I can point you to feeding, growth, vaccines, documents, reminders, and profile areas.',
    },
  ]);
  const endRef = useRef(null);

  const quickPrompts = useMemo(() => {
    return inferredUserType === 'pregnant' ? PREGNANT_PROMPTS : BASE_PROMPTS;
  }, [inferredUserType]);

  useEffect(() => {
    if (PUBLIC_PATHS.includes(location.pathname)) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (PUBLIC_PATHS.includes(location.pathname)) {
    return null;
  }

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const nextMessages = [
      ...messages,
      { id: Date.now(), role: 'user', text: trimmed },
      { id: Date.now() + 1, role: 'assistant', text: buildReply(trimmed, inferredUserType) },
    ];

    setMessages(nextMessages);
    setInputValue('');
    setIsOpen(true);
  };

  return (
    <div className={`simple-chatbot ${isOpen ? 'open' : ''}`} style={containerStyle}>
      {isOpen ? (
        <section className="chatbot-panel" aria-label="NutriTrack chatbot">
          <header className="chatbot-header">
            <div className="chatbot-title-wrap">
              <span className="chatbot-badge"><Sparkles size={14} /></span>
              <div>
                <p className="chatbot-title">NutriBot</p>
                <p className="chatbot-subtitle">Quick help for the current screen</p>
              </div>
            </div>
            <button type="button" className="chatbot-icon-button" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <X size={18} />
            </button>
          </header>

          <div className="chatbot-body">
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-message ${message.role}`}>
                {message.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="chatbot-prompts" aria-label="Quick prompts">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="chatbot-chip"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="chatbot-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(inputValue);
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask about feeding, vaccines, growth..."
              className="chatbot-input"
              aria-label="Chat message"
            />
            <button type="submit" className="chatbot-send" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </section>
      ) : (
        <button
          type="button"
          className="chatbot-fab"
          onClick={() => { if (!wasDragged.current) setIsOpen(true); wasDragged.current = false; }}
          aria-label="Open chatbot"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <Bot size={20} />
          <span>Chat</span>
        </button>
      )}
      <button
        type="button"
        className="chatbot-mini-toggle"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        <MessageCircle size={18} />
      </button>
    </div>
  );
}