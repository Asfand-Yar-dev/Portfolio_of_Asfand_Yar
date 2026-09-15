import AnimatedDetails from "./AnimatedDetails";
import Icon from "./Icon";

export default function FinalYearProject() {
  return (
    <article className="featured-project fyp-project">
      <div className="project-body">
        <p className="eyebrow">
          FINAL YEAR PROJECT · AI & FULL-STACK ENGINEERING
        </p>
        <h3>Intervexa</h3>
        <p className="fyp-subtitle">
          Practice the interview. Understand the feedback.
        </p>
        <p>
          An AI-powered mock interview platform combining adaptive questions,
          multimodal feedback, and live interviews with human interviewers.
          Built to bring interview practice and evaluation into one workflow.
        </p>
        <div className="project-tech">
          {[
            "Next.js",
            "TypeScript",
            "Express.js",
            "MongoDB",
            "Python / Flask",
            "WebRTC",
            "Socket.IO",
          ].map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <AnimatedDetails>
          <summary>
            Explore the technical approach <Icon name="plus" />
          </summary>
          <div>
            <dl>
              <dt>Interview practice</dt>
              <dd>
                Role- and experience-based question generation through Groq /
                LLaMA and Gemini, alongside human-led interview sessions.
              </dd>
              <dt>Multimodal evaluation</dt>
              <dd>
                A Python AI gateway combines answer analysis, Whisper
                transcription, voice analysis, and facial-expression processing
                using tools including Sentence-Transformers, Librosa, DeepFace,
                and OpenCV.
              </dd>
              <dt>Live sessions</dt>
              <dd>
                WebRTC handles video, audio, and screen sharing, with Socket.IO
                signaling and an Express / MongoDB backend for the interview
                workflow.
              </dd>
            </dl>
          </div>
        </AnimatedDetails>
      </div>
      <div className="fyp-workflow" aria-label="Conceptual Intervexa workflow">
        <p className="eyebrow">INTERVIEW → ANALYSIS → FEEDBACK</p>
        <ol>
          <li>
            <span className="mono">01 / PRACTICE</span>
            <h4>AI or human-led interview</h4>
            <p>Adaptive questions · Live video sessions</p>
          </li>
          <li>
            <span className="mono">02 / ANALYZE</span>
            <h4>Text, voice & visual signals</h4>
            <p>NLP · Speech processing · Computer vision</p>
          </li>
          <li>
            <span className="mono">03 / REVIEW</span>
            <h4>Feedback in one place</h4>
            <p>AI reports · Human evaluation</p>
          </li>
        </ol>
        <p className="mono fyp-architecture">
          NEXT.JS ↔ EXPRESS / MONGODB ↔ PYTHON AI
        </p>
      </div>
    </article>
  );
}
